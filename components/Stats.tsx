import React, { useEffect, useState } from 'react';
import { Content } from '../types';
import { Users, Star, Clock, Award } from 'lucide-react';

interface StatsProps {
  content: Content['stats'];
}

const icons = [Users, Star, Clock, Award];

export const Stats: React.FC<StatsProps> = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats-section" className="bg-brand-navy py-20 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-teal rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-accent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-16">
          {content.title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {content.items.map((stat, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <div 
                key={idx}
                className={`bg-white/10 backdrop-blur-sm rounded-3xl p-6 md:p-8 text-center border border-white/10 hover:bg-white/15 transition-all transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 100}ms`, transitionDuration: '500ms' }}
              >
                <div className="bg-brand-teal/20 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-brand-teal" />
                </div>
                <div className="text-3xl md:text-5xl font-black text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-slate-300 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
