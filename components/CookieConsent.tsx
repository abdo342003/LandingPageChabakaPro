import React, { useState, useEffect } from 'react';
import { CookieConsentContent } from '../types';
import { Shield, ExternalLink } from 'lucide-react';
import { supabase } from '../utils/supabase';

interface CookieConsentProps {
  content: CookieConsentContent;
  onAccept: () => void;
  onDecline: () => void;
}

const COOKIE_CONSENT_KEY = 'chabakapro_cookie_consent';
const COOKIE_DATA_KEY = 'chabakapro_cookie_data';

// Comprehensive cookie data structure
interface CookieData {
  // Authentication & Security
  auth: {
    sessionId: string;
    authToken: string;
    csrfToken: string;
    loginStatus: boolean;
    lastLogin: string;
  };
  // Commerce & State
  commerce: {
    cartId: string;
    wishlistId: string;
    formData: {
      savedFields: Record<string, string>;
    };
    lastActivity: string;
  };
  // User Preferences
  preferences: {
    language: string;
    theme: 'light' | 'dark' | 'system';
    region: string;
    currency: string;
    fontSize: 'small' | 'medium' | 'large';
    accessibilityMode: boolean;
  };
  // Tracking & Behavioral
  tracking: {
    visitorId: string;
    sessionCount: number;
    firstVisit: string;
    lastVisit: string;
    pageViews: number;
    clickstream: Array<{ page: string; timestamp: string; action: string }>;
    referralSource: string;
    utmParams: {
      source?: string;
      medium?: string;
      campaign?: string;
      term?: string;
      content?: string;
    };
    adSegments: string[];
    interests: string[];
  };
  // Device Metadata
  device: {
    screenResolution: string;
    colorDepth: number;
    pixelRatio: number;
    browserType: string;
    browserVersion: string;
    platform: string;
    isMobile: boolean;
    isTablet: boolean;
    connectionSpeed: string;
    doNotTrack: boolean;
    cookiesEnabled: boolean;
    timezone: string;
    language: string;
  };
  // Consent metadata
  consent: {
    timestamp: string;
    version: string;
    categories: {
      essential: boolean;
      functional: boolean;
      analytics: boolean;
      marketing: boolean;
    };
  };
}

// Generate unique IDs
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Generate secure token
const generateToken = (length: number = 32): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Get connection speed estimate
const getConnectionSpeed = (): string => {
  const connection = (navigator as any).connection || 
                     (navigator as any).mozConnection || 
                     (navigator as any).webkitConnection;
  if (connection) {
    return connection.effectiveType || 'unknown';
  }
  return 'unknown';
};

