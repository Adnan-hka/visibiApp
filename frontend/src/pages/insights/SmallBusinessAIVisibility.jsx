import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight, ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Breadcrumbs from '../../components/Breadcrumbs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SmallBusinessAIVisibility() {
  useEffect(() => {
    document.documentElement.classList.remove('dark')
  }, [])

  return (
    <div className="min-h-screen relative line-pattern">
      <Helmet>
        <title>Can't See Your Business in AI Results? 7 Practical Steps for Small Businesses | Visibi Ai</title>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="description" content="7 practical, low-cost steps any small business can take to improve AI visibility. Show up in ChatGPT, Google AI Overviews & more without breaking the bank." />
        <meta name="keywords" content="small business AI visibility, GEO for small business, ChatGPT local business, Google Business Profile optimization, AI search results" />
        <meta name="author" content="Dan" />
        <link rel="canonical" href="https://www.govisibi.ai/insights/small-business-ai-visibility-guide" />
        
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://govisibi.ai/insights/small-business-ai-visibility-guide" />
        <meta property="og:title" content="Can't See Your Business in AI Results? 7 Practical Steps for Small Businesses" />
        <meta property="og:description" content="7 practical, low-cost steps any small business can take to improve AI visibility without breaking the bank." />
        <meta property="article:author" content="Dan" />
        <meta property="article:published_time" content="2025-12-01" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Can't See Your Business in AI Results? 7 Practical Steps for Small Businesses",
            "description": "7 practical, low-cost steps any small business can take to improve AI visibility. Show up in ChatGPT, Google AI Overviews & more without breaking the bank.",
            "image": "https://govisibi.ai/og-image.jpg",
            "datePublished": "2025-12-01",
            "dateModified": "2025-12-01",
            "author": {
              "@type": "Person",
              "name": "Dan",
              "jobTitle": "Founder & Head of GEO Strategy",
              "url": "https://www.linkedin.com/in/adnan-khan-5a1a1858/",
              "image": "https://media.licdn.com/dms/image/v2/C4E03AQFpavOujT8QHg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1654520723970?e=1766016000&v=beta&t=obPe99SCKsDgrA5ahyRoO_KPHuaMrMN8S3C6DUGFU1g"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Visibi Ai",
              "url": "https://govisibi.ai",
              "logo": {
                "@type": "ImageObject",
                "url": "https://govisibi.ai/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://govisibi.ai/insights/small-business-ai-visibility-guide"
            }
          })}
        </script>
      </Helmet>

      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-300/60 bg-[linear-gradient(to_right,#1d4ed80A_1px,transparent_1px),linear-gradient(to_bottom,#1d4ed80A_1px,transparent_1px)] bg-[size:128px_104px]"></div>

      <Navigation currentPage="insights" />

      {/* Hero Section */}
      <section className="max-w-full md:max-w-[90%] mx-auto mb-0 mt-12 relative bg-[#FAFAFB] border border-b border-slate-200 rounded-xl rounded-bl-none rounded-br-none overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-64 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[length:14px_14px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFB] via-white/40 to-[#FAFAFB]"></div>
        </div>

        <div className="lg:block h-full w-full">
          <div className="relative z-10 py-24 border-l border-r border-slate-200">
            <div className="max-w-4xl mx-auto px-8 md:px-16">
              <Link to="/insights">
                <Button variant="outline" className="px-4 py-2 border-slate-300 rounded-full font-medium hover:bg-slate-50 mb-8">
                  <span className="text-blue-700 inline-flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Insights
                  </span>
                </Button>
              </Link>

              <div className="text-left pb-8">
                <Breadcrumbs items={[
                  { label: "Home", path: "/" },
                  { label: "Insights", path: "/insights" },
                  { label: "7 Practical Steps for Small Businesses" }
                ]} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-slate-600 font-space-mono">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">Small Business</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Dec 1, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>12 min read</span>
                  </div>
                </div>

                <h1 className="font-open-sans text-4xl md:text-6xl font-semibold tracking-tight text-slate-950 md:leading-[1.15]">
                  Can't See Your Business in AI Results? 7 Practical Steps for Small Businesses
                </h1>

                {/* Author Card */}
                <div className="flex items-center gap-4 py-4">
          <img 
            src="https://media.licdn.com/dms/image/v2/C4E03AQFpavOujT8QHg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1654520723970?e=1766016000&v=beta&t=obPe99SCKsDgrA5ahyRoO_KPHuaMrMN8S3C6DUGFU1g"
            alt="Dan"
            width="48"
            height="48"
            className="w-12 h-12 rounded-full object-cover"
          />
                  <div>
                    <div className="font-semibold text-slate-900 font-open-sans">Dan</div>
                    <div className="text-sm text-slate-600 font-open-sans">Founder & Head of GEO Strategy, govisibi.ai</div>
                  </div>
                  <a 
                    href="https://www.linkedin.com/in/adnan-khan-5a1a1858/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-auto text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    LinkedIn →
                  </a>
                </div>

                <p className="text-xl md:text-2xl font-light text-slate-700 font-open-sans leading-relaxed">
                  7 practical, low-cost steps any small business can take to improve AI visibility without breaking the bank.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-full md:max-w-[90%] mx-auto px-8 py-16 relative z-10 bg-white border-l border-r border-slate-300 mb-16 rounded-b-xl">
        <div className="lg:block absolute h-full w-0 md:w-16 bg-slate-200/20 border-0 md:border-r md:border-t-0 md:border-slate-200 left-0 top-0 pattern-background"></div>
        <div className="lg:block absolute h-full w-0 md:w-16 bg-slate-200/20 border-0 md:border-l md:border-t-0 md:border-slate-200 right-0 top-0 pattern-background"></div>

        <article className="max-w-4xl mx-auto md:px-16">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="space-y-6 mb-12">
              <div className="space-y-4 font-open-sans text-lg leading-relaxed text-slate-700">
                <p>If you run a small business, this probably sounds familiar:</p>
                
                <ul className="space-y-2 pl-5 list-disc">
                  <li>Everyone's talking about AI—ChatGPT, Google's AI Overviews, Gemini...</li>
                  <li>You search for your service, and you're nowhere to be found.</li>
                  <li>You don't have the budget for big agencies or fancy tools.</li>
                </ul>
                
                <p className="italic">It's frustrating.</p>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                  <p className="text-slate-800">
                    <strong>Here's the good news:</strong> you don't need a huge brand or massive budget to start showing up in AI answers and modern search results. What you need is to be clear, consistent, and easy for both customers and machines to understand.
                  </p>
                </div>
                
                <p>
                  This article breaks down 7 practical, low-cost steps any small business can take to improve their AI visibility. These actions can start showing results in a few weeks to a few months—giving you a realistic path forward without breaking the bank.
                </p>
              </div>
            </div>

            {/* Step 1 */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                <h2 className="font-open-sans text-3xl font-semibold text-slate-950 border-b-0">Get Your "Who / What / Where" Absolutely Clear (Everywhere)</h2>
              </div>
              
              <div className="space-y-6 text-slate-700 font-open-sans leading-relaxed">\n                <p>
                  AI systems can't recommend you if they're not sure:
                </p>
            
            <ul className="space-y-2 pl-5 mb-6 font-open-sans text-md text-slate-600 list-disc">
              <li><strong>Who</strong> you are</li>
              <li><strong>What</strong> you do</li>
              <li><strong>Where</strong> you do it</li>
            </ul>
            
            <p className="font-open-sans text-md text-slate-600 mb-6">
              Your first priority is <strong>clarity</strong>, not complexity.
            </p>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
              <h3 className="font-space-mono text-lg font-semibold text-slate-900 mb-4 uppercase">Action steps:</h3>
              
              <div className="space-y-4 font-open-sans text-md text-slate-600">
                <div>
                  <p className="mb-2"><strong>Use the same name, address, and phone number (NAP) everywhere:</strong></p>
                  <ul className="space-y-1 pl-5 list-disc">
                    <li>Website</li>
                    <li>Google Business Profile</li>
                    <li>Facebook / Instagram / LinkedIn</li>
                    <li>Key local/industry directories (Yell, Yelp, local chamber, trusted trade associations)</li>
                  </ul>
                </div>
                
                <div>
                  <p className="mb-2"><strong>On your homepage, write your main heading in one clear sentence that explains your business:</strong></p>
                  <ul className="space-y-1 pl-5 list-disc">
                    <li>"We [do X] for [type of customer] in [place]."</li>
                    <li>"If you have [these problems], we can help."</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <p className="font-open-sans text-slate-700 mb-2"><strong>Examples:</strong></p>
              <ul className="space-y-2 font-open-sans text-md text-slate-600">
                <li>"We install and maintain commercial air conditioning for offices across Birmingham and the West Midlands."</li>
                <li>"We provide bookkeeping and payroll for small businesses in Manchester."</li>
              </ul>
            </div>
            
            <p className="font-open-sans text-md text-slate-600">
              Simple clarity helps both customers and AI systems understand you instantly.
            </p>
              </div>
            </section>

            {/* Step 2 */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                <h2 className="font-open-sans text-3xl font-semibold text-slate-950 border-b-0">Treat Your Google Business Profile Like a Mini-Website</h2>
              </div>
              
              <div className="space-y-6 text-slate-700 font-open-sans leading-relaxed">
                <p>
                  For many small businesses, Google Business Profile (GBP) is more important than your blog or even parts of your website. It's often the first place Google and AI systems check to understand a local business.
                </p>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
              <h3 className="font-space-mono text-lg font-semibold text-slate-900 mb-4 uppercase">Action steps:</h3>
              
              <ul className="space-y-3 font-open-sans text-md text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Choose the right primary category (be specific, not vague).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Add all relevant services, each with a short, clear description.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="mb-1">Upload real photos of:</p>
                    <ul className="pl-5 space-y-1 mt-2 list-disc">
                      <li>Your team</li>
                      <li>Your work</li>
                      <li>Your premises / van / shop</li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="mb-1">Post a short update every 1–2 weeks:</p>
                    <ul className="pl-5 space-y-1 mt-2 list-disc">
                      <li>Recent jobs</li>
                      <li>Special offers</li>
                      <li>Helpful tips</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                  <p className="mb-3"><strong>Crucially: Ask customers for Google reviews that mention the service and location.</strong></p>
                  <p className="italic">
                    "If you're happy with the work, could you please mention the service and your area in your review? It really helps other local customers find us."
                  </p>
                  <p className="mt-3">
                    This boosts your local SEO and builds trust signals that AI systems recognize.
                  </p>
                </div>
              </div>
            </section>

            {/* Step 3 */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                <h2 className="font-open-sans text-3xl font-semibold text-slate-950 border-b-0">Turn Real Customer Questions into Simple Q&A Content</h2>
              </div>
              
              <div className="space-y-6 text-slate-700 font-open-sans leading-relaxed">
                <p>
                  You don't need dozens of AI-generated blog posts. You need 10–20 really good answers to the questions your customers actually ask.
                </p>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
              <h3 className="font-space-mono text-lg font-semibold text-slate-900 mb-4 uppercase">Action steps:</h3>
              
              <div className="space-y-4 font-open-sans text-md text-slate-600">
                <div>
                  <p className="mb-2"><strong>Write down the questions you hear all the time:</strong></p>
                  <ul className="space-y-2 pl-5 list-disc">
                    <li>"How much does [service] cost?"</li>
                    <li>"How quickly can you come out?"</li>
                    <li>"Do you offer emergency call-outs?"</li>
                    <li>"Do you work with landlords / businesses / homeowners?"</li>
                  </ul>
                </div>
                
                <div>
                  <p className="mb-2"><strong>Turn them into:</strong></p>
                  <ul className="space-y-1 pl-5 list-disc">
                    <li>A main FAQ page</li>
                    <li>Short FAQ sections on your key service pages</li>
                  </ul>
                </div>
                
                <p>Answer in clear, honest, everyday language—no jargon.</p>
              </div>
            </div>
            
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <p className="mb-3">
                    Focus on handling this part yourself first. That ensures your answers sound like you and are straightforward for customers to understand.
                  </p>
                  <p>
                    Later, a developer or a service like Govisibi.ai can help wrap these FAQs in FAQ schema so AI can read them more easily. Knowing what you can do yourself versus what needs professional help keeps you from feeling overwhelmed.
                  </p>
                </div>
              </div>
            </section>

            {/* Step 4 */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                <h2 className="font-open-sans text-3xl font-semibold text-slate-950 border-b-0">Build One Strong Page Per Core Service (Instead of One Vague "Services" Page)</h2>
              </div>
              
              <div className="space-y-6 text-slate-700 font-open-sans leading-relaxed">
            
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="font-open-sans text-slate-800">
                <strong>A common small-business mistake:</strong> one "Services" page with a bullet list of everything.
              </p>
              <p className="font-open-sans text-md text-slate-600 mt-2">
                AI and search engines struggle with vague lists like that.
              </p>
            </div>
            
            <p className="font-open-sans text-md text-slate-600 mb-6">
              <strong>A much better approach:</strong> one page per key service, especially for local businesses.
            </p>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
              <h3 className="font-space-mono text-lg font-semibold text-slate-900 mb-4 uppercase">Action steps:</h3>
              
              <div className="space-y-4 font-open-sans text-md text-slate-600">
                <div>
                  <p className="mb-3"><strong>For each core service, create a dedicated page:</strong></p>
                  <div className="bg-white border border-slate-200 rounded p-3 space-y-1 font-space-mono text-sm">
                    <p className="text-slate-700">/boiler-repair-birmingham</p>
                    <p className="text-slate-700">/emergency-plumber-solihull</p>
                    <p className="text-slate-700">/commercial-ac-installation-birmingham</p>
                  </div>
                </div>
                
                <div>
                  <p className="mb-2"><strong>Each page should clearly cover:</strong></p>
                  <ul className="space-y-2 pl-5 list-disc">
                    <li>Who it's for</li>
                    <li>What's included</li>
                    <li>Where you operate</li>
                    <li>Why you're a good choice</li>
                    <li>3–5 FAQs</li>
                  </ul>
                </div>
              </div>
            </div>
            
                <p>
                  This helps AI systems map the connections—<strong>Service → Location → Provider (you)</strong>—much more effectively than a generic catch-all list.
                </p>
              </div>
            </section>

            {/* Step 5 */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
                <h2 className="font-open-sans text-3xl font-semibold text-slate-950 border-b-0">Build "Real-World" Trust: Reviews, Case Studies, Mentions</h2>
              </div>
              
              <div className="space-y-6 text-slate-700 font-open-sans leading-relaxed">
            
            <p className="font-open-sans text-md text-slate-600 mb-6">
              AI systems don't just read your website—they look for external proof that you're real and reliable.
            </p>
            
            <p className="font-open-sans text-md text-slate-600 mb-6">
              You don't need paid PR. You need steady, genuine signals from real customers and partners.
            </p>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
              <h3 className="font-space-mono text-lg font-semibold text-slate-900 mb-4 uppercase">Action steps:</h3>
              
              <ul className="space-y-3 font-open-sans text-md text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Aim for 1–2 new Google reviews per month, consistently.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="mb-1">Turn good jobs into short case studies on your website:</p>
                    <ul className="pl-5 space-y-1 mt-2 list-disc">
                      <li>The problem</li>
                      <li>What you did</li>
                      <li>The result for the customer</li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="mb-1">Ask happy customers if they'll:</p>
                    <ul className="pl-5 space-y-1 mt-2 list-disc">
                      <li>Mention you in a local Facebook group</li>
                      <li>Tag your business on Instagram / LinkedIn</li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="mb-1">Join 1–2 solid directories or associations:</p>
                    <ul className="pl-5 space-y-1 mt-2 list-disc">
                      <li>Trade bodies</li>
                      <li>Local business networks</li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-amber-50 border border-amber-500 rounded-lg p-4">
              <p className="font-open-sans text-slate-800 mb-3"><strong>You don't need 200 spammy directory listings—a handful of relevant, trusted ones is far better.</strong></p>
              
              <p className="font-open-sans text-slate-700 mb-2">Common pitfalls to avoid:</p>
              <ul className="space-y-2 pl-5 font-open-sans text-md text-slate-600 list-disc">
                <li>Overusing junk directories, which dilutes your online presence</li>
                <li>Allowing inconsistent business information across listings, which damages credibility and confuses both customers and machines</li>
              </ul>
              
                  <p className="mt-3">
                    Keeping your details consistent and up to date across a small number of high-quality sources is far more effective.
                  </p>
                </div>
              </div>
            </section>

            {/* Step 6 */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">6</span>
                <h2 className="font-open-sans text-3xl font-semibold text-slate-950 border-b-0">Use AI Tools as a "Free Visibility Audit"</h2>
              </div>
              
              <div className="space-y-6 text-slate-700 font-open-sans leading-relaxed">
            
            <p className="font-open-sans text-md text-slate-600 mb-6">
              You don't need costly software to check your AI visibility. Use the AI tools themselves for a quick self-audit.
            </p>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-6">
              <h3 className="font-space-mono text-lg font-semibold text-slate-900 mb-4 uppercase">Action steps:</h3>
              
              <div className="space-y-4 font-open-sans text-md text-slate-600">
                <div>
                  <p className="mb-2"><strong>Open tools like:</strong></p>
                  <ul className="space-y-1 pl-5 list-disc">
                    <li>ChatGPT</li>
                    <li>Gemini</li>
                    <li>Perplexity</li>
                    <li>Or run Google searches that trigger AI Overviews</li>
                  </ul>
                </div>
                
                <div>
                  <p className="mb-2"><strong>Then ask questions like:</strong></p>
                  <div className="bg-white border border-slate-200 rounded p-3 space-y-2 font-open-sans text-sm italic">
                    <p className="text-slate-700">"Who are the best [service] providers in [location]?"</p>
                    <p className="text-slate-700">"Which companies can help with [problem] in [location]?"</p>
                    <p className="text-slate-700">"Who would you recommend for [service] for small businesses in [location]?"</p>
                  </div>
                </div>
                
                <div>
                  <p className="mb-2"><strong>Look at:</strong></p>
                  <ul className="space-y-2 pl-5 list-disc">
                    <li>Which competitors are mentioned?</li>
                    <li>What language is used to describe them?</li>
                    <li>What proof points are highlighted (years in business, reviews, specialization, locations)?</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <p className="font-open-sans text-md text-slate-600 mb-6">
              Your job is to make your online presence—website + GBP + reviews—line up with what AI tools seem to care about, in your own honest way.
            </p>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <p className="font-open-sans text-slate-800 mb-3">
                <strong>This costs nothing but your time and gives you a valuable "AI reality check."</strong>
              </p>
              
              <p className="font-open-sans text-slate-700 mb-2">To track your progress:</p>
              <ul className="space-y-2 pl-5 font-open-sans text-md text-slate-600 list-disc">
                <li>Run the same AI searches before and after you make improvements</li>
                <li>Monitor how often and where your business appears in AI snippets or local results</li>
                <li>Keep an eye on: number and quality of reviews, website analytics (traffic, calls, form fills, enquiries)</li>
                </ul>
              </div>
            </div>
            </section>

            {/* Step 7 */}
            <section className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">7</span>
                <h2 className="font-open-sans text-3xl font-semibold text-slate-950 border-b-0">When Money Is Tight, Focus on the Right Things First</h2>
              </div>
              
              <div className="space-y-6 text-slate-700 font-open-sans leading-relaxed">
            
            <p className="font-open-sans text-md text-slate-600 mb-6">
              When money is tight, it's easy to waste it on the wrong things—especially online.
            </p>
            
            <div className="bg-red-50 border border-red-500 rounded-lg p-4 mb-6">
              <p className="font-open-sans text-slate-800 mb-3"><strong>If you're just starting to build AI visibility, you don't need to:</strong></p>
              <ul className="space-y-2 pl-5 font-open-sans text-md text-slate-600 list-disc">
                <li>Buy expensive SEO / AI tools "just in case"</li>
                <li>Pay an agency to churn out generic, AI-written blogs every week</li>
                <li>Purchase hundreds of low-quality directory listings</li>
                <li>Get lost in tiny technical SEO tweaks while your core message is still unclear</li>
              </ul>
            </div>
            
            <div className="bg-green-50 border border-green-500 rounded-lg p-6 mb-6">
              <h3 className="font-space-mono text-lg font-semibold text-slate-900 mb-4 uppercase">Instead, stick to this order:</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-open-sans text-slate-800"><strong>Clarity</strong></p>
                    <p className="font-open-sans text-md text-slate-600">Clear "who/what/where" on your website and Google Business Profile</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-open-sans text-slate-800"><strong>Consistency</strong></p>
                    <p className="font-open-sans text-md text-slate-600">The same business details everywhere online</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-open-sans text-slate-800"><strong>Content</strong></p>
                    <p className="font-open-sans text-md text-slate-600">Honest answers to real questions + strong service pages</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-open-sans text-slate-800"><strong>Extras</strong></p>
                    <p className="font-open-sans text-md text-slate-600">Schema markup, fancy tools, or more complex strategies (later)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <p>
              Nail the fundamentals first. The extras only work well when the basics are already in place.
            </p>
          </div>
        </section>

        {/* Govisibi.ai Section */}
        <section className="mb-16">
              <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg shadow-lg overflow-hidden text-white p-8">
                <h2 className="font-open-sans text-3xl font-semibold text-white mb-6">Where Govisibi.ai Can Actually Help (Even on a Limited Budget)</h2>
            
            <p className="mb-6 font-open-sans text-md text-slate-50">
              At Govisibi.ai, we know most small businesses can't throw thousands at brand campaigns or big AI platforms.
            </p>
            
            <p className="mb-6 font-open-sans text-md text-slate-50">
              <strong>Our approach is simple:</strong>
            </p>
            
            <p className="mb-8 font-open-sans text-md text-slate-50">
              You focus on running your business. We help you make it easier for AI and search engines to find, understand, and trust your business.
            </p>
            
            <h3 className="font-open-sans text-2xl font-semibold text-white mb-4">For small budgets, that can look like:</h3>
            
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h4 className="font-space-mono text-xl font-semibold text-white mb-3 uppercase">1. AI Visibility Check (Starter Option)</h4>
                <p className="mb-3 font-open-sans text-md text-blue-50">A lightweight review where we:</p>
                <ul className="space-y-2 pl-5 font-open-sans text-md text-blue-50 list-disc">
                  <li>Check if / how your business appears in AI tools</li>
                  <li>Review your website + Google Business Profile</li>
                  <li>Give you a short, plain-English action list of what to fix first</li>
                </ul>
                <p className="mt-3 font-open-sans text-md text-blue-100 italic">No 40-page audit. Just the signal, not the noise.</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h4 className="font-space-mono text-xl font-semibold text-white mb-3 uppercase">2. Essentials Fix Pack</h4>
                <p className="mb-3 font-open-sans text-md text-blue-50">A fixed-price package where we help you:</p>
                <ul className="space-y-2 pl-5 font-open-sans text-md text-blue-50 list-disc">
                  <li>Clarify your "who/what/where" messaging</li>
                  <li>Structure 1–3 key service pages + FAQs</li>
                  <li>Clean up your Google Business Profile and core directory listings</li>
                  <li>Add basic structured data so machines can parse your information better</li>
                </ul>
                <p className="mt-3 font-open-sans text-md text-blue-100">
                  You get a more AI-ready and search-ready presence without needing an in-house SEO hire or a big agency retainer.
                </p>
              </div>
            </div>
            
            <div className="mt-8 bg-white/20 border-l-4 border-white p-4 rounded">
              <p className="font-open-sans text-white mb-3"><strong>For small business owners, deciding when to seek outside help is important:</strong></p>
              <ul className="space-y-2 font-open-sans text-md text-blue-50">
                <li><strong>Do it yourself</strong> when it's about simple updates to your listings or basic content</li>
                <li className="mt-2"><strong>Consider professional support when:</strong>
                  <ul className="pl-5 space-y-1 mt-2 list-disc">
                    <li>You're facing technical challenges</li>
                    <li>You need a joined-up strategy, not random actions</li>
                    <li>You want to implement more advanced AI tools and don't know where to start</li>
                  </ul>
                </li>
              </ul>
              <p className="mt-3 font-open-sans text-md text-blue-50">
                Knowing when to delegate lets you focus on your core business while still moving your digital visibility forward professionally.
              </p>
            </div>
          </div>
        </section>

        {/* Final Word */}
        <section className="mb-16">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
          <h2 className="font-open-sans text-3xl font-semibold text-slate-900 mb-6">Final Word: AI Visibility Isn't About Being "Famous"</h2>
          
          <p className="font-open-sans text-md text-slate-600 mb-6">
            Most small business owners think: "We're not a big brand, so AI won't care about us."
          </p>
          
          <p className="font-open-sans text-md text-slate-600 mb-6">
            But that's not how it works.
          </p>
          
          <div className="bg-slate-50 border-l-4 border-blue-600 p-6 mb-6">
            <p className="font-open-sans text-slate-800 mb-4">
              <strong>AI systems don't only surface famous brands. They surface:</strong>
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="font-open-sans text-md text-slate-700">Clear businesses</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="font-open-sans text-md text-slate-700">Consistent businesses</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="font-open-sans text-md text-slate-700">Trusted businesses</span>
              </div>
            </div>
          </div>
          
          <p className="font-open-sans text-md text-slate-600 mb-6">
            If you can do those three things—even on a small budget—you give yourself a real chance to show up when someone asks: "Who can help me with this problem in my area?"
          </p>
          
                <p className="text-lg">
                  And that's what real visibility is all about.
                </p>
              </div>
            </section>

            {/* Share */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-8 mt-12">
              <Link to="/insights">
                <Button variant="outline" className="px-4 py-2 border-slate-300 rounded-full font-medium hover:bg-slate-50">
                  <span className="text-blue-700 inline-flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to All Insights
                  </span>
                </Button>
              </Link>
              <Button variant="outline" className="px-4 py-2 border-slate-300 rounded-full font-medium hover:bg-slate-50">
                <span className="text-blue-700 inline-flex items-center">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Article
                </span>
              </Button>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="max-w-full md:max-w-[90%] mx-auto px-8 py-12 mt-0 border-t border-gray-200 bg-white rounded-xl rounded-bl-none rounded-br-none z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img src="/govisibi-logo.png" alt="VISIBI Logo" width="32" height="32" className="h-8 w-8" />
              <span className="text-2xl font-bold bg-slate-950 bg-clip-text text-transparent">VISIBI</span>
            </div>
            <p className="font-open-sans text-lg text-slate-900 max-w-md leading-relaxed">
              Track and manage your brand's presence across leading AI platforms.
            </p>
            <div className="flex gap-6">
              <a href="https://x.com/VisibiAI" target="_blank" rel="noopener noreferrer" className="font-space-mono text-sm text-gray-600 hover:text-blue-700 uppercase tracking-wide">
                X
              </a>
              <a href="http://linkedin.com/company/visibi-ai" target="_blank" rel="noopener noreferrer" className="font-space-mono text-sm text-gray-600 hover:text-blue-700 uppercase tracking-wide">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="font-sans text-xl text-slate-950 mb-2">
                Want your brand to stand out in the age of AI conversations?
              </h3>
              <p className="text-sm text-slate-600">
                Stay informed with expert updates on brand visibility across AI platforms.
              </p>
            </div>
            <div className="flex gap-2">
              <Input type="email" placeholder="Email Address" className="flex-1 font-space-mono text-sm placeholder:text-gray-400 rounded-full text-gray-900" />
              <Button className="bg-slate-900 text-white hover:bg-gray-800 font-space-mono text-sm uppercase px-6 rounded-full">Start Now</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-space-mono text-xs text-gray-500">© 2025 VISIBI — ALL RIGHTS RESERVED</p>
          <div className="flex gap-6">
            <Link className="font-space-mono text-xs text-gray-600 hover:text-blue-700 uppercase tracking-wide" to="/terms-of-use">
              Terms of Use
            </Link>
            <Link className="font-space-mono text-xs text-gray-600 hover:text-blue-700 uppercase tracking-wide" to="/privacy-policy">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

