import React, { useState, useEffect } from 'react';
import { Content, UserSubmission } from '../types';
import { Send, CheckCircle, User, Phone, Store, MessageSquare, X, Sparkles } from 'lucide-react';
import { getDeviceInfo } from '../utils/deviceInfo';

interface ContactModalProps {
  content: Content['contact'];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (submission: UserSubmission) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ content, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    business: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.business) return;
    
    setIsSubmitting(true);
    const deviceInfo = getDeviceInfo();
    
    setTimeout(() => {
      const submission: UserSubmission = {
        id: Date.now().toString(),
        name: formData.name,
        phone: formData.phone,
        business: formData.business,
        message: formData.message,
        timestamp: new Date(),
        status: 'new',
        deviceInfo: deviceInfo
      };
      
      onSubmit(submission);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        setFormData({ name: '', phone: '', business: '', message: '' });
        setIsSubmitted(false);
        onClose();
      }, 2500);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-brand-navy/80 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in">
        {/* Header Decoration */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-teal via-brand-accent to-brand-teal" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 z-10 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>

        {isSubmitted ? (
          /* Success State */
          <div className="p-10 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-14 h-14 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-700 mb-2">{content.successMessage}</h3>
          </div>
        ) : (
          /* Form */
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-brand-teal/10 text-brand-teal px-4 py-2 rounded-full text-sm font-bold mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Devis Gratuit</span>
              </div>
              <h2 className="text-3xl font-extrabold text-brand-navy mb-2">
                {content.title}
              </h2>
              <p className="text-slate-500 font-medium">
                {content.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="relative group">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none transition-colors group-focus-within:text-brand-teal">
                  <User className="w-5 h-5 text-slate-400 group-focus-within:text-brand-teal transition-colors" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={content.namePlaceholder}
                  required
                  className="w-full ps-12 pe-4 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:border-brand-teal focus:outline-none transition-all bg-slate-50 focus:bg-white focus:shadow-lg focus:shadow-brand-teal/10"
                />
              </div>

              {/* Phone Field */}
              <div className="relative group">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                  <Phone className="w-5 h-5 text-slate-400 group-focus-within:text-brand-teal transition-colors" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={content.phonePlaceholder}
                  required
                  dir="ltr"
                  className="w-full ps-12 pe-4 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:border-brand-teal focus:outline-none transition-all bg-slate-50 focus:bg-white focus:shadow-lg focus:shadow-brand-teal/10"
                />
              </div>

              {/* Business Field */}
              <div className="relative group">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                  <Store className="w-5 h-5 text-slate-400 group-focus-within:text-brand-teal transition-colors" />
                </div>
                <input
                  type="text"
                  name="business"
                  value={formData.business}
                  onChange={handleChange}
                  placeholder={content.businessPlaceholder}
                  required
                  className="w-full ps-12 pe-4 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:border-brand-teal focus:outline-none transition-all bg-slate-50 focus:bg-white focus:shadow-lg focus:shadow-brand-teal/10"
                />
              </div>

              {/* Message Field */}
              <div className="relative group">
                <div className="absolute top-4 start-0 flex items-start ps-4 pointer-events-none">
                  <MessageSquare className="w-5 h-5 text-slate-400 group-focus-within:text-brand-teal transition-colors" />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={content.messagePlaceholder}
                  rows={3}
                  className="w-full ps-12 pe-4 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:border-brand-teal focus:outline-none transition-all bg-slate-50 focus:bg-white resize-none focus:shadow-lg focus:shadow-brand-teal/10"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-brand-teal to-[#166d85] hover:from-[#166d85] hover:to-brand-teal disabled:from-slate-400 disabled:to-slate-400 text-white text-xl font-bold py-5 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:shadow-brand-teal/20 flex items-center justify-center gap-3 mt-6"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    {content.submitButton}
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
