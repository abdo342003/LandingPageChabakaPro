import React, { useState, useEffect, useCallback } from 'react';
import { CONTENT, ADMIN_CONTENT, COOKIE_CONSENT_CONTENT } from './constants';
import { Language, UserSubmission } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Stats } from './components/Stats';
import { Testimonials } from './components/Testimonials';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { AdminLogin } from './components/AdminLogin';
import { CookieConsent } from './components/CookieConsent';

// Local storage keys
const STORAGE_KEYS = {
  SUBMISSIONS: 'chabakapro_submissions',
  LANGUAGE: 'chabakapro_language',
  ADMIN_SESSION: 'chabakapro_admin_session',
  COOKIE_CONSENT: 'chabakapro_cookie_consent',
};

// Admin session expiry (24 hours in milliseconds)
const ADMIN_SESSION_EXPIRY = 24 * 60 * 60 * 1000;

function App() {
  const [lang, setLang] = useState<Language>(() => {
    // Load language preference from localStorage
    const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return (savedLang === 'ar' || savedLang === 'fr') ? savedLang : 'ar';
  });
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    // Check for valid admin session
    const session = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
    if (session) {
      try {
        const { expiry } = JSON.parse(session);
        if (expiry && Date.now() < expiry) {
          return true;
        }
        // Session expired, clean up
        localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
      } catch (e) {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
      }
    }
    return false;
  });
  const [showContactModal, setShowContactModal] = useState(false);
  const [submissions, setSubmissions] = useState<UserSubmission[]>([]);

  // Load submissions from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSubmissions(parsed.map((s: UserSubmission) => ({
          ...s,
          timestamp: new Date(s.timestamp)
        })));
      } catch (e) {
        console.error('Error loading submissions:', e);
        // Reset corrupted data
        localStorage.removeItem(STORAGE_KEYS.SUBMISSIONS);
      }
    }
  }, []);

  // Save submissions to localStorage whenever they change
  useEffect(() => {
    if (submissions.length > 0) {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
    }
  }, [submissions]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  }, [lang]);

  // Handle admin authentication with session persistence
  const handleAdminLogin = useCallback((password: string) => {
    if (password === 'ChabakaPro2025!') {
      setIsAdminAuthenticated(true);
      // Save session with expiry
      const session = {
        authenticated: true,
        expiry: Date.now() + ADMIN_SESSION_EXPIRY,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(session));
      return true;
    }
    return false;
  }, []);

  // Handle admin logout
  const handleAdminLogout = useCallback(() => {
    setIsAdminAuthenticated(false);
    setShowAdmin(false);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  }, []);

  // Secret keyboard shortcut: Ctrl+Shift+A to toggle admin panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        if (isAdminAuthenticated) {
          setShowAdmin(prev => !prev);
        } else {
          setShowAdmin(true);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminAuthenticated]);

  // Auto-show contact modal after 2 seconds (only once per session)
  useEffect(() => {
    const POPUP_SHOWN_KEY = 'chabakapro_popup_shown';
    const hasShownPopup = sessionStorage.getItem(POPUP_SHOWN_KEY);
    
    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setShowContactModal(true);
        sessionStorage.setItem(POPUP_SHOWN_KEY, 'true');
      }, 2000); // Show after 2 seconds
      
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Update the HTML dir attribute for proper RTL/LTR support
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Set Font based on language
    if (lang === 'ar') {
      document.body.style.fontFamily = "'Tajawal', sans-serif";
    } else {
      document.body.style.fontFamily = "'Inter', sans-serif";
    }
  }, [lang]);

  const content = CONTENT[lang];
  const adminContent = ADMIN_CONTENT[lang];
  const cookieContent = COOKIE_CONSENT_CONTENT[lang];

  const handleCookieAccept = useCallback(() => {
    console.log('Cookies accepted - analytics enabled');
  }, []);

  const handleCookieDecline = useCallback(() => {
    console.log('Cookies declined - analytics disabled');
  }, []);

  const handleNewSubmission = useCallback((submission: UserSubmission) => {
    setSubmissions(prev => [submission, ...prev]);
  }, []);

  const handleUpdateStatus = useCallback((id: string, status: UserSubmission['status']) => {
    setSubmissions(prev => 
      prev.map(s => s.id === id ? { ...s, status } : s)
    );
  }, []);

  const handleDeleteSubmission = useCallback((id: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      setSubmissions(prev => prev.filter(s => s.id !== id));
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar lang={lang} setLang={setLang} />
      <Hero content={content.hero} onContactClick={() => setShowContactModal(true)} />
      <Stats content={content.stats} />
      <Services content={content.body} onContactClick={() => setShowContactModal(true)} />
      <Footer content={content.footer} />
      
      {/* Contact Modal Popup */}
      <ContactModal
        content={content.contact}
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        onSubmit={handleNewSubmission}
      />
      
      {/* Hidden Admin Panel - Toggle with Ctrl+Shift+A */}
      {showAdmin && (
        isAdminAuthenticated ? (
          <AdminPanel
            content={adminContent}
            submissions={submissions}
            onClose={() => setShowAdmin(false)}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDeleteSubmission}
            onLogout={handleAdminLogout}
            lang={lang}
          />
        ) : (
          <AdminLogin
            onLogin={(password) => {
              if (!handleAdminLogin(password)) {
                alert(lang === 'ar' ? 'كلمة المرور غير صحيحة' : 'Mot de passe incorrect');
              }
            }}
            onClose={() => setShowAdmin(false)}
            lang={lang}
          />
        )
      )}
      
      {/* Cookie Consent Banner */}
      <CookieConsent
        content={cookieContent}
        onAccept={handleCookieAccept}
        onDecline={handleCookieDecline}
      />
    </div>
  );
}

export default App;