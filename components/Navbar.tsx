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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-navy/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <div className="flex items-center gap-3 hover:opacity-90 transition-opacity cursor-default">
          <div className="relative flex items-center justify-center w-12 h-12 bg-brand-teal rounded-xl shadow-lg shadow-brand-teal/20 border border-white/10">
             <Shield className="w-7 h-7 text-white" strokeWidth={2.5} />
             <span className="absolute -bottom-1 text-[10px] font-black text-white bg-brand-navy px-1 rounded-full border border-brand-teal">CP</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-white leading-none">
              ChabakaPro
            </span>
            <span className="text-xs text-brand-teal font-medium tracking-wide opacity-90">
              IT Solutions
            </span>
          </div>
        </div>

        <LanguageSwitcher currentLang={lang} onToggle={setLang} />
      </div>
    </nav>
  );
};