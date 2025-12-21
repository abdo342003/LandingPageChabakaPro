import React from 'react';
import { Content } from '../types';
import { Star, Quote } from 'lucide-react';

interface TestimonialsProps {
  content: Content['testimonials'];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ content }) => {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-brand-navy text-center mb-16">
          {content.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {content.items.map((testimonial, idx) => (
            <div 
              key={idx}
              className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow relative group"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 start-6 bg-brand-teal p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                <Quote className="w-6 h-6 text-white" fill="currentColor" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mt-4 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-brand-gold" fill="currentColor" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-lg text-slate-700 font-medium leading-relaxed mb-8">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="border-t border-slate-100 pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-navy rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.business}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
