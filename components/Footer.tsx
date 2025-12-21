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
          
          <div className="mb-6">
            <h2 className="text-4xl font-black text-white tracking-tight">ChabakaPro</h2>
            <p className="text-brand-teal text-sm font-bold uppercase tracking-widest mt-1">IT Solutions</p>
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