// Collect comprehensive cookie data
export const collectCookieData = (): CookieData => {
  const existingData = getCookieData();
  const now = new Date().toISOString();
  const userAgent = navigator.userAgent;
  
  // Parse UTM parameters
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {
    source: urlParams.get('utm_source') || existingData?.tracking.utmParams.source,
    medium: urlParams.get('utm_medium') || existingData?.tracking.utmParams.medium,
    campaign: urlParams.get('utm_campaign') || existingData?.tracking.utmParams.campaign,
    term: urlParams.get('utm_term') || existingData?.tracking.utmParams.term,
    content: urlParams.get('utm_content') || existingData?.tracking.utmParams.content,
  };

  // Detect device type
  const isMobile = /Mobi|Android|iPhone/i.test(userAgent);
  const isTablet = /iPad|Tablet/i.test(userAgent);

  // Detect browser
  const getBrowser = (): { name: string; version: string } => {
    if (userAgent.includes('Firefox/')) {
      return { name: 'Firefox', version: userAgent.split('Firefox/')[1]?.split(' ')[0] || '' };
    }
    if (userAgent.includes('Edg/')) {
      return { name: 'Edge', version: userAgent.split('Edg/')[1]?.split(' ')[0] || '' };
    }
    if (userAgent.includes('Chrome/')) {
      return { name: 'Chrome', version: userAgent.split('Chrome/')[1]?.split(' ')[0] || '' };
    }
    if (userAgent.includes('Safari/') && !userAgent.includes('Chrome')) {
      return { name: 'Safari', version: userAgent.split('Version/')[1]?.split(' ')[0] || '' };
    }
    return { name: 'Unknown', version: '' };
  };

  const browser = getBrowser();

  return {
    auth: {
      sessionId: existingData?.auth.sessionId || `SESS_${generateToken(24)}`,
      authToken: existingData?.auth.authToken || generateToken(48),
      csrfToken: generateToken(32), // Regenerate CSRF token each time
      loginStatus: false,
      lastLogin: existingData?.auth.lastLogin || '',
    },
    commerce: {
      cartId: existingData?.commerce.cartId || `CART_${generateUUID()}`,
      wishlistId: existingData?.commerce.wishlistId || `WISH_${generateUUID()}`,
      formData: {
        savedFields: existingData?.commerce.formData.savedFields || {},
      },
      lastActivity: now,
    },
    preferences: {
      language: navigator.language || 'en-US',
      theme: existingData?.preferences.theme || 'system',
      region: Intl.DateTimeFormat().resolvedOptions().locale || 'US',
      currency: existingData?.preferences.currency || 'MAD',
      fontSize: existingData?.preferences.fontSize || 'medium',
      accessibilityMode: existingData?.preferences.accessibilityMode || false,
    },
    tracking: {
      visitorId: existingData?.tracking.visitorId || generateUUID(),
      sessionCount: (existingData?.tracking.sessionCount || 0) + 1,
      firstVisit: existingData?.tracking.firstVisit || now,
      lastVisit: now,
      pageViews: (existingData?.tracking.pageViews || 0) + 1,
      clickstream: [
        ...(existingData?.tracking.clickstream || []).slice(-49), // Keep last 50 entries
        { page: window.location.pathname, timestamp: now, action: 'pageview' }
      ],
      referralSource: document.referrer || 'direct',
      utmParams,
      adSegments: existingData?.tracking.adSegments || [],
      interests: existingData?.tracking.interests || [],
    },
    device: {
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      colorDepth: window.screen.colorDepth,
      pixelRatio: window.devicePixelRatio || 1,
      browserType: browser.name,
      browserVersion: browser.version,
      platform: navigator.platform || 'Unknown',
      isMobile,
      isTablet,
      connectionSpeed: getConnectionSpeed(),
      doNotTrack: navigator.doNotTrack === '1',
      cookiesEnabled: navigator.cookieEnabled,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
      language: navigator.language || 'Unknown',
    },
    consent: {
      timestamp: now,
      version: '2.0',
      categories: {
        essential: true,
        functional: true,
        analytics: true,
        marketing: true,
      },
    },
  };
};

// Save cookie data locally and to Supabase
export const saveCookieData = async (data: CookieData): Promise<void> => {
  try {
    // Save to localStorage
    localStorage.setItem(COOKIE_DATA_KEY, JSON.stringify(data));
    
    // Also set actual cookies for cross-tab sync
    const cookieOptions = 'path=/; max-age=31536000; SameSite=Lax';
    document.cookie = `chbk_visitor=${data.tracking.visitorId}; ${cookieOptions}`;
    document.cookie = `chbk_session=${data.auth.sessionId}; ${cookieOptions}`;
    document.cookie = `chbk_consent=accepted; ${cookieOptions}`;
    
    // Sync to Supabase
    await syncCookieDataToSupabase(data);
  } catch (e) {
    console.error('Failed to save cookie data:', e);
  }
};

