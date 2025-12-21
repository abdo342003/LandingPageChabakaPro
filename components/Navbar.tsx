import React from 'react';
import { Language } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        
        {/* Logo - Custom SVG matching the brand */}
        <div className="flex items-center gap-3 hover:scale-105 transition-transform cursor-default group">
          {/* Shield Icon with Morocco Map */}
          <div className="relative">
            <svg viewBox="0 0 60 70" className="w-10 h-12 sm:w-12 sm:h-14 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
              {/* Outer Shield Glow */}
              <defs>
                <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <filter id="shieldGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              {/* Shield Shape */}
              <path 
                d="M30 2 L55 12 L55 35 Q55 55 30 68 Q5 55 5 35 L5 12 Z" 
                fill="none" 
                stroke="url(#shieldGradient)" 
                strokeWidth="2.5"
                filter="url(#shieldGlow)"
                className="group-hover:stroke-cyan-300 transition-all"
              />
              
              {/* Inner Shield Fill */}
              <path 
                d="M30 6 L52 15 L52 35 Q52 52 30 64 Q8 52 8 35 L8 15 Z" 
                fill="rgba(6, 182, 212, 0.1)"
                className="group-hover:fill-cyan-500/20 transition-all"
              />
              
              {/* Morocco Map Stylized */}
              <path 
                d="M22 20 L28 18 L35 22 L38 28 L40 35 L38 42 L32 48 L25 50 L20 45 L18 38 L20 30 L22 20 Z" 
                fill="none" 
                stroke="#22d3ee" 
                strokeWidth="1.5"
                strokeLinejoin="round"
                className="group-hover:stroke-cyan-300 transition-all"
              />
              
              {/* Circuit Nodes on Morocco */}
              <circle cx="25" cy="25" r="2" fill="#22d3ee" className="animate-pulse" />
              <circle cx="35" cy="30" r="1.5" fill="#14b8a6" className="animate-pulse" style={{animationDelay: '0.3s'}} />
              <circle cx="28" cy="40" r="1.5" fill="#22d3ee" className="animate-pulse" style={{animationDelay: '0.6s'}} />
              
              {/* Connection Lines */}
              <line x1="25" y1="25" x2="35" y2="30" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6" />
              <line x1="35" y1="30" x2="28" y2="40" stroke="#14b8a6" strokeWidth="0.8" opacity="0.6" />
              <line x1="28" y1="40" x2="25" y2="25" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6" />
            </svg>
          </div>
          
          {/* Brand Name */}
          <div className="flex flex-col leading-none">
            <div className="flex items-baseline">
              <span className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-cyan-50 transition-colors">Chabaka</span>
              <span className="text-lg sm:text-xl font-bold text-cyan-400 tracking-tight group-hover:text-cyan-300 transition-colors">Pro</span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-cyan-500/80 font-medium tracking-widest uppercase mt-0.5">IT Solutions</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-4">
          <LanguageSwitcher currentLang={lang} onToggle={setLang} />
          
          <a 
            href="tel:+212722618635"
            className="hidden sm:flex bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white text-sm font-semibold py-2.5 px-5 rounded-lg transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105"
          >
            {lang === 'ar' ? 'اتصل الآن' : 'Contactez-nous'}
          </a>
        </div>
      </div>
    </nav>
  );
};