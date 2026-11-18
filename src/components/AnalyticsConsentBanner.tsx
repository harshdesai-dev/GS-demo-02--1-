import { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import {
  getAnalyticsConsentDecision,
  grantAnalyticsConsent,
  isGa4Configured,
  revokeAnalyticsConsent,
  type AnalyticsConsentDecision,
} from '../lib/analytics';

export function AnalyticsConsentBanner() {
  const [decision, setDecision] = useState<AnalyticsConsentDecision>(() =>
    getAnalyticsConsentDecision()
  );
  const [isOpen, setIsOpen] = useState(() => getAnalyticsConsentDecision() === 'unset');

  if (!isGa4Configured() || !SITE_CONFIG.analytics.requireConsentBanner) return null;

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-30 border border-white/15 bg-[#121418]/95 px-3 py-2 text-xs text-[#A1A7B3] shadow-xl backdrop-blur-md hover:text-[#F4F5F7]"
        aria-label="Open analytics privacy preferences"
      >
        Privacy settings
      </button>
    );
  }

  return (
    <aside
      aria-label="Analytics consent"
      aria-live="polite"
      className="fixed right-4 bottom-4 left-4 z-30 mx-auto max-w-xl border border-white/15 bg-[#121418]/95 p-4 shadow-2xl backdrop-blur-md sm:left-auto"
    >
      <div className="flex flex-col gap-3">
        <p className="text-xs leading-relaxed text-[#A1A7B3]">
          We use Google Analytics to understand website usage. Analytics remains off unless you
          allow it. You can change this choice later in Privacy settings.
        </p>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              revokeAnalyticsConsent();
              setDecision('denied');
              setIsOpen(false);
            }}
            className="min-h-[36px] border border-white/15 px-3 py-1.5 text-xs font-medium text-[#A1A7B3] hover:text-[#F4F5F7]"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => {
              grantAnalyticsConsent();
              setDecision('granted');
              setIsOpen(false);
            }}
            className="min-h-[36px] bg-[#C8F135] px-3 py-1.5 text-xs font-semibold text-[#090A0C] hover:bg-[#D6F85D]"
          >
            Allow Analytics
          </button>
        </div>
        <span className="sr-only">Current analytics consent: {decision}</span>
      </div>
    </aside>
  );
}
