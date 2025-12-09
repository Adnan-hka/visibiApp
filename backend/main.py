"""
VISIBI - AI Brand Monitor FastAPI Application
Main application entry point with API endpoints
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from typing import List
import sys
import os
from pathlib import Path
import requests

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from backend.config import config
from backend.services.brand_analyzer import BrandAnalyzer
from backend.services.sentiment_analyzer import SentimentAnalyzer
from backend.services.waitlist_service import WaitlistService
from backend.services.email_service import EmailService
from backend.models.schemas import (
    URLRequest,
    AnalysisResponse,
    QueryAnalysis,
    SummaryMetrics,
    SentimentResult,
    UsageMetrics,
    HealthResponse,
    HistoryResponse,
    WaitlistRequest,
    WaitlistResponse,
    PreviewData,
    ContactRequest,
    ContactResponse,
    BrandAnalysisRequest,
    BrandAnalysisResponse
)

try:
    from openai import OpenAI
except ImportError:
    print("Warning: OpenAI package not installed. Install with: pip install openai")
    OpenAI = None

# Initialize FastAPI app
app = FastAPI(
    title=config.APP_NAME,
    description="Monitor brand mentions and sentiment across AI models",
    version=config.VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Add CORS middleware
# Get allowed origins from environment or use defaults
allowed_origins_str = os.getenv("ALLOWED_ORIGINS", "")
if allowed_origins_str:
    allowed_origins = [origin.strip() for origin in allowed_origins_str.split(",") if origin.strip()]
    print(f"📋 Using ALLOWED_ORIGINS from environment: {allowed_origins}")
else:
    # For development, allow common local development origins
    allowed_origins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5176",
        "http://localhost:5177",
        "http://localhost:5178",
        "http://localhost:5179",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5176",
        "http://127.0.0.1:5177",
        "http://127.0.0.1:5178",
        "http://127.0.0.1:3000",
        "https://govisibi.ai",
        "https://www.govisibi.ai",
        "https://govisibi.ai",
        "https://www.govisibi.ai",
    ]
    print(f"📋 Using default ALLOWED_ORIGINS: {allowed_origins}")

# Configure CORS with regex support for Vercel and other deployment platforms
print(f"🔧 Configuring CORS with {len(allowed_origins)} allowed origins")
print(f"🔧 CORS regex pattern: https://.*\\.vercel\\.app|https://.*\\.railway\\.app")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"https://.*\.vercel\.app|https://.*\.railway\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
print("✅ CORS middleware configured successfully")

# Initialize services
brand_analyzer = BrandAnalyzer()
sentiment_analyzer = SentimentAnalyzer()
waitlist_service = WaitlistService()
email_service = EmailService()

# Initialize OpenAI client if available
openai_client = None
if OpenAI and config.OPENAI_API_KEY:
    try:
        openai_client = OpenAI(api_key=config.OPENAI_API_KEY)
        print(f"✅ OpenAI client initialized successfully with key: {config.OPENAI_API_KEY[:20]}...")
    except Exception as e:
        print(f"❌ Warning: Failed to initialize OpenAI client: {e}")
else:
    if not OpenAI:
        print("❌ OpenAI package not installed")
    if not config.OPENAI_API_KEY:
        print(f"❌ OPENAI_API_KEY not found in environment (value: '{config.OPENAI_API_KEY}')")

# In-memory storage for MVP (will be replaced with database in Phase 2)
analysis_history: List[dict] = []


def verify_recaptcha(token: str) -> bool:
    """Verify reCAPTCHA token using Google's verification endpoint"""
    secret_key = os.getenv("RECAPTCHA_SECRET_KEY")
    if not secret_key or not token:
        print("⚠️ Missing reCAPTCHA secret key or token")
        return False

    try:
        response = requests.post(
            "https://www.google.com/recaptcha/api/siteverify",
            data={"secret": secret_key, "response": token},
            timeout=10
        )
        result = response.json()
    except Exception as e:
        print(f"⚠️ Error verifying reCAPTCHA: {e}")
        return False

    success = result.get("success", False)
    score = result.get("score", 0)

    if not success or score < 0.5:
        print(f"⚠️ reCAPTCHA verification failed: {result}")

    return success and score >= 0.5


