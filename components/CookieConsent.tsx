import React, { useState, useEffect } from 'react';
import { CookieConsentContent } from '../types';
import { Cookie, X } from 'lucide-react';

interface CookieConsentProps {
  content: CookieConsentContent;
  onAccept: () => void;
  onDecline: () => void;
}

const COOKIE_CONSENT_KEY = 'chabakapro_cookie_consent';

export const CookieConsent: React.FC<CookieConsentProps> = ({ content, onAccept, onDecline }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setIsVisible(false);
    onDecline();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[90] p-4 animate-slide-up">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col md:flex-row items-center gap-4">
        {/* Icon */}
        <div className="bg-brand-teal/10 p-3 rounded-xl flex-shrink-0">
          <Cookie className="w-8 h-8 text-brand-teal" />
        </div>

        {/* Message */}
        <p className="text-slate-700 text-center md:text-start flex-1">
          {content.message}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors"
          >
            {content.declineButton}
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2.5 bg-brand-teal hover:bg-[#166d85] text-white rounded-xl font-medium transition-colors shadow-lg"
          >
            {content.acceptButton}
          </button>
        </div>

        {/* Close button */}
        <button
          onClick={handleDecline}
          aria-label="Fermer"
          className="absolute top-2 end-2 md:hidden text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Helper to check if cookies are accepted
export const isCookieConsentGiven = (): boolean => {
  return localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted';
};
