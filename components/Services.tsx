import React from 'react';
import { Content } from '../types';
import { CheckCircle2, Phone, ClipboardList, Send, Shield, Wifi } from 'lucide-react';

interface ServicesProps {
  content: Content['body'];
  onContactClick?: () => void;
}

export const Services: React.FC<ServicesProps> = ({ content, onContactClick }) => {
  return (
    <section className="bg-brand-light py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Short Description */}
        <div className="text-center mb-16">
          <p className="text-xl md:text-3xl text-brand-navy font-semibold leading-relaxed max-w-3xl mx-auto">
            {content.description}
          </p>
        </div>

        {/* Offers Grid - 2x2 on desktop */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* Offer 1: Monthly (Highlighted - Peace of Mind) */}
          <div className="bg-white border-2 border-brand-teal rounded-3xl p-8 shadow-2xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-3 bg-brand-teal"></div>
            <div className="absolute top-3 right-0 bg-brand-teal text-white text-xs font-bold px-3 py-1 rounded-l-lg shadow-sm">
               الأكثر طلباً
            </div>
            
            <h3 className="text-2xl font-extrabold text-brand-navy mb-3 mt-2">{content.offer1.name}</h3>
            <div className="text-2xl font-bold text-brand-teal mb-6 pb-4 border-b border-slate-100">{content.offer1.price}</div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              {content.offer1.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-base text-slate-700 font-bold">
                  <div className="bg-green-100 p-1 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" strokeWidth={3} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3">
              <a 
                href="tel:+212722618635"
                className="w-full bg-brand-teal hover:bg-[#166d85] text-white text-lg font-bold py-4 rounded-2xl text-center flex justify-center items-center gap-3 transition-all shadow-lg hover:shadow-xl"
              >
                <Phone size={20} fill="currentColor" />
                {content.offer1.button}
              </a>
              <button 
                onClick={onContactClick}
                className="w-full bg-brand-navy/10 hover:bg-brand-navy/20 text-brand-navy text-sm font-bold py-2 rounded-xl text-center flex justify-center items-center gap-2 transition-all border border-brand-navy/20"
              >
                <Send size={16} />
                Demander un devis
              </button>
            </div>
          </div>

          {/* Offer 2: One-time (Installation Only) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-lg flex flex-col">
            <h3 className="text-2xl font-bold text-slate-800 mb-3">{content.offer2.name}</h3>
            <div className="text-2xl font-bold text-slate-500 mb-6 pb-4 border-b border-slate-100">{content.offer2.price}</div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              {content.offer2.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-base text-slate-600 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-slate-300 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <button 
              onClick={onContactClick}
              className="w-full bg-slate-50 hover:bg-slate-100 text-slate-800 text-lg font-bold py-4 rounded-2xl text-center flex justify-center items-center gap-3 transition-all border-2 border-slate-200 hover:border-slate-300"
            >
              <ClipboardList size={20} />
              {content.offer2.button}
            </button>
          </div>

          {/* Offer 3: Digital Protection */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-400 rounded-3xl shadow-xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-3 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
            {content.offer3.badge && (
              <div className="absolute top-3 right-0 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-l-lg shadow-sm z-10">
                {content.offer3.badge}
              </div>
            )}
            
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src="/Laptop and smartphone with glowing shield protection.png" 
                alt="Digital Protection - حماية رقمية"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-50 to-transparent"></div>
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-extrabold text-purple-900 mb-3">{content.offer3.name}</h3>
              <div className="text-2xl font-bold text-purple-600 mb-6 pb-4 border-b border-purple-200">{content.offer3.price}</div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {content.offer3.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base text-purple-900 font-medium">
                    <div className="bg-purple-200 p-1 rounded-full mt-0.5">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0" strokeWidth={3} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={onContactClick}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white text-lg font-bold py-4 rounded-2xl text-center flex justify-center items-center gap-3 transition-all shadow-lg hover:shadow-xl"
              >
                <Shield size={20} />
                {content.offer3.button}
              </button>
            </div>
          </div>

          {/* Offer 4: WiFi Speed & Coverage Extension */}
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 border-2 border-cyan-400 rounded-3xl shadow-xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-3 bg-gradient-to-r from-cyan-500 to-teal-500"></div>
            {content.offer4.badge && (
              <div className="absolute top-3 right-0 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-l-lg shadow-sm z-10">
                {content.offer4.badge}
              </div>
            )}
            
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src="/des repeteurs wifi pour la propagation du wifi.png" 
                alt="WiFi Coverage Extension - توسيع تغطية الواي فاي"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-50 to-transparent"></div>
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-extrabold text-cyan-900 mb-3">{content.offer4.name}</h3>
              <div className="text-2xl font-bold text-cyan-600 mb-6 pb-4 border-b border-cyan-200">{content.offer4.price}</div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {content.offer4.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-base text-cyan-900 font-medium">
                    <div className="bg-cyan-200 p-1 rounded-full mt-0.5">
                      <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0" strokeWidth={3} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={onContactClick}
                className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white text-lg font-bold py-4 rounded-2xl text-center flex justify-center items-center gap-3 transition-all shadow-lg hover:shadow-xl"
              >
                <Wifi size={20} />
                {content.offer4.button}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};