def get_chatgpt_response(query: str):
    """
    Get response from ChatGPT for a given query
    Returns tuple of (response_text, usage_data)
    """
    if not openai_client:
        raise HTTPException(
            status_code=500,
            detail="OpenAI client not initialized. Check OPENAI_API_KEY in .env file"
        )
    
    try:
        response = openai_client.chat.completions.create(
            model=config.OPENAI_MODEL,
            messages=[
                {
                    "role": "user",
                    "content": query
                }
            ],
            max_tokens=config.MAX_TOKENS,
            temperature=config.TEMPERATURE
        )
        
        # Extract usage data
        usage_data = {
            "prompt_tokens": response.usage.prompt_tokens,
            "completion_tokens": response.usage.completion_tokens,
            "total_tokens": response.usage.total_tokens
        }
        
        return response.choices[0].message.content, usage_data
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"ChatGPT API Error: {str(e)}"
        )


@app.get("/", tags=["Root"])
async def root():
    """Root endpoint"""
    return {
        "message": "VISIBI - AI Brand Monitor API",
        "version": config.VERSION,
        "docs": "/docs"
    }


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """
    Health check endpoint
    Returns application status and version
    """
    return HealthResponse(
        status="ok",
        version=config.VERSION,
        timestamp=datetime.now()
    )


@app.post("/api/brands/analyze", response_model=AnalysisResponse, tags=["Analysis"])
async def analyze_brand(request: URLRequest):
    """
    Main endpoint: Analyze brand mentions and sentiment
    
    This endpoint:
    1. Extracts brand name from URL
    2. Generates or uses provided monitoring queries
    3. Sends queries to ChatGPT
    4. Analyzes sentiment in responses
    5. Returns comprehensive analysis with metrics
    """
    try:
        # Fetch brand info
        brand_info = await brand_analyzer.fetch_brand_info(request.url)
        brand_name = brand_info["brand_name"]
        
        # Generate or use provided queries
        if request.queries:
            queries = request.queries
        else:
            queries = brand_analyzer.generate_monitoring_queries(
                brand_name,
                custom_keywords=request.custom_keywords
            )
        
        # Analyze each query
        analysis_results = []
        total_prompt_tokens = 0
        total_completion_tokens = 0
        
        for query in queries:
            # Get ChatGPT response with usage data
            response, usage_data = get_chatgpt_response(query)
            
            # Accumulate token usage
            total_prompt_tokens += usage_data["prompt_tokens"]
            total_completion_tokens += usage_data["completion_tokens"]
            
            # Analyze sentiment
            sentiment_analysis = sentiment_analyzer.analyze_sentiment(response, brand_name)
            
            query_result = QueryAnalysis(
                query=query,
                response=response,
                sentiment_analysis=SentimentResult(**sentiment_analysis)
            )
            
            analysis_results.append(query_result)
        
        # Calculate summary metrics
        mentions_count = sum(1 for a in analysis_results if a.sentiment_analysis.mentioned)

        # Calculate total citations (total occurrences of brand across all responses)
        citations_count = sum(
            sentiment_analyzer.count_brand_occurrences(a.response, brand_name)
            for a in analysis_results
        )

        positive_count = sum(1 for a in analysis_results if a.sentiment_analysis.sentiment == "POSITIVE")
        negative_count = sum(1 for a in analysis_results if a.sentiment_analysis.sentiment == "NEGATIVE")
        neutral_count = sum(1 for a in analysis_results if a.sentiment_analysis.sentiment == "NEUTRAL")
        
        # Determine overall sentiment
        overall_sentiment = "POSITIVE" if positive_count > negative_count else \
                          "NEGATIVE" if negative_count > positive_count else "NEUTRAL"
        
        # Calculate average confidence
        mentioned_analyses = [a for a in analysis_results if a.sentiment_analysis.mentioned]
        avg_confidence = (
            sum(a.sentiment_analysis.confidence for a in mentioned_analyses) / len(mentioned_analyses)
            if mentioned_analyses else 0.0
        )
        
        summary = SummaryMetrics(
            total_queries=len(queries),
            mentions_count=mentions_count,
            citations=citations_count,
            visibility=(mentions_count / len(queries)) * 100 if queries else 0,
            positive=positive_count,
            negative=negative_count,
            neutral=neutral_count,
            overall_sentiment=overall_sentiment,
            average_confidence=round(avg_confidence, 2)
        )
        
        # Calculate usage metrics and estimated cost
        # gpt-4o-mini pricing: $0.150/1M input tokens, $0.600/1M output tokens
        total_tokens = total_prompt_tokens + total_completion_tokens
        estimated_cost = (
            (total_prompt_tokens / 1_000_000) * 0.150 +
            (total_completion_tokens / 1_000_000) * 0.600
        )
        
        usage_metrics = UsageMetrics(
            model=config.OPENAI_MODEL,
            total_tokens=total_tokens,
            prompt_tokens=total_prompt_tokens,
            completion_tokens=total_completion_tokens,
            estimated_cost=round(estimated_cost, 6)
        )
        
        # Create response
        analysis_response = AnalysisResponse(
            brand_name=brand_name,
            url=request.url,
            timestamp=datetime.now(),
            queries_analyzed=len(queries),
            analysis=analysis_results,
            summary=summary,
            usage=usage_metrics
        )
        
        # Store in history
        analysis_history.append(analysis_response.model_dump())
        
        return analysis_response
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Analysis failed: {str(e)}")


