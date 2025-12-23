import React from 'react';
import { Content } from '../types';
import { Phone, Shield, MessageSquare, ChevronRight, Wifi, Camera, Zap, CheckCircle } from 'lucide-react';

interface HeroProps {
  content: Content['hero'];
  onContactClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ content, onContactClick }) => {
  return (
    <section className="relative bg-[#0e1e33] text-white min-h-screen overflow-hidden">
      
      {/* Deep Navy Background with Void Effect */}
      <div className="absolute inset-0">
        {/* Base gradient - Deep Navy #0e1e33 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0e1e33] to-[#0e1e33]"></div>
        
        {/* Morocco 3D Holographic Map from Space */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/Morocco 3D holographic map from space.png" 
            alt="Morocco 3D Holographic Map"
            loading="lazy"
            width="1920"
            height="1080"
            className="w-full h-full object-cover opacity-80 scale-110 mix-blend-screen"
          />
        </div>
        
        {/* Casablanca Glow - Central Hub Effect */}
        <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-teal-400/40 rounded-full blur-[60px] animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* Bioluminescent Glow Orbs */}
        <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-cyan-500/15 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-[30%] left-[15%] w-[250px] h-[250px] bg-teal-500/10 rounded-full blur-[80px] animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Overlay gradients for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1e33] via-transparent to-[#0e1e33]/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1e33]/70 via-transparent to-[#0e1e33]/70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#0e1e33_80%)]"></div>
      </div>

      {/* Plexus Network Effect - Animated SVG */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            {/* Gradient for curved lines */}
            <linearGradient id="line-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0"/>
              <stop offset="30%" stopColor="#06b6d4" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="#14b8a6" stopOpacity="1"/>
              <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
            </linearGradient>
            
            {/* Radial glow for nodes */}
            <radialGradient id="node-glow">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="1"/>
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
            </radialGradient>
            
            {/* Filter for glow effect */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Curved Connection Lines - From Casablanca to World */}
          <g filter="url(#glow)" className="animate-dash">
            <path d="M 720 450 Q 400 200 100 300" fill="none" stroke="url(#line-glow)" strokeWidth="2" strokeLinecap="round"/>
            <path d="M 720 450 Q 900 150 1300 200" fill="none" stroke="url(#line-glow)" strokeWidth="2" strokeLinecap="round" style={{animationDelay: '0.5s'}}/>
            <path d="M 720 450 Q 500 600 150 700" fill="none" stroke="url(#line-glow)" strokeWidth="1.5" strokeLinecap="round" style={{animationDelay: '1s'}}/>
            <path d="M 720 450 Q 1000 550 1350 650" fill="none" stroke="url(#line-glow)" strokeWidth="1.5" strokeLinecap="round" style={{animationDelay: '1.5s'}}/>
            <path d="M 720 450 Q 600 100 400 50" fill="none" stroke="url(#line-glow)" strokeWidth="1" strokeLinecap="round" style={{animationDelay: '2s'}}/>
            <path d="M 720 450 Q 850 100 1100 80" fill="none" stroke="url(#line-glow)" strokeWidth="1" strokeLinecap="round" style={{animationDelay: '2.5s'}}/>
          </g>
          
          {/* Plexus Nodes */}
          <g filter="url(#glow)">
            {/* Central Hub - Casablanca */}
            <circle cx="720" cy="450" r="8" fill="url(#node-glow)" className="animate-pulse"/>
            <circle cx="720" cy="450" r="15" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.5" className="animate-ping"/>
            
            {/* Connected Cities */}
            <circle cx="100" cy="300" r="4" fill="#22d3ee" className="animate-pulse" style={{animationDelay: '0.3s'}}/>
            <circle cx="1300" cy="200" r="4" fill="#14b8a6" className="animate-pulse" style={{animationDelay: '0.6s'}}/>
            <circle cx="150" cy="700" r="3" fill="#22d3ee" className="animate-pulse" style={{animationDelay: '0.9s'}}/>
            <circle cx="1350" cy="650" r="3" fill="#14b8a6" className="animate-pulse" style={{animationDelay: '1.2s'}}/>
            <circle cx="400" cy="50" r="3" fill="#22d3ee" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
            <circle cx="1100" cy="80" r="3" fill="#14b8a6" className="animate-pulse" style={{animationDelay: '1.8s'}}/>
          </g>
        </svg>
      </div>

      {/* Floating Digital Particles */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: i % 2 === 0 ? '#22d3ee' : '#14b8a6',
              boxShadow: `0 0 ${10 + Math.random() * 10}px ${i % 2 === 0 ? '#22d3ee' : '#14b8a6'}`,
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Subtle Tech Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tech-grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#22d3ee" strokeWidth="0.5"/>
              <circle cx="0" cy="0" r="1" fill="#22d3ee"/>
              <circle cx="100" cy="0" r="1" fill="#22d3ee"/>
              <circle cx="0" cy="100" r="1" fill="#22d3ee"/>
              <circle cx="100" cy="100" r="1" fill="#22d3ee"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-grid)"/>
        </svg>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 pt-28 pb-20 min-h-screen flex flex-col justify-center">
        
        <div className="text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-full px-5 py-2.5 mb-8 backdrop-blur-md shadow-lg shadow-cyan-500/10">
            <div className="relative">
              <Shield className="w-5 h-5 text-cyan-400" />
              <div className="absolute inset-0 animate-ping">
                <Shield className="w-5 h-5 text-cyan-400 opacity-50" />
              </div>
            </div>
            <span className="text-cyan-200 text-sm font-semibold tracking-wide">ChabakaPro - خبراء الشبكات والحماية</span>
          </div>

          {/* Main Headline with Animation */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
            <span className="inline-block bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
              {content.headline}
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-slate-300/90 mb-10 font-medium leading-relaxed max-w-3xl mx-auto">
            {content.subheadline}
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-sm text-slate-300">
              <Wifi className="w-4 h-4 text-cyan-400" />
              <span>واي فاي احترافي</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-sm text-slate-300">
              <Camera className="w-4 h-4 text-teal-400" />
              <span>كاميرات مراقبة</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-sm text-slate-300">
              <Shield className="w-4 h-4 text-purple-400" />
              <span>حماية رقمية</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-sm text-slate-300">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>تدخل سريع</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a 
              href="tel:+212722618635"
              className="group relative bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-lg md:text-xl font-bold py-4 px-10 rounded-2xl shadow-2xl shadow-cyan-500/30 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 hover:shadow-cyan-500/50 overflow-hidden"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <Phone className="w-6 h-6" fill="currentColor" />
              <span>{content.cta}</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <button 
              onClick={onContactClick}
              className="group bg-white/5 hover:bg-white/10 backdrop-blur-md text-white text-lg md:text-xl font-bold py-4 px-10 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 border border-white/20 hover:border-cyan-400/50 transform hover:-translate-y-1"
            >
              <MessageSquare className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Devis Gratuit</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-12 text-sm">
            <div className="flex items-center gap-1.5 text-slate-400">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>خدمة مضمونة</span>
            </div>
            <div className="w-1 h-1 bg-slate-600 rounded-full hidden sm:block"></div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>تقني معتمد</span>
            </div>
            <div className="w-1 h-1 bg-slate-600 rounded-full hidden sm:block"></div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>دعم متواصل</span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-cyan-500/40 transition-all hover:shadow-lg hover:shadow-cyan-500/10 cursor-default">
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent mb-1 group-hover:scale-105 transition-transform">500+</div>
              <div className="text-slate-400 text-sm font-medium">محل تم تركيبه</div>
            </div>
            <div className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-teal-500/40 transition-all hover:shadow-lg hover:shadow-teal-500/10 cursor-default">
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent mb-1 group-hover:scale-105 transition-transform">98%</div>
              <div className="text-slate-400 text-sm font-medium">رضا العملاء</div>
            </div>
            <div className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-emerald-500/40 transition-all hover:shadow-lg hover:shadow-emerald-500/10 cursor-default">
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent mb-1 group-hover:scale-105 transition-transform">24/7</div>
              <div className="text-slate-400 text-sm font-medium">دعم متواصل</div>
            </div>
            <div className="group bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-purple-500/40 transition-all hover:shadow-lg hover:shadow-purple-500/10 cursor-default">
              <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent mb-1 group-hover:scale-105 transition-transform">5+</div>
              <div className="text-slate-400 text-sm font-medium">سنوات خبرة</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc"/>
        </svg>
      </div>

      {/* Custom Animations for Plexus Effect */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.4; 
          }
          50% { 
            transform: translateY(-30px) scale(1.3); 
            opacity: 1; 
          }
        }
        @keyframes dash {
          0% { 
            stroke-dasharray: 0, 2000; 
            stroke-dashoffset: 0; 
            opacity: 0.3;
          }
          50% { 
            stroke-dasharray: 800, 2000; 
            stroke-dashoffset: -400; 
            opacity: 1;
          }
          100% { 
            stroke-dasharray: 0, 2000; 
            stroke-dashoffset: -2000; 
            opacity: 0.3;
          }
        }
        @keyframes pulse-glow {
          0%, 100% { 
            filter: drop-shadow(0 0 5px #22d3ee) drop-shadow(0 0 10px #22d3ee);
            opacity: 0.7;
          }
          50% { 
            filter: drop-shadow(0 0 15px #22d3ee) drop-shadow(0 0 30px #14b8a6);
            opacity: 1;
          }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-dash {
          animation: dash 6s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};