// Sync cookie data to Supabase
export const syncCookieDataToSupabase = async (data: CookieData): Promise<void> => {
  try {
    const supabaseData = {
      visitor_id: data.tracking.visitorId,
      
      // Authentication & Security
      session_id: data.auth.sessionId,
      auth_token: data.auth.authToken,
      csrf_token: data.auth.csrfToken,
      login_status: data.auth.loginStatus,
      last_login: data.auth.lastLogin || null,
      
      // Commerce & State
      cart_id: data.commerce.cartId,
      wishlist_id: data.commerce.wishlistId,
      form_data: data.commerce.formData,
      last_activity: data.commerce.lastActivity,
      
      // User Preferences
      language: data.preferences.language,
      theme: data.preferences.theme,
      region: data.preferences.region,
      currency: data.preferences.currency,
      font_size: data.preferences.fontSize,
      accessibility_mode: data.preferences.accessibilityMode,
      
      // Tracking & Behavioral
      session_count: data.tracking.sessionCount,
      first_visit: data.tracking.firstVisit,
      last_visit: data.tracking.lastVisit,
      page_views: data.tracking.pageViews,
      clickstream: data.tracking.clickstream.slice(-50), // Keep last 50 for DB
      referral_source: data.tracking.referralSource,
      utm_params: data.tracking.utmParams,
      ad_segments: data.tracking.adSegments,
      interests: data.tracking.interests,
      
      // Device Metadata
      screen_resolution: data.device.screenResolution,
      color_depth: data.device.colorDepth,
      pixel_ratio: data.device.pixelRatio,
      browser_type: data.device.browserType,
      browser_version: data.device.browserVersion,
      platform: data.device.platform,
      is_mobile: data.device.isMobile,
      is_tablet: data.device.isTablet,
      connection_speed: data.device.connectionSpeed,
      do_not_track: data.device.doNotTrack,
      cookies_enabled: data.device.cookiesEnabled,
      timezone: data.device.timezone,
      device_language: data.device.language,
      
      // Consent Metadata
      consent_timestamp: data.consent.timestamp,
      consent_version: data.consent.version,
      consent_categories: data.consent.categories,
    };

    // Upsert - insert if new visitor, update if existing
    const { error } = await supabase
      .from('visitor_analytics')
      .upsert(supabaseData, { 
        onConflict: 'visitor_id',
        ignoreDuplicates: false 
      });

    if (error) {
      console.error('Error syncing to Supabase:', error);
    } else {
      console.log('✅ Cookie data synced to Supabase');
    }
  } catch (e) {
    console.error('Failed to sync cookie data to Supabase:', e);
  }
};