@app.get("/api/brands/history", response_model=HistoryResponse, tags=["History"])
async def get_analysis_history(limit: int = 10):
    """
    Get analysis history
    
    Args:
        limit: Maximum number of results to return (default: 10)
    
    Returns:
        List of past analyses
    """
    # Return most recent analyses first
    recent_analyses = analysis_history[-limit:][::-1]
    
    return HistoryResponse(
        analyses=recent_analyses,
        total_count=len(analysis_history)
    )


@app.delete("/api/brands/history", tags=["History"])
async def clear_history():
    """Clear all analysis history (for testing purposes)"""
    global analysis_history
    count = len(analysis_history)
    analysis_history = []
    return {
        "message": "History cleared",
        "items_deleted": count
    }


@app.post("/api/waitlist", response_model=WaitlistResponse, tags=["Waitlist"])
async def join_waitlist(request: WaitlistRequest):
    """
    Join the waitlist for early access

    This endpoint:
    1. Validates email and brand URL
    2. Runs a quick brand analysis for preview
    3. Saves to waitlist (JSON file)
    4. Sends confirmation email to user
    5. Sends notification email to admin (if configured)
    6. Returns preview analytics
    """
    try:
        # Validate email format
        if not request.email or '@' not in request.email:
            raise HTTPException(status_code=400, detail="Invalid email address")

        # Fetch brand info and run quick analysis
        brand_info = await brand_analyzer.fetch_brand_info(request.brand_url)
        brand_name = brand_info["brand_name"]

        # Generate queries based on custom inputs or defaults
        if request.custom_queries or request.custom_keywords:
            # Use custom queries/keywords if provided
            preview_queries = brand_analyzer.generate_monitoring_queries(
                brand_name,
                custom_queries=request.custom_queries,
                custom_keywords=request.custom_keywords
            )[:10]  # Allow up to 10 queries for custom analysis
        else:
            # Comment out default queries - only use custom queries from user
            # preview_queries = brand_analyzer.generate_monitoring_queries(brand_name)[:5]
            preview_queries = []  # No default queries - user must provide custom queries

        # Quick sentiment analysis
        preview_results = []
        preview_responses = []  # Store responses to count citations
        for query in preview_queries:
            try:
                print(f"\n=== Query: {query} ===")
                response, _ = get_chatgpt_response(query)
                print(f"=== Response (first 100 chars): {response[:100]}... ===")
                sentiment_analysis = sentiment_analyzer.analyze_sentiment(response, brand_name)
                print(f"=== Sentiment: {sentiment_analysis['sentiment']}, Mentioned: {sentiment_analysis['mentioned']} ===")
                preview_results.append(sentiment_analysis)
                preview_responses.append(response)
            except Exception as e:
                # If OpenAI fails, provide fallback data
                error_msg = str(e) if str(e) else repr(e)
                error_detail = getattr(e, 'detail', 'No detail')
                print(f"!!! ERROR calling OpenAI for query '{query}' !!!")
                print(f"!!! Error type: {type(e).__name__} !!!")
                print(f"!!! Error message: {error_msg} !!!")
                print(f"!!! Error detail: {error_detail} !!!")
                preview_results.append({
                    "mentioned": False,
                    "sentiment": "NEUTRAL",
                    "confidence": 0.0,
                    "position": -1,
                    "positive_indicators": 0,
                    "negative_indicators": 0
                })
                preview_responses.append("")

        # Calculate preview metrics
        mentions_count = sum(1 for r in preview_results if r["mentioned"])
        positive_count = sum(1 for r in preview_results if r["sentiment"] == "POSITIVE")
        negative_count = sum(1 for r in preview_results if r["sentiment"] == "NEGATIVE")

        # Calculate total citations (total occurrences of brand across all preview responses)
        citations_count = sum(
            sentiment_analyzer.count_brand_occurrences(response, brand_name)
            for response in preview_responses
        )

        # Determine overall sentiment
        overall_sentiment = "POSITIVE" if positive_count > negative_count else \
                          "NEGATIVE" if negative_count > positive_count else "NEUTRAL"

        visibility = (mentions_count / len(preview_queries)) * 100 if preview_queries else 0

        # Get a sample query and response (first one with mention if available)
        sample_query = None
        sample_response = None
        citation_urls = []  # Collect all queries that were asked

        for i, result in enumerate(preview_results):
            if i < len(preview_queries) and i < len(preview_responses):
                # Collect ALL queries (not just ones with brand mentions)
                citation_urls.append({
                    "query": preview_queries[i],
                    "url": f"https://chat.openai.com/?q={preview_queries[i][:50]}",  # Simulated ChatGPT URL
                    "mentioned": result["mentioned"]  # Track if brand was mentioned
                })

                # Get first sample for display (prefer ones with mentions)
                if result["mentioned"] and sample_query is None:
                    sample_query = preview_queries[i]
                    sample_response = preview_responses[i]

        # If no queries had mentions, use the first query as sample
        if sample_query is None and len(preview_queries) > 0:
            sample_query = preview_queries[0]
            sample_response = preview_responses[0]

        preview_data = PreviewData(
            brand_name=brand_name,
            sentiment=overall_sentiment,
            mentions=mentions_count,
            citations=citations_count,
            visibility=round(visibility, 1),
            sample_query=sample_query,
            sample_response=sample_response,
            citation_urls=citation_urls if citation_urls else None
        )

        # Save to waitlist
        waitlist_service.add_to_waitlist(
            email=request.email,
            brand_url=request.brand_url,
            preview_data=preview_data.model_dump()
        )

        # Send confirmation email to user
        try:
            email_service.send_waitlist_confirmation(
                to_email=request.email,
                brand_url=request.brand_url,
                preview_data=preview_data.model_dump()
            )
        except Exception as e:
            print(f"Warning: Failed to send confirmation email: {e}")

        # Send notification to admin (if configured)
        admin_email = os.getenv('ADMIN_EMAIL')
        if admin_email:
            try:
                email_service.send_admin_notification(
                    admin_email=admin_email,
                    user_email=request.email,
                    brand_url=request.brand_url,
                    preview_data=preview_data.model_dump()
                )
            except Exception as e:
                print(f"Warning: Failed to send admin notification: {e}")

        return WaitlistResponse(
            message="Successfully added to waitlist! Check your email for confirmation.",
            email=request.email,
            brand_url=request.brand_url,
            preview=preview_data
        )

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        print(f"ERROR in waitlist endpoint: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail=f"Failed to join waitlist: {str(e)}"
        )


