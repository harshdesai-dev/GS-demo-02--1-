import { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import {
  grantAnalyticsConsent,
  isGa4Configured,
  revokeAnalyticsConsent,
} from '../lib/analytics';

export function AnalyticsConsentBanner() {
  const [decisionMade, setDecisionMade] = useState(false);

  if (!isGa4Configured() || !SITE_CONFIG.analytics.requireConsentBanner || decisionMade) {
    return null;
  }

  return (
    <aside
      aria-label="Analytics consent"
      className="fixed right-4 bottom-4 left-4 z-30 mx-auto max-w-xl border border-white/15 bg-[#121418]/95 p-4 shadow-2xl backdrop-blur-md sm:left-auto"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-[#A1A7B3]">
          We use privacy-safe Google Analytics to understand page visits without collecting
          personal enquiry details.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              revokeAnalyticsConsent();
              setDecisionMade(true);
            }}
            className="min-h-[36px] border border-white/15 px-3 py-1.5 text-xs font-medium text-[#A1A7B3] hover:text-[#F4F5F7] cursor-pointer"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => {
              grantAnalyticsConsent();
              setDecisionMade(true);
            }}
            className="min-h-[36px] bg-[#C8F135] px-3 py-1.5 text-xs font-semibold text-[#090A0C] hover:bg-[#D6F85D] cursor-pointer"
          >
            Allow Analytics
          </button>
        </div>
      </div>
    </aside>
  );
}
