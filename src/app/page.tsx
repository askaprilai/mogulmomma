'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e: Event) {
        e.preventDefault();
        const element = e.currentTarget as HTMLAnchorElement;
        const href = element.getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });

    // Navbar background on scroll
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
          navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Navigation */}
      <nav id="navbar" className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-black/10 z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-400 bg-clip-text text-transparent">
            👑 MogulMomma
          </div>
          <ul className="hidden md:flex gap-8 list-none">
            <li><a href="#home" className="text-slate-600 font-medium hover:text-purple-700 transition-colors">Home</a></li>
            <li><a href="#problem" className="text-slate-600 font-medium hover:text-purple-700 transition-colors">Challenges</a></li>
            <li><a href="#solution" className="text-slate-600 font-medium hover:text-purple-700 transition-colors">Solution</a></li>
            <li><a href="#assessment" className="text-slate-600 font-medium hover:text-purple-700 transition-colors">Assessment</a></li>
            <li><a href="#testimonials" className="text-slate-600 font-medium hover:text-purple-700 transition-colors">Success Stories</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-purple-700 via-purple-400 to-pink-400">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.3)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(196,181,253,0.3)_0%,transparent_50%),radial-gradient(circle_at_40%_40%,rgba(244,114,182,0.2)_0%,transparent_50%)] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-white">
            <div className="bg-white/25 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full inline-block font-semibold mb-8">
              ✨ Welcome to MogulMomma - Your Dream Mapping Partner
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-white to-slate-100 bg-clip-text text-transparent">
              You Bring the Dream, We Bring You the Map
            </h1>
            <p className="text-xl lg:text-2xl opacity-95 mb-8 font-light leading-relaxed">
              Accomplished women don&apos;t need another generic career coach. You need a strategic partner who understands your journey and helps you map your dreams into reality.
            </p>
            <Link href="/assessment" className="relative bg-gradient-to-r from-white to-slate-50 text-purple-700 px-10 py-5 rounded-full text-xl font-bold inline-block transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-black/20 overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-700/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
              Start Your Dream Assessment
            </Link>
          </div>
          <div className="text-center">
            <img 
              src="https://drive.google.com/uc?export=view&id=1F4oc3ksHIj_d8jVovXxGbyIshYFCQK2o" 
              alt="Founders of MogulMomma"
              className="w-full max-w-md mx-auto rounded-3xl shadow-2xl shadow-black/30 bg-white/10 backdrop-blur-sm border border-white/20"
            />
            <div className="text-white mt-4 font-semibold opacity-90">Founders of MogulMomma</div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-slate-800">
              We Get It. You&apos;re Facing Real Challenges
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              You&apos;ve achieved so much already, but something&apos;s missing. You know there&apos;s more for you, but the path isn&apos;t clear.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-700 to-pink-400"></div>
              <div className="text-5xl mb-5">🎯</div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-800">Your Dreams Feel Unclear</h3>
              <p className="text-slate-600 leading-relaxed">You have big aspirations but can&apos;t quite articulate what you want your next chapter to look like.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-700 to-pink-400"></div>
              <div className="text-5xl mb-5">🗺️</div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-800">No Clear Path Forward</h3>
              <p className="text-slate-600 leading-relaxed">You know where you want to go but have no concrete plan to get there. The journey feels overwhelming.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-700 to-pink-400"></div>
              <div className="text-5xl mb-5">⏰</div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-800">Time is Ticking</h3>
              <p className="text-slate-600 leading-relaxed">You feel like you&apos;re running out of time to make the impact you know you&apos;re capable of making.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-700 to-pink-400"></div>
              <div className="text-5xl mb-5">🔥</div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-800">Lost Your Spark</h3>
              <p className="text-slate-600 leading-relaxed">The passion that once drove you feels dimmed. You&apos;re successful but not fulfilled.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-700 to-pink-400"></div>
              <div className="text-5xl mb-5">🎭</div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-800">Imposter Syndrome</h3>
              <p className="text-slate-600 leading-relaxed">Despite your accomplishments, you doubt whether you can really achieve your biggest dreams.</p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-lg hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-700 to-pink-400"></div>
              <div className="text-5xl mb-5">🤝</div>
              <h3 className="text-2xl font-semibold mb-4 text-slate-800">No One Gets It</h3>
              <p className="text-slate-600 leading-relaxed">Your friends and family don&apos;t understand your ambitions. You feel alone in your vision.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
                The MogulMomma Method: Dream → Map → Reality
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                We don&apos;t just give you generic advice. We give you a personalized roadmap that transforms your dreams into actionable steps.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✨</span>
                  <span className="text-lg text-slate-700">Clarity on your unique vision and purpose</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✨</span>
                  <span className="text-lg text-slate-700">Step-by-step roadmap tailored to your goals</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✨</span>
                  <span className="text-lg text-slate-700">Community of like-minded accomplished women</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✨</span>
                  <span className="text-lg text-slate-700">AI-powered insights and personalized recommendations</span>
                </li>
              </ul>
              <Link href="#assessment" className="bg-gradient-to-r from-purple-700 to-purple-400 text-white px-8 py-4 rounded-full text-lg font-semibold hover:-translate-y-1 transition-all duration-300 inline-block">
                Get Your Custom Dream Map
              </Link>
            </div>
            <div className="text-center">
              <div className="w-full max-w-lg h-80 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center text-6xl text-purple-700 border-2 border-purple-200 mx-auto">
                🗺️
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment CTA Section */}
      <section id="assessment" className="py-24 bg-gradient-to-br from-purple-700 via-purple-400 to-pink-400 text-white text-center relative overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-100 bg-clip-text text-transparent">
            Get Crystal Clear on Your Next Move
          </h2>
          <p className="text-xl opacity-95 mb-12 max-w-3xl mx-auto">
            Take our comprehensive assessment to discover your unique path and get personalized recommendations for your journey.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 p-6 rounded-2xl">
              <div className="text-4xl mb-3">🧭</div>
              <h3 className="text-lg font-semibold mb-2">Clarity Assessment</h3>
              <p className="text-sm opacity-90">Discover your unique path forward</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 p-6 rounded-2xl">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-lg font-semibold mb-2">Personal Roadmap</h3>
              <p className="text-sm opacity-90">Get a customized action plan</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 p-6 rounded-2xl">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-sm opacity-90">Leverage cutting-edge AI analysis</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 p-6 rounded-2xl">
              <div className="text-4xl mb-3">🗺️</div>
              <h3 className="text-lg font-semibold mb-2">Dream Mapping</h3>
              <p className="text-sm opacity-90">Transform dreams into actions</p>
            </div>
          </div>
          
          <Link href="/assessment" className="bg-gradient-to-r from-white to-slate-50 text-purple-700 px-12 py-6 rounded-full text-xl font-bold inline-block transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-black/20">
            Take Your Free Assessment Now
          </Link>
        </div>
      </section>

      {/* Community Preview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
              Join 1,200+ Accomplished Women
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Connect with like-minded women who are also transforming their dreams into reality. Share insights, get support, and celebrate wins together.
            </p>
          </div>
          
          {/* Community Preview Posts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-slate-50 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                  SM
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Sarah Mitchell</div>
                  <div className="text-sm text-slate-600">Strategic Builder • 2h ago</div>
                </div>
              </div>
              <p className="text-slate-700 mb-3">
                &quot;Just completed my first 90-day roadmap and I&apos;m already seeing results! The clarity I gained from the assessment was game-changing. 🚀&quot;
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>❤️ 24 loves</span>
                <span>💬 8 comments</span>
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                  LJ
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Lisa Johnson</div>
                  <div className="text-sm text-slate-600">Transformational Guide • 5h ago</div>
                </div>
              </div>
              <p className="text-slate-700 mb-3">
                &quot;The community here is incredible! I&apos;ve found my accountability partner and we&apos;re both crushing our goals. Thank you MogulMomma! 💜&quot;
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>❤️ 31 loves</span>
                <span>💬 12 comments</span>
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                  RK
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Rachel Kim</div>
                  <div className="text-sm text-slate-600">Creative Catalyst • 1d ago</div>
                </div>
              </div>
              <p className="text-slate-700 mb-3">
                &quot;One year ago I was stuck in analysis paralysis. Today I launched my consulting business! Dreams really do become reality with the right map. ✨&quot;
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>❤️ 47 loves</span>
                <span>💬 15 comments</span>
              </div>
            </div>
          </div>
          
          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-700 mb-2">1,247</div>
              <div className="text-slate-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-700 mb-2">89</div>
              <div className="text-slate-600">Dreams Mapped This Week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-700 mb-2">156</div>
              <div className="text-slate-600">Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-700 mb-2">24/7</div>
              <div className="text-slate-600">Community Support</div>
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/community" className="bg-gradient-to-r from-purple-700 to-purple-400 text-white px-8 py-4 rounded-full text-lg font-semibold hover:-translate-y-1 transition-all duration-300 inline-block">
              Explore Our Community →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
              Success Stories That Inspire
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real women, real transformations, real results. See how MogulMomma has helped accomplished women turn their dreams into reality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <div className="text-5xl mb-6">⭐⭐⭐⭐⭐</div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                &quot;MogulMomma gave me the clarity I&apos;d been searching for. In 6 months, I went from confused about my next step to launching my dream consulting business.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                  AM
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Amanda Martinez</div>
                  <div className="text-sm text-slate-600">Strategic Consultant</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <div className="text-5xl mb-6">⭐⭐⭐⭐⭐</div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                &quot;The community aspect is incredible. I found my accountability partner here and we&apos;ve both achieved goals we thought were impossible.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                  TC
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Tanya Chen</div>
                  <div className="text-sm text-slate-600">Tech Executive</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <div className="text-5xl mb-6">⭐⭐⭐⭐⭐</div>
              <p className="text-slate-700 mb-6 leading-relaxed">
                &quot;The AI-powered insights were spot on. I discovered strengths I didn&apos;t know I had and now I&apos;m using them to build my empire.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                  DW
                </div>
                <div>
                  <div className="font-semibold text-slate-800">Diana Williams</div>
                  <div className="text-sm text-slate-600">Serial Entrepreneur</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-r from-slate-900 via-purple-900 to-pink-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">This Is Your MogulMomma Map</h2>
          <p className="text-xl lg:text-2xl opacity-90 mb-12">You can walk it alone, or we can walk it with you.</p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Link href="/assessment" className="bg-gradient-to-r from-white to-slate-50 text-purple-700 px-10 py-5 rounded-full text-xl font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              🗺️ Start With Free Dream Map
            </Link>
            <Link href="/membership" className="bg-white/20 border-2 border-white/30 text-white px-10 py-5 rounded-full text-xl font-bold transition-all duration-300 hover:bg-white hover:text-slate-800 hover:-translate-y-1">
              💎 Join Community ($97/mo)
            </Link>
          </div>
          
          <p className="text-sm opacity-80">
            ✨ Your dreams are waiting. Your map is ready. Your community is here.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-8">
            <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              👑 MogulMomma
            </div>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Empowering accomplished women to transform their career transitions into their greatest success stories.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <a href="#privacy" className="text-slate-300 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="text-slate-300 hover:text-white transition-colors">Terms of Service</a>
            <a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact Us</a>
            <a href="#about" className="text-slate-300 hover:text-white transition-colors">About</a>
          </div>
          
          <div className="text-center pt-8 border-t border-slate-700">
            <p className="text-slate-400">
              &copy; 2024 MogulMomma. All rights reserved. Made with ❤️ for extraordinary women.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
