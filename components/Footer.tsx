import React from 'react';
import { Content } from '../types';
import { Phone, MessageCircle, MapPin, Award, ShieldCheck, ThumbsUp } from 'lucide-react';

interface FooterProps {
  content: Content['footer'];
}

export const Footer: React.FC<FooterProps> = ({ content }) => {
  return (
    <>
      <footer className="bg-brand-navy text-slate-300 py-16 px-6 border-t border-brand-teal/20">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* Enhanced Footer Logo */}
          <div className="mb-8 flex flex-col items-center">
            {/* Shield Icon */}
            <div className="mb-4">
              <svg viewBox="0 0 60 70" className="w-16 h-20 drop-shadow-[0_0_25px_rgba(34,211,238,0.5)]">
                <defs>
                  <linearGradient id="footerShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#67e8f9" />
                    <stop offset="50%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                  <radialGradient id="footerInnerGlow" cx="50%" cy="30%" r="60%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  <filter id="footerGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Shield */}
                <path 
                  d="M30 5 L52 13 L52 35 Q52 52 30 63 Q8 52 8 35 L8 13 Z" 
                  fill="url(#footerInnerGlow)" 
                  stroke="url(#footerShieldGrad)" 
                  strokeWidth="2.5"
                  filter="url(#footerGlow)"
                />
                
                {/* Morocco Map */}
                <path 
                  d="M20 22 C22 18, 28 17, 32 18 C36 19, 40 23, 42 28 C44 33, 43 38, 40 43 C37 48, 32 51, 27 51 C22 51, 18 48, 16 43 C14 38, 15 32, 17 27 C18 24, 19 23, 20 22 Z" 
                  fill="none" 
                  stroke="#22d3ee" 
                  strokeWidth="1.5"
                  filter="url(#footerGlow)"
                />
                
                {/* Circuit Nodes */}
                <circle cx="25" cy="28" r="2.5" fill="#67e8f9" />
                <circle cx="35" cy="32" r="2" fill="#22d3ee" />
                <circle cx="28" cy="42" r="2" fill="#14b8a6" />
                <line x1="25" y1="28" x2="35" y2="32" stroke="#22d3ee" strokeWidth="1" opacity="0.7" />
                <line x1="35" y1="32" x2="28" y2="42" stroke="#14b8a6" strokeWidth="1" opacity="0.7" />
                <line x1="28" y1="42" x2="25" y2="28" stroke="#22d3ee" strokeWidth="1" opacity="0.7" />
              </svg>
            </div>
            
            {/* Brand Text */}
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              <span className="text-white">Chabaka</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">Pro</span>
            </h2>
            <p className="text-cyan-400 text-sm font-bold uppercase tracking-[0.3em] mt-2">IT Solutions</p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
              <Award className="w-6 h-6 text-brand-gold" />
              <span className="text-lg font-bold text-slate-100">{content.badges[0]}</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
              <ShieldCheck className="w-6 h-6 text-brand-accent" />
              <span className="text-lg font-bold text-slate-100">{content.badges[1]}</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
              <ThumbsUp className="w-6 h-6 text-brand-teal" />
              <span className="text-lg font-bold text-slate-100">{content.badges[2]}</span>
            </div>
          </div>

          <p className="text-xl mb-10 text-slate-300 font-medium max-w-xl leading-relaxed">{content.trustMessage}</p>

          <div className="flex flex-col gap-5 w-full max-w-md">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+212722618635" 
                className="flex items-center justify-center gap-3 text-2xl font-bold text-white hover:text-brand-teal transition-colors py-2"
              >
                <Phone className="w-7 h-7" />
                <span dir="ltr">+212 722-618635</span>
              </a>
              <a 
                href="tel:+212770707686" 
                className="flex items-center justify-center gap-3 text-2xl font-bold text-white hover:text-brand-teal transition-colors py-2"
              >
                <Phone className="w-7 h-7" />
                <span dir="ltr">+212 770-707686</span>
              </a>
            </div>

            <a 
              href="https://wa.me/212722618635"
              className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white text-lg font-bold py-4 px-8 rounded-xl transition-colors w-full shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              {content.contactText}
            </a>
          </div>

          <div className="mt-12 flex items-center justify-center gap-2 text-slate-400 font-medium bg-black/20 py-2 px-6 rounded-full">
            <MapPin className="w-5 h-5 text-brand-teal" />
            {content.locations}
          </div>
          
          <div className="mt-8 text-slate-500 text-sm">
             © {new Date().getFullYear()} ChabakaPro. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Sticky Floating WhatsApp Button */}
      <a 
        href="https://wa.me/212722618635"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-transform hover:scale-110 flex items-center justify-center"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-9 h-9" fill="white" color="transparent" />
      </a>
    </>
  );
};