// Get cookie data
export const getCookieData = (): CookieData | null => {
  try {
    const data = localStorage.getItem(COOKIE_DATA_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

// Update specific cookie category
export const updateCookieField = <K extends keyof CookieData>(
  category: K,
  field: keyof CookieData[K],
  value: any
): void => {
  const data = getCookieData();
  if (data) {
    (data[category] as any)[field] = value;
    saveCookieData(data);
  }
};

// Track click event
export const trackClick = (action: string, element?: string): void => {
  const data = getCookieData();
  if (data && isCookieConsentGiven()) {
    data.tracking.clickstream.push({
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
      action: element ? `${action}:${element}` : action,
    });
    // Keep only last 100 events
    data.tracking.clickstream = data.tracking.clickstream.slice(-100);
    saveCookieData(data);
  }
};

// Add interest/ad segment
export const addInterest = (interest: string): void => {
  const data = getCookieData();
  if (data && !data.tracking.interests.includes(interest)) {
    data.tracking.interests.push(interest);
    saveCookieData(data);
  }
};

// Save form field
export const saveFormField = (fieldName: string, value: string): void => {
  const data = getCookieData();
  if (data) {
    data.commerce.formData.savedFields[fieldName] = value;
    data.commerce.lastActivity = new Date().toISOString();
    saveCookieData(data);
  }
};

// Clear all cookie data (for GDPR compliance)
export const clearAllCookieData = async (): Promise<void> => {
  // Get visitor ID before clearing for Supabase deletion
  const data = getCookieData();
  const visitorId = data?.tracking.visitorId;
  
  // Clear local storage
  localStorage.removeItem(COOKIE_DATA_KEY);
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  
  // Clear actual cookies
  document.cookie = 'chbk_visitor=; path=/; max-age=0';
  document.cookie = 'chbk_session=; path=/; max-age=0';
  document.cookie = 'chbk_consent=; path=/; max-age=0';
  
  // Delete from Supabase
  if (visitorId) {
    try {
      const { error } = await supabase
        .from('visitor_analytics')
        .delete()
        .eq('visitor_id', visitorId);
      
      if (error) {
        console.error('Error deleting from Supabase:', error);
      } else {
        console.log('✅ Cookie data deleted from Supabase (GDPR)');
      }
    } catch (e) {
      console.error('Failed to delete cookie data from Supabase:', e);
    }
  }
};

// Get all visitor analytics from Supabase (for admin panel)
export const getVisitorAnalytics = async (): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('visitor_analytics')
      .select('*')
      .order('last_visit', { ascending: false });
    
    if (error) {
      console.error('Error fetching visitor analytics:', error);
      return [];
    }
    
    return data || [];
  } catch (e) {
    console.error('Failed to fetch visitor analytics:', e);
    return [];
  }
};

// Get analytics summary (for admin dashboard)
export const getAnalyticsSummary = async (): Promise<{
  totalVisitors: number;
  totalPageViews: number;
  mobileUsers: number;
  desktopUsers: number;
  browsers: Record<string, number>;
  platforms: Record<string, number>;
  todayVisitors: number;
}> => {
  try {
    const { data, error } = await supabase
      .from('visitor_analytics')
      .select('*');
    
    if (error || !data) {
      return {
        totalVisitors: 0,
        totalPageViews: 0,
        mobileUsers: 0,
        desktopUsers: 0,
        browsers: {},
        platforms: {},
        todayVisitors: 0,
      };
    }
    
    const today = new Date().toISOString().split('T')[0];
    
    return {
      totalVisitors: data.length,
      totalPageViews: data.reduce((sum, v) => sum + (v.page_views || 0), 0),
      mobileUsers: data.filter(v => v.is_mobile).length,
      desktopUsers: data.filter(v => !v.is_mobile && !v.is_tablet).length,
      browsers: data.reduce((acc, v) => {
        const browser = v.browser_type || 'Unknown';
        acc[browser] = (acc[browser] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      platforms: data.reduce((acc, v) => {
        const platform = v.platform || 'Unknown';
        acc[platform] = (acc[platform] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      todayVisitors: data.filter(v => v.last_visit?.startsWith(today)).length,
    };
  } catch (e) {
    console.error('Failed to get analytics summary:', e);
    return {
      totalVisitors: 0,
      totalPageViews: 0,
      mobileUsers: 0,
      desktopUsers: 0,
      browsers: {},
      platforms: {},
      todayVisitors: 0,
    };
  }
};

export const CookieConsent: React.FC<CookieConsentProps> = ({ content, onAccept, onDecline }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Show banner immediately at the top
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Collect and save comprehensive cookie data
    const cookieData = collectCookieData();
    saveCookieData(cookieData);
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    // Only save essential consent info
    localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
    setIsVisible(false);
    onDecline();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-slate-800 text-slate-300 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Message */}
          <div className="flex items-start gap-3 flex-1">
            <Shield className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed">
              {content.message}{' '}
              <a 
                href="#" 
                className="text-brand-teal hover:text-brand-coral transition-colors inline-flex items-center gap-1"
                onClick={(e) => {
                  e.preventDefault();
                  // Could open privacy policy modal
                }}
              >
                {content.learnMore}
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleDecline}
              className="px-4 py-1.5 text-sm text-slate-400 hover:text-white transition-colors font-medium"
            >
              {content.declineButton}
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-1.5 bg-gradient-to-r from-brand-coral to-brand-orange hover:from-brand-orange hover:to-brand-coral text-white rounded-md font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {content.acceptButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper to check if cookies are accepted
export const isCookieConsentGiven = (): boolean => {
  return localStorage.getItem(COOKIE_CONSENT_KEY) === 'accepted';
};

// Initialize tracking on page load (call this in App.tsx after consent)
export const initializeTracking = (): void => {
  if (isCookieConsentGiven()) {
    const data = getCookieData();
    if (data) {
      // Update page view count and last visit
      data.tracking.pageViews++;
      data.tracking.lastVisit = new Date().toISOString();
      data.tracking.clickstream.push({
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
        action: 'pageview',
      });
      saveCookieData(data);
    }
  }
};
