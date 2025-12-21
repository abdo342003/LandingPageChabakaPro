import React from 'react';
import { Language } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/95 backdrop-blur-xl border-b border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center hover:opacity-90 transition-opacity cursor-default">
          <img 
            src="/logo.png" 
            alt="ChabakaPro IT Solutions"
            className="h-12 sm:h-14 w-auto drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher currentLang={lang} onToggle={setLang} />
          
          <a 
            href="tel:+212722618635"
            className="hidden sm:flex bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white text-sm font-semibold py-2.5 px-5 rounded-lg transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
          >
            {lang === 'ar' ? 'اتصل الآن' : 'Contactez-nous'}
          </a>
        </div>
      </div>
    </nav>
  );
};