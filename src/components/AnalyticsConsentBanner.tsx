import { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import {
  grantAnalyticsConsent,
  hasAnalyticsConsentDecision,
  isGa4Configured,
  revokeAnalyticsConsent,
} from '../lib/analytics';

export function AnalyticsConsentBanner() {
  const [isOpen, setIsOpen] = useState(() => !hasAnalyticsConsentDecision());

  if (!isGa4Configured() || !SITE_CONFIG.analytics.requireConsentBanner) {
    return null;
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-4 z-30 border border-white/20 bg-[#121418]/95 px-3 py-2 text-xs font-medium text-[#A1A7B3] shadow-xl backdrop-blur-md transition-colors hover:border-[#C8F135]/60 hover:text-[#F4F5F7]"
        aria-label="Open analytics privacy settings"
      >
        Privacy settings
      </button>
    );
  }

  return (
    <aside
      aria-label="Analytics privacy settings"
      aria-live="polite"
      className="fixed right-4 bottom-4 left-4 z-30 mx-auto max-w-xl border border-white/15 bg-[#121418]/95 p-4 shadow-2xl backdrop-blur-md sm:left-auto"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-[#A1A7B3]">
          We use Google Analytics to understand website usage. Analytics stays disabled unless
          you allow it. Enquiry names, phone numbers, and message content are never sent to GA4.
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => {
              revokeAnalyticsConsent();
              setIsOpen(false);
            }}
            className="min-h-[36px] border border-white/15 px-3 py-1.5 text-xs font-medium text-[#A1A7B3] transition-colors hover:text-[#F4F5F7]"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => {
              grantAnalyticsConsent();
              setIsOpen(false);
            }}
            className="min-h-[36px] bg-[#C8F135] px-3 py-1.5 text-xs font-semibold text-[#090A0C] transition-colors hover:bg-[#D6F85D]"
          >
            Allow Analytics
          </button>
        </div>
      </div>
    </aside>
  );
}
