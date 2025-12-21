import React, { useState } from 'react';
import { Content, UserSubmission } from '../types';
import { Send, CheckCircle, User, Phone, Store, MessageSquare } from 'lucide-react';
import { getDeviceInfo } from '../utils/deviceInfo';

interface ContactFormProps {
  content: Content['contact'];
  onSubmit: (submission: UserSubmission) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ content, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    business: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to send notification to WhatsApp
  const sendToWhatsApp = (data: typeof formData) => {
    const message = `🔔 *طلب جديد - ChabakaPro*\n\n👤 *الاسم:* ${data.name}\n📞 *الهاتف:* ${data.phone}\n🏪 *النشاط:* ${data.business}\n💬 *الرسالة:* ${data.message || 'لا يوجد'}\n\n⏰ *التاريخ:* ${new Date().toLocaleString('ar-MA')}\n\n---\n_تم الإرسال من موقع tech.chabakapro.com_`;
    
    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/212722618635?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Function to send notification via Email (using mailto)
  const sendToEmail = (data: typeof formData) => {
    const subject = `🔔 طلب جديد من ${data.name} - ChabakaPro`;
    const body = `طلب جديد من موقع ChabakaPro\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 الاسم: ${data.name}\n` +
      `📞 الهاتف: ${data.phone}\n` +
      `🏪 نوع النشاط: ${data.business}\n` +
      `💬 الرسالة: ${data.message || 'لا يوجد'}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `⏰ تاريخ الطلب: ${new Date().toLocaleString('ar-MA')}\n` +
      `🌐 المصدر: https://tech.chabakapro.com\n\n` +
      `---\n` +
      `ChabakaPro IT Solutions`;
    
    const mailtoUrl = `mailto:abdellaherraoui3@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.business) return;
    
    setIsSubmitting(true);
    
    // Collect device info when user submits the form
    const deviceInfo = getDeviceInfo();
    
    // Create submission object
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
    
    // Save to localStorage
    try {
      const existingData = localStorage.getItem('chabakapro_submissions');
      const submissions = existingData ? JSON.parse(existingData) : [];
      submissions.unshift(submission);
      localStorage.setItem('chabakapro_submissions', JSON.stringify(submissions));
      console.log('✅ Submission saved to localStorage:', submission);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
    
    // Notify parent component
    onSubmit(submission);
    
    // 📧 SEND EMAIL via FormSubmit.co (FREE - goes directly to your Gmail)
    try {
      const emailData = new FormData();
      emailData.append('name', formData.name);
      emailData.append('phone', formData.phone);
      emailData.append('business', formData.business);
      emailData.append('message', formData.message || 'لا يوجد');
      emailData.append('_subject', `🔔 طلب جديد من ${formData.name} - ChabakaPro`);
      emailData.append('_template', 'table');
      emailData.append('_captcha', 'false');
      
      fetch('https://formsubmit.co/ajax/abdellaherraoui3@gmail.com', {
        method: 'POST',
        body: emailData
      }).then(response => {
        if (response.ok) {
          console.log('✅ Email sent successfully!');
        }
      }).catch(err => console.log('Email error:', err));
    } catch (error) {
      console.error('Email sending error:', error);
    }
    
    // 📱 Send to WhatsApp - opens for BOTH numbers
    const whatsappMessage = `🔔 *طلب جديد - ChabakaPro*\n\n👤 *الاسم:* ${formData.name}\n📞 *الهاتف:* ${formData.phone}\n🏪 *النشاط:* ${formData.business}\n💬 *الرسالة:* ${formData.message || 'لا يوجد'}\n\n⏰ *التاريخ:* ${new Date().toLocaleString('ar-MA')}\n\n---\n_تم الإرسال من موقع tech.chabakapro.com_`;
    
    // Open WhatsApp for primary number
    window.open(`https://wa.me/212722618635?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    
    // Open WhatsApp for secondary number after a short delay
    setTimeout(() => {
      window.open(`https://wa.me/212770707686?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    }, 500);
    
    // Show success
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setFormData({ name: '', phone: '', business: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="bg-gradient-to-b from-brand-light to-white py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12 border border-green-200">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-700 mb-2">{content.successMessage}</h3>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-gradient-to-b from-brand-light to-white py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-navy mb-4">
            {content.title}
          </h2>
          <p className="text-xl text-slate-600 font-medium">
            {content.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
          <div className="space-y-6">
            {/* Name Field */}
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                <User className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={content.namePlaceholder}
                required
                className="w-full ps-12 pe-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-brand-teal focus:outline-none transition-colors bg-slate-50 focus:bg-white"
              />
            </div>

            {/* Phone Field */}
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                <Phone className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={content.phonePlaceholder}
                required
                dir="ltr"
                className="w-full ps-12 pe-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-brand-teal focus:outline-none transition-colors bg-slate-50 focus:bg-white"
              />
            </div>

            {/* Business Field */}
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                <Store className="w-5 h-5 text-slate-400" />
              </div>
              <input
                type="text"
                name="business"
                value={formData.business}
                onChange={handleChange}
                placeholder={content.businessPlaceholder}
                required
                className="w-full ps-12 pe-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-brand-teal focus:outline-none transition-colors bg-slate-50 focus:bg-white"
              />
            </div>

            {/* Message Field */}
            <div className="relative">
              <div className="absolute top-4 start-0 flex items-start ps-4 pointer-events-none">
                <MessageSquare className="w-5 h-5 text-slate-400" />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={content.messagePlaceholder}
                rows={4}
                className="w-full ps-12 pe-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-brand-teal focus:outline-none transition-colors bg-slate-50 focus:bg-white resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-teal hover:bg-[#166d85] disabled:bg-slate-400 text-white text-xl font-bold py-5 rounded-2xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
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
          </div>
        </form>
      </div>
    </section>
  );
};