@app.get("/api/waitlist/stats", tags=["Waitlist"])
async def get_waitlist_stats():
    """Get waitlist statistics (admin endpoint)"""
    stats = waitlist_service.get_stats()
    return {
        "message": "Waitlist statistics",
        **stats
    }


@app.post("/api/send-email", response_model=ContactResponse, tags=["Contact"])
async def send_contact_email(request: ContactRequest):
    """
    Send contact form email

    This endpoint:
    1. Validates contact form data
    2. Sends confirmation email to user
    3. Sends notification email to admin (spacegigx@gmail.com)
    4. Returns success response
    """
    try:
        # Validate reCAPTCHA before processing
        if not request.recaptchaToken:
            raise HTTPException(status_code=400, detail="Missing reCAPTCHA token")
        if not verify_recaptcha(request.recaptchaToken):
            raise HTTPException(
                status_code=400,
                detail="reCAPTCHA verification failed. Please try again."
            )

        # Validate email format
        if not request.email or '@' not in request.email:
            raise HTTPException(status_code=400, detail="Invalid email address")

        # Send confirmation email to user
        try:
            email_service.send_contact_confirmation(
                to_email=request.email,
                name=request.name
            )
        except Exception as e:
            print(f"Warning: Failed to send confirmation email: {e}")

        # Send notification to admin
        admin_email = os.getenv('ADMIN_EMAIL', 'info@govisibi.ai')
        try:
            email_service.send_contact_notification(
                admin_email=admin_email,
                name=request.name,
                company=request.company,
                user_email=request.email,
                topic=request.topic,
                message=request.message
            )
        except Exception as e:
            print(f"Warning: Failed to send admin notification: {e}")

        return ContactResponse(
            message="Thank you for your message! We'll respond within 24 hours.",
            email=request.email
        )

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        print(f"ERROR in contact endpoint: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail=f"Failed to send contact message: {str(e)}"
        )


