import React from 'react';
import { Language } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Shield } from 'lucide-react';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/90 backdrop-blur-xl border-b border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-3 hover:opacity-90 transition-opacity cursor-default">
          <div className="relative flex items-center justify-center w-11 h-11 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
            <Shield className="w-6 h-6 text-cyan-400" strokeWidth={2} />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-xl"></div>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-white">Chabaka</span>
              <span className="text-cyan-400">Pro</span>
            </span>
            <span className="text-[10px] text-cyan-500/70 font-medium tracking-wider uppercase">Solutions IT</span>
          </div>
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