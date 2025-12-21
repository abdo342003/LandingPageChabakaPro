import React from 'react';
import { Content } from '../types';
import { Phone, Wifi, ShieldCheck, MessageSquare } from 'lucide-react';

interface HeroProps {
  content: Content['hero'];
  onContactClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ content, onContactClick }) => {
  return (
    <section className="relative bg-brand-navy text-white pb-20 pt-36 px-6 overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
        </svg>
      </div>

      {/* Main Hero Content */}
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center relative z-10">
        
        {/* Visual Trust Indicators */}
        <div className="flex gap-6 mb-8 opacity-90">
            <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm">
              <Wifi className="w-8 h-8 text-brand-teal" />
            </div>
            <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm">
              <ShieldCheck className="w-8 h-8 text-brand-accent" />
            </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight drop-shadow-lg">
          {content.headline}
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-200 mb-14 font-medium leading-relaxed max-w-2xl">
          {content.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="tel:+212722618635"
            className="group bg-brand-teal hover:bg-[#166d85] text-white text-xl md:text-2xl font-bold py-5 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-4 animate-glow-pulse transform hover:-translate-y-1"
          >
            <div className="bg-white/20 p-2 rounded-xl group-hover:bg-white/30 transition-colors">
              <Phone className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" />
            </div>
            <span>{content.cta}</span>
          </a>
          
          <button 
            onClick={onContactClick}
            className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-xl md:text-2xl font-bold py-5 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-4 border border-white/20 hover:border-white/40 transform hover:-translate-y-1"
          >
            <div className="bg-brand-accent/20 p-2 rounded-xl group-hover:bg-brand-accent/30 transition-colors">
              <MessageSquare className="w-7 h-7 md:w-8 md:h-8" />
            </div>
            <span>Devis Gratuit</span>
          </button>
        </div>

        <p className="mt-12 text-slate-300 text-base md:text-lg font-medium bg-white/5 py-3 px-8 rounded-full inline-block border border-white/10 backdrop-blur-sm">
          {content.detail}
        </p>
      </div>
    </section>
  );
};