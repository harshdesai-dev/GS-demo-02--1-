import { SITE_CONFIG } from '../config/siteConfig';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let isInitialized = false;
let consentGranted = false;

export function isGa4Configured(): boolean {
  const id = SITE_CONFIG.analytics.ga4MeasurementId.trim();
  return Boolean(id && id.startsWith('G-') && id !== SITE_CONFIG.analytics.placeholderId);
}

export function grantAnalyticsConsent(): void {
  consentGranted = true;
  initializeGa4();
}

export function revokeAnalyticsConsent(): void {
  consentGranted = false;
}

export function initializeGa4(): void {
  if (typeof window === 'undefined') return;
  if (!isGa4Configured()) return;
  if (SITE_CONFIG.analytics.requireConsentBanner && !consentGranted) return;
  if (isInitialized) return;

  const measurementId = SITE_CONFIG.analytics.ga4MeasurementId.trim();

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: false,
    anonymize_ip: true,
  });

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

/**
 * Sends sanitized non-PII events to GA4 when configured and consented.
 * Never pass customer names, phone numbers, emails, or free-text messages.
 */
function trackEvent(eventName: string, params: Record<string, string | number | boolean>): void {
  if (typeof window === 'undefined') return;
  if (!isGa4Configured()) return;
  if (SITE_CONFIG.analytics.requireConsentBanner && !consentGranted) return;
  if (!isInitialized) {
    initializeGa4();
  }
  window.gtag?.('event', eventName, params);
}

export function trackPageView(path: string, title: string): void {
  trackEvent('page_view', {
    page_path: path,
    page_title: title,
  });
}

export function trackWhatsAppCtaClick(source: string): void {
  trackEvent('whatsapp_cta_click', {
    cta_location: source,
  });
}

export function trackPhoneCtaClick(source: string): void {
  trackEvent('phone_cta_click', {
    cta_location: source,
  });
}

export function trackFormValidationError(fieldNames: string[]): void {
  trackEvent('form_validation_error', {
    invalid_fields: fieldNames.join(','),
    error_count: fieldNames.length,
  });
}

export function trackWhatsAppHandoffInitiated(interestCategory: string): void {
  // Tracks only the selected non-PII category; never describes handoff as a completed lead.
  trackEvent('whatsapp_handoff_initiated', {
    interest_category: interestCategory,
  });
}
