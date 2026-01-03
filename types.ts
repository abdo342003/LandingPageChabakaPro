export type Language = 'ar' | 'fr';

export interface Content {
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
    detail: string;
  };
  body: {
    description: string;
    offer1: {
      name: string;
      price: string;
      features: string[];
      button: string;
    };
    offer2: {
      name: string;
      price: string;
      features: string[];
      button: string;
    };
    offer3: {
      name: string;
      price: string;
      features: string[];
      button: string;
      badge?: string;
    };
    offer4: {
      name: string;
      price: string;
      features: string[];
      button: string;
      badge?: string;
    };
  };
  stats: {
    title: string;
    items: Array<{
      value: string;
      label: string;
    }>;
  };
  testimonials: {
    title: string;
    items: Array<{
      name: string;
      business: string;
      text: string;
      rating: number;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    businessPlaceholder: string;
    messagePlaceholder: string;
    submitButton: string;
    successMessage: string;
  };
  footer: {
    trustMessage: string;
    contactText: string;
    locations: string;
    badges: string[];
  };
}

export interface UserSubmission {
  id: string;
  name: string;
  phone: string;
  business: string;
  message: string;
  timestamp: Date;
  status: 'new' | 'contacted' | 'completed';
  // Device & Browser info (collected with user awareness on form submit)
  deviceInfo?: {
    browser: string;
    browserVersion: string;
    os: string;
    device: string;
    screenSize: string;
    language: string;
    timezone: string;
    referrer: string;
    pageUrl: string;
  };
}

export interface CookieConsentContent {
  message: string;
  acceptButton: string;
  declineButton: string;
  learnMore: string;
}

export interface UrgencyBannerContent {
  limitedOffer: string;
  discount: string;
  endsIn: string;
  spotsLeft: string;
  spots: string;
}

export interface WhatsAppWidgetContent {
  companyName: string;
  onlineNow: string;
  greeting: string;
  startChat: string;
  responseTime: string;
}

export interface ExitIntentContent {
  wait: string;
  extraDiscount: string;
  bookToday: string;
  benefits: {
    discount: string;
    consultation: string;
    guarantee: string;
  };
  callNow: string;
  orLeaveInfo: string;
  offerExpires: string;
}

export interface ROICalculatorContent {
  badge: string;
  title: string;
  subtitle: string;
  businessInfo: string;
  businessType: string;
  businessTypes: {
    cafe: string;
    restaurant: string;
    retail: string;
  };
  monthlyRevenue: string;
  securityIssues: string;
  problems: string;
  yearlyReturn: string;
  savingsAndProfit: string;
  monthlyBreakdown: string;
  preventedLoss: string;
  productivityGain: string;
  customerRetention: string;
  serviceCost: string;
  netMonthlyProfit: string;
  roi: string;
  roiDescription: string;
  realNumbers: string;
  joinSmart: string;
  startSaving: string;
}

export interface BeforeAfterContent {
  title: string;
  subtitle: string;
  before: string;
  after: string;
  beforeTitle: string;
  afterTitle: string;
  problems: {
    wifi: { title: string; description: string };
    cameras: { title: string; description: string };
    technical: { title: string; description: string };
    support: { title: string; description: string };
  };
  solutions: {
    wifi: { title: string; description: string };
    cameras: { title: string; description: string };
    maintenance: { title: string; description: string };
    support: { title: string; description: string };
  };
  beforeSummary: string;
  afterSummary: string;
  readyToTransform: string;
  startNow: string;
  benefits: string;
}

// Supabase Database Types
export interface Database {
  public: {
    Tables: {
      submissions: {
        Row: {
          id: string;
          name: string;
          phone: string;
          business: string;
          message: string;
          timestamp: string;
          status: 'new' | 'contacted' | 'completed';
          device_info: {
            browser: string;
            browserVersion: string;
            os: string;
            device: string;
            screenSize: string;
            language: string;
            timezone: string;
            referrer: string;
            pageUrl: string;
          } | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          business: string;
          message: string;
          timestamp?: string;
          status?: 'new' | 'contacted' | 'completed';
          device_info?: {
            browser: string;
            browserVersion: string;
            os: string;
            device: string;
            screenSize: string;
            language: string;
            timezone: string;
            referrer: string;
            pageUrl: string;
          } | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          business?: string;
          message?: string;
          timestamp?: string;
          status?: 'new' | 'contacted' | 'completed';
          device_info?: {
            browser: string;
            browserVersion: string;
            os: string;
            device: string;
            screenSize: string;
            language: string;
            timezone: string;
            referrer: string;
            pageUrl: string;
          } | null;
          created_at?: string;
        };
      };
    };
  };
}

export interface AdminContent {
  title: string;
  totalSubmissions: string;
  newSubmissions: string;
  contactedSubmissions: string;
  completedSubmissions: string;
  tableHeaders: {
    name: string;
    phone: string;
    business: string;
    message: string;
    date: string;
    status: string;
    actions: string;
  };
  statusLabels: {
    new: string;
    contacted: string;
    completed: string;
  };
  noData: string;
  exportButton: string;
  deleteButton: string;
  closeButton: string;
  analyticsTitle: string;
  deviceStats: string;
  browserStats: string;
  viewDetails: string;
}