import React from 'react';
import { Language } from '../types';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLang: Language;
  onToggle: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang, onToggle }) => {
  return (
    <button
      onClick={() => onToggle(currentLang === 'ar' ? 'fr' : 'ar')}
      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors border border-white/30 backdrop-blur-sm"
      aria-label="Switch Language"
    >
      <Globe size={20} />
      <span className="font-bold text-base">
        {currentLang === 'ar' ? 'Français' : 'العربية'}
      </span>
    </button>
  );
};