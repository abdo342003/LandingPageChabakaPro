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
        
        {/* Logo - Premium Holographic Design */}
        <div className="flex items-center gap-3 hover:scale-105 transition-all duration-300 cursor-default group">
          {/* Animated Shield with Morocco Circuit */}
          <div className="relative">
            {/* Outer Glow Ring */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500"></div>
            
            <svg viewBox="0 0 60 70" className="w-11 h-13 sm:w-14 sm:h-16 relative z-10 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]">
              <defs>
                {/* Premium Gradient */}
                <linearGradient id="navShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#67e8f9" />
                  <stop offset="25%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#14b8a6" />
                  <stop offset="75%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#67e8f9" />
                </linearGradient>
                
                {/* Inner Glow Gradient */}
                <radialGradient id="navInnerGlow" cx="50%" cy="30%" r="60%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0e1e33" stopOpacity="0.1" />
                </radialGradient>
                
                {/* Animated Stroke */}
                <linearGradient id="navAnimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0">
                    <animate attributeName="offset" values="0;1" dur="2s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="50%" stopColor="#67e8f9" stopOpacity="1">
                    <animate attributeName="offset" values="0.5;1.5" dur="2s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0">
                    <animate attributeName="offset" values="1;2" dur="2s" repeatCount="indefinite" />
                  </stop>
                </linearGradient>
                
                {/* Glow Filter */}
                <filter id="navGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="2" result="blur1" />
                  <feGaussianBlur stdDeviation="4" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              {/* Shield Outer Glow */}
              <path 
                d="M30 3 L54 12 L54 35 Q54 54 30 66 Q6 54 6 35 L6 12 Z" 
                fill="none" 
                stroke="#22d3ee" 
                strokeWidth="1"
                opacity="0.3"
                filter="url(#navGlow)"
              />
              
              {/* Shield Main */}
              <path 
                d="M30 5 L52 13 L52 35 Q52 52 30 63 Q8 52 8 35 L8 13 Z" 
                fill="url(#navInnerGlow)" 
                stroke="url(#navShieldGrad)" 
                strokeWidth="2"
                filter="url(#navGlow)"
                className="group-hover:fill-cyan-500/20 transition-all duration-300"
              />
              
              {/* Shield Inner Highlight */}
              <path 
                d="M30 9 L48 16 L48 34 Q48 48 30 58 Q12 48 12 34 L12 16 Z" 
                fill="none" 
                stroke="#67e8f9" 
                strokeWidth="0.5"
                opacity="0.4"
              />
              
              {/* Morocco Map - More Detailed */}
              <path 
                d="M20 22 C22 18, 28 17, 32 18 C36 19, 40 23, 42 28 C44 33, 43 38, 40 43 C37 48, 32 51, 27 51 C22 51, 18 48, 16 43 C14 38, 15 32, 17 27 C18 24, 19 23, 20 22 Z" 
                fill="none" 
                stroke="url(#navShieldGrad)" 
                strokeWidth="1.5"
                strokeLinejoin="round"
                filter="url(#navGlow)"
              />
              
              {/* Circuit Network Inside Morocco */}
              <g filter="url(#navGlow)">
                {/* Main Nodes - Cities */}
                <circle cx="25" cy="28" r="2.5" fill="#67e8f9">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="r" values="2;2.8;2" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="35" cy="32" r="2" fill="#22d3ee">
                  <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="28" cy="42" r="2" fill="#14b8a6">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.5s" />
                </circle>
                <circle cx="22" cy="35" r="1.5" fill="#67e8f9">
                  <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                </circle>
                
                {/* Connection Lines - Animated */}
                <path d="M25 28 Q30 28 35 32" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.8">
                  <animate attributeName="stroke-dasharray" values="0,50;25,25;50,0" dur="3s" repeatCount="indefinite" />
                </path>
                <path d="M35 32 Q32 38 28 42" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0.8">
                  <animate attributeName="stroke-dasharray" values="0,50;25,25;50,0" dur="3s" repeatCount="indefinite" begin="0.5s" />
                </path>
                <path d="M28 42 Q24 40 22 35" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.8">
                  <animate attributeName="stroke-dasharray" values="0,50;25,25;50,0" dur="3s" repeatCount="indefinite" begin="1s" />
                </path>
                <path d="M22 35 Q23 30 25 28" fill="none" stroke="#67e8f9" strokeWidth="1" opacity="0.8">
                  <animate attributeName="stroke-dasharray" values="0,50;25,25;50,0" dur="3s" repeatCount="indefinite" begin="1.5s" />
                </path>
              </g>
              
              {/* Data Pulse Effect */}
              <circle cx="25" cy="28" r="4" fill="none" stroke="#67e8f9" strokeWidth="0.5">
                <animate attributeName="r" values="3;8;3" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
          
          {/* Brand Name - Enhanced Typography */}
          <div className="flex flex-col leading-none">
            <div className="flex items-baseline">
              <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-cyan-50 transition-colors drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Chabaka</span>
              <span className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 tracking-tight group-hover:from-cyan-300 group-hover:to-teal-300 transition-all">Pro</span>
            </div>
            <span className="text-[10px] sm:text-xs text-cyan-400/90 font-semibold tracking-[0.2em] uppercase mt-0.5">IT Solutions</span>
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