import React from 'react';
import { Content } from '../types';
import { CheckCircle2, Phone, ClipboardList, Send } from 'lucide-react';

interface ServicesProps {
  content: Content['body'];
  onContactClick?: () => void;
}

export const Services: React.FC<ServicesProps> = ({ content, onContactClick }) => {
  return (
    <section className="bg-brand-light py-20 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Short Description */}
        <div className="text-center mb-16">
          <p className="text-xl md:text-3xl text-brand-navy font-semibold leading-relaxed max-w-3xl mx-auto">
            {content.description}
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          
          {/* Offer 1: Monthly (Highlighted - Peace of Mind) */}
          <div className="bg-white border-2 border-brand-teal rounded-3xl p-8 shadow-2xl flex flex-col relative overflow-hidden transform md:-translate-y-4">
            <div className="absolute top-0 right-0 left-0 h-3 bg-brand-teal"></div>
            <div className="absolute top-3 right-0 bg-brand-teal text-white text-xs font-bold px-3 py-1 rounded-l-lg shadow-sm">
               الأكثر طلباً
            </div>
            
            <h3 className="text-3xl font-extrabold text-brand-navy mb-3 mt-2">{content.offer1.name}</h3>
            <div className="text-3xl font-bold text-brand-teal mb-8 pb-4 border-b border-slate-100">{content.offer1.price}</div>
            
            <ul className="space-y-5 mb-10 flex-grow">
              {content.offer1.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-4 text-lg text-slate-700 font-bold">
                  <div className="bg-green-100 p-1 rounded-full">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" strokeWidth={3} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3">
              <a 
                href="tel:+212722618635"
                className="w-full bg-brand-teal hover:bg-[#166d85] text-white text-xl font-bold py-5 rounded-2xl text-center flex justify-center items-center gap-3 transition-all shadow-lg hover:shadow-xl"
              >
                <Phone size={24} fill="currentColor" />
                {content.offer1.button}
              </a>
              <button 
                onClick={onContactClick}
                className="w-full bg-brand-navy/10 hover:bg-brand-navy/20 text-brand-navy text-lg font-bold py-3 rounded-xl text-center flex justify-center items-center gap-2 transition-all border border-brand-navy/20"
              >
                <Send size={18} />
                Demander un devis
              </button>
            </div>
          </div>

          {/* Offer 2: One-time (Installation Only) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-lg flex flex-col">
            <h3 className="text-2xl font-bold text-slate-800 mb-3">{content.offer2.name}</h3>
            <div className="text-3xl font-bold text-slate-500 mb-8 pb-4 border-b border-slate-100">{content.offer2.price}</div>
            
            <ul className="space-y-5 mb-10 flex-grow">
              {content.offer2.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-4 text-lg text-slate-600 font-medium">
                  <CheckCircle2 className="w-6 h-6 text-slate-300 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              onClick={onContactClick}
              className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 text-xl font-bold py-5 rounded-2xl text-center flex justify-center items-center gap-3 transition-all border-2 border-slate-200 hover:border-slate-300"
            >
              <ClipboardList size={24} />
              {content.offer2.button}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};