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