@app.post("/api/brand-analysis", response_model=BrandAnalysisResponse, tags=["Brand Analysis"])
async def submit_brand_analysis(request: BrandAnalysisRequest, background_tasks: BackgroundTasks):
    """
    Submit brand analysis request (simplified - no OpenAI, just sends email)

    This endpoint:
    1. Validates form data
    2. Sends confirmation email to user (in background)
    3. Sends notification email to admin with form details (in background)
    4. Returns success response immediately
    """
    try:
        # Validate reCAPTCHA before processing (if token provided)
        if request.recaptchaToken:
            if not verify_recaptcha(request.recaptchaToken):
                raise HTTPException(
                    status_code=400,
                    detail="reCAPTCHA verification failed. Please try again."
                )
        else:
            # In development, allow requests without reCAPTCHA
            # In production, you should enforce reCAPTCHA by setting RECAPTCHA_SECRET_KEY
            print("⚠️ Request submitted without reCAPTCHA token")

        # Validate email format
        if not request.email or '@' not in request.email:
            raise HTTPException(status_code=400, detail="Invalid email address")

        # Validate brand URL
        if not request.brand_url:
            raise HTTPException(status_code=400, detail="Brand URL is required")

        # Define background task functions
        def send_emails():
            try:
                # Send confirmation email to user
                email_service.send_brand_analysis_confirmation(
                    to_email=request.email,
                    brand_url=request.brand_url
                )
                print(f"✅ Sent confirmation email to {request.email}")
            except Exception as e:
                print(f"❌ Failed to send confirmation email: {e}")

            try:
                # Send notification to admin
                admin_email = os.getenv('ADMIN_EMAIL', 'info@govisibi.ai')
                email_service.send_brand_analysis_notification(
                    admin_email=admin_email,
                    brand_url=request.brand_url,
                    user_email=request.email,
                    custom_queries=request.custom_queries,
                    custom_keywords=request.custom_keywords
                )
                print(f"✅ Sent admin notification to {admin_email}")
            except Exception as e:
                print(f"❌ Failed to send admin notification: {e}")

        # Add email sending to background tasks
        background_tasks.add_task(send_emails)

        # Return immediately without waiting for emails
        return BrandAnalysisResponse(
            message="Thank you! We'll send your brand analysis report to your email within 24-48 hours.",
            email=request.email,
            brand_url=request.brand_url
        )

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        print(f"ERROR in brand analysis endpoint: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(
            status_code=500,
            detail=f"Failed to submit brand analysis request: {str(e)}"
        )


@app.get("/test-email", tags=["Testing"])
async def test_email(to: str = "spacegigx@gmail.com"):
    """
    Test email sending functionality
    Query param: ?to=email@example.com
    """
    try:
        success = email_service.send_brand_analysis_confirmation(
            to_email=to,
            brand_url="https://test.com"
        )
        
        if success:
            return {
                "status": "success",
                "message": f"Test email sent to {to}",
                "smtp_configured": True
            }
        else:
            return {
                "status": "failed",
                "message": "Email sending failed (check logs)",
                "smtp_configured": bool(os.getenv('SMTP_HOST'))
            }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e),
            "smtp_configured": bool(os.getenv('SMTP_HOST'))
        }


# Startup event
@app.on_event("startup")
async def startup_event():
    """Run on application startup"""
    print(f"🚀 Starting {config.APP_NAME} v{config.VERSION}")
    print(f"📝 API Documentation: http://localhost:8000/docs")
    print(f"🔍 Debug mode: {config.DEBUG}")
    
    # Check email configuration
    smtp_host = os.getenv('SMTP_HOST')
    smtp_user = os.getenv('SMTP_USER')
    smtp_password = os.getenv('SMTP_PASSWORD')
    from_email = os.getenv('FROM_EMAIL')
    admin_email = os.getenv('ADMIN_EMAIL')
    
    print("\n📧 Email Configuration:")
    print(f"   SMTP_HOST: {smtp_host or '❌ NOT SET'}")
    print(f"   SMTP_USER: {smtp_user or '❌ NOT SET'}")
    print(f"   SMTP_PASSWORD: {'✅ SET' if smtp_password else '❌ NOT SET'}")
    print(f"   FROM_EMAIL: {from_email or '❌ NOT SET'}")
    print(f"   ADMIN_EMAIL: {admin_email or '❌ NOT SET'}")
    
    if smtp_host and smtp_user and smtp_password:
        print("   ✅ Email service configured (SMTP)")
    else:
        print("   ⚠️  Email service will use console mode (emails won't be sent)")
    
    # Validate configuration
    try:
        config.validate()
        print("\n✅ Configuration validated\n")
    except ValueError as e:
        print(f"\n❌ Configuration error: {e}\n")


# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """Run on application shutdown"""
    print(f"👋 Shutting down {config.APP_NAME}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=config.DEBUG
    )
