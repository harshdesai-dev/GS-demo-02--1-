import { SITE_CONFIG } from '../config/siteConfig';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsConsentDecision = 'unset' | 'granted' | 'denied';
const CONSENT_STORAGE_KEY = 'forge_fitness_analytics_consent';
let isInitialized = false;

export function getAnalyticsConsentDecision(): AnalyticsConsentDecision {
  if (typeof window === 'undefined') return 'unset';
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : 'unset';
  } catch {
    return 'unset';
  }
}

let consentGranted = getAnalyticsConsentDecision() === 'granted';

export function isGa4Configured(): boolean {
  const id = SITE_CONFIG.analytics.ga4MeasurementId.trim();
  return /^G-[A-Z0-9]+$/.test(id) && id !== SITE_CONFIG.analytics.placeholderId;
}

function ensureGtag(): void {
  if (typeof window === 'undefined' || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
}

function updateGoogleConsent(granted: boolean): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}

export function setAnalyticsConsent(decision: Exclude<AnalyticsConsentDecision, 'unset'>): void {
  consentGranted = decision === 'granted';
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, decision);
    } catch {
      // Consent still applies for this page session when storage is unavailable.
    }
  }
  if (decision === 'granted') initializeGa4();
  else updateGoogleConsent(false);
}

export function grantAnalyticsConsent(): void {
  setAnalyticsConsent('granted');
}

export function revokeAnalyticsConsent(): void {
  setAnalyticsConsent('denied');
}

export function initializeGa4(): void {
  if (typeof window === 'undefined' || !isGa4Configured()) return;
  if (SITE_CONFIG.analytics.requireConsentBanner && !consentGranted) return;
  if (isInitialized) {
    updateGoogleConsent(true);
    return;
  }

  const measurementId = SITE_CONFIG.analytics.ga4MeasurementId.trim();
  ensureGtag();
  window.gtag?.('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  updateGoogleConsent(true);
  window.gtag?.('js', new Date());
  window.gtag?.('config', measurementId, { send_page_view: false, anonymize_ip: true });

  const existingScript = document.querySelector(`script[data-ga4-id="${measurementId}"]`);
  if (!existingScript) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.setAttribute('data-ga4-id', measurementId);
    document.head.appendChild(script);
  }
  isInitialized = true;
}

function trackEvent(eventName: string, params: Record<string, string | number | boolean>): void {
  if (typeof window === 'undefined' || !isGa4Configured()) return;
  if (SITE_CONFIG.analytics.requireConsentBanner && !consentGranted) return;
  if (!isInitialized) initializeGa4();
  window.gtag?.('event', eventName, params);
}

export function trackPageView(path: string, title: string): void {
  trackEvent('page_view', { page_path: path, page_title: title });
}
export function trackWhatsAppCtaClick(source: string): void {
  trackEvent('whatsapp_cta_click', { cta_location: source });
}
export function trackPhoneCtaClick(source: string): void {
  trackEvent('phone_cta_click', { cta_location: source });
}
export function trackFormValidationError(fieldNames: string[]): void {
  trackEvent('form_validation_error', { invalid_fields: fieldNames.join(','), error_count: fieldNames.length });
}
export function trackWhatsAppHandoffInitiated(interestCategory: string): void {
  // Tracks only the selected non-PII category, never customer-entered form values.
  trackEvent('whatsapp_handoff_initiated', { interest_category: interestCategory });
}
