"""
Pydantic schemas for request/response validation
"""

from pydantic import BaseModel, HttpUrl
from typing import List, Optional, Dict
from datetime import datetime


class URLRequest(BaseModel):
    """Schema for URL analysis request"""
    url: str
    queries: Optional[List[str]] = None
    custom_keywords: Optional[List[str]] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "url": "https://www.slack.com",
                "queries": None,
                "custom_keywords": ["security", "integrations"]
            }
        }


class SentimentResult(BaseModel):
    """Schema for sentiment analysis result"""
    mentioned: bool
    sentiment: str  # POSITIVE, NEGATIVE, NEUTRAL, NOT_MENTIONED
    confidence: float
    position: int
    positive_indicators: int
    negative_indicators: int
    
    class Config:
        json_schema_extra = {
            "example": {
                "mentioned": True,
                "sentiment": "POSITIVE",
                "confidence": 0.92,
                "position": 15,
                "positive_indicators": 5,
                "negative_indicators": 1
            }
        }


class QueryAnalysis(BaseModel):
    """Schema for individual query analysis"""
    query: str
    response: str
    sentiment_analysis: SentimentResult
    
    class Config:
        json_schema_extra = {
            "example": {
                "query": "What do you think about Slack?",
                "response": "Slack is an excellent team collaboration tool...",
                "sentiment_analysis": {
                    "mentioned": True,
                    "sentiment": "POSITIVE",
                    "confidence": 0.92,
                    "position": 0,
                    "positive_indicators": 5,
                    "negative_indicators": 1
                }
            }
        }


class UsageMetrics(BaseModel):
    """Schema for API usage metrics"""
    model: str
    total_tokens: int
    prompt_tokens: int
    completion_tokens: int
    estimated_cost: float  # Estimated cost in USD
    
    class Config:
        json_schema_extra = {
            "example": {
                "model": "gpt-4o-mini",
                "total_tokens": 2500,
                "prompt_tokens": 500,
                "completion_tokens": 2000,
                "estimated_cost": 0.001
            }
        }


class SummaryMetrics(BaseModel):
    """Schema for summary metrics"""
    total_queries: int
    mentions_count: int
    citations: int  # Total number of brand occurrences across all responses
    visibility: float  # Percentage of queries where brand was mentioned
    positive: int
    negative: int
    neutral: int
    overall_sentiment: str
    average_confidence: float

    class Config:
        json_schema_extra = {
            "example": {
                "total_queries": 5,
                "mentions_count": 5,
                "citations": 8,
                "visibility": 100.0,
                "positive": 4,
                "negative": 0,
                "neutral": 1,
                "overall_sentiment": "POSITIVE",
                "average_confidence": 0.89
            }
        }


class AnalysisResponse(BaseModel):
    """Schema for complete analysis response"""
    brand_name: str
    url: str
    timestamp: datetime
    queries_analyzed: int
    analysis: List[QueryAnalysis]
    summary: SummaryMetrics
    usage: Optional[UsageMetrics] = None  # API usage metrics
    
    class Config:
        json_schema_extra = {
            "example": {
                "brand_name": "Slack",
                "url": "https://www.slack.com",
                "timestamp": "2025-10-10T12:00:00",
                "queries_analyzed": 5,
                "analysis": [],
                "summary": {
                    "total_queries": 5,
                    "mentions_count": 5,
                    "visibility": 100.0,
                    "positive": 4,
                    "negative": 0,
                    "neutral": 1,
                    "overall_sentiment": "POSITIVE",
                    "average_confidence": 0.89
                },
                "usage": {
                    "model": "gpt-4o-mini",
                    "total_tokens": 2500,
                    "prompt_tokens": 500,
                    "completion_tokens": 2000,
                    "estimated_cost": 0.001
                }
            }
        }


class HealthResponse(BaseModel):
    """Schema for health check response"""
    status: str
    version: str
    timestamp: datetime
    
    class Config:
        json_schema_extra = {
            "example": {
                "status": "ok",
                "version": "0.1.0",
                "timestamp": "2025-10-10T12:00:00"
            }
        }


class HistoryResponse(BaseModel):
    """Schema for history response"""
    analyses: List[AnalysisResponse]
    total_count: int

    class Config:
        json_schema_extra = {
            "example": {
                "analyses": [],
                "total_count": 0
            }
        }


class WaitlistRequest(BaseModel):
    """Schema for waitlist signup request"""
    email: str
    brand_url: str
    custom_queries: Optional[List[str]] = None
    custom_keywords: Optional[List[str]] = None

    class Config:
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "brand_url": "https://www.example.com",
                "custom_queries": ["How secure is this product?"],
                "custom_keywords": ["security", "pricing"]
            }
        }


class CitationURL(BaseModel):
    """Schema for citation URL data"""
    query: str
    url: str
    mentioned: bool

class PreviewData(BaseModel):
    """Schema for preview analytics data"""
    brand_name: str
    sentiment: str
    mentions: int
    citations: int  # Total number of times brand was mentioned across all responses
    visibility: float
    sample_query: Optional[str] = None
    sample_response: Optional[str] = None
    citation_urls: Optional[List[CitationURL]] = None  # List of queries with mention status

    class Config:
        json_schema_extra = {
            "example": {
                "brand_name": "Example",
                "sentiment": "POSITIVE",
                "mentions": 3,
                "citations": 3,
                "visibility": 60.0,
                "sample_query": "What do you think about Example?",
                "sample_response": "Example is a great tool..."
            }
        }


class WaitlistResponse(BaseModel):
    """Schema for waitlist signup response"""
    message: str
    email: str
    brand_url: str
    preview: PreviewData

    class Config:
        json_schema_extra = {
            "example": {
                "message": "Successfully added to waitlist",
                "email": "user@example.com",
                "brand_url": "https://www.example.com",
                "preview": {
                    "brand_name": "Example",
                    "sentiment": "POSITIVE",
                    "mentions": 3,
                    "visibility": 60.0
                }
            }
        }


class ContactRequest(BaseModel):
    """Schema for contact form submission"""
    name: str
    company: str
    email: str
    topic: str
    message: str
    recaptchaToken: str

    class Config:
        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "company": "Acme Corp",
                "email": "john@acme.com",
                "topic": "geo",
                "message": "I'm interested in learning more about GEO services.",
                "recaptchaToken": "token-from-client"
            }
        }


class ContactResponse(BaseModel):
    """Schema for contact form response"""
    message: str
    email: str

    class Config:
        json_schema_extra = {
            "example": {
                "message": "Thank you for your message! We'll respond within 24 hours.",
                "email": "john@acme.com"
            }
        }


class BrandAnalysisRequest(BaseModel):
    """Schema for brand analysis form submission (simplified)"""
    brand_url: str
    email: str
    recaptchaToken: Optional[str] = None
    custom_queries: Optional[List[str]] = None
    custom_keywords: Optional[List[str]] = None

    class Config:
        json_schema_extra = {
            "example": {
                "brand_url": "https://www.example.com",
                "email": "user@example.com",
                "recaptchaToken": "token-from-client",
                "custom_queries": ["What do you think about Example?"],
                "custom_keywords": ["AI", "visibility"]
            }
        }


class BrandAnalysisResponse(BaseModel):
    """Schema for brand analysis response"""
    message: str
    email: str
    brand_url: str

    class Config:
        json_schema_extra = {
            "example": {
                "message": "Thank you! We'll send your brand analysis report soon.",
                "email": "user@example.com",
                "brand_url": "https://www.example.com"
            }
        }
