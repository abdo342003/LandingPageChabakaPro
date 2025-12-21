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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">
        
        {/* Logo - Your Brand Image */}
        <div className="flex items-center hover:scale-105 transition-all duration-300 cursor-default group">
          <div className="relative">
            {/* Glow Effect Behind Logo */}
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Your Logo Image */}
            <img 
              src="/logo-transparent.png" 
              alt="ChabakaPro IT Solutions"
              className="h-14 sm:h-16 md:h-20 w-auto relative z-10 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)] group-hover:drop-shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all duration-300"
            />
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
