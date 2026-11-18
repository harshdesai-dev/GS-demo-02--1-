import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG, isPhoneContactEnabled } from '../config/siteConfig';
import { WhatsAppCta } from './WhatsAppCta';
import { trackPhoneCtaClick } from '../lib/analytics';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const phoneEnabled = isPhoneContactEnabled();

  return (
    <footer className="border-t border-white/10 bg-[#090A0C] text-[#A1A7B3]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand summary */}
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-block font-display text-2xl font-extrabold tracking-tight text-[#F4F5F7]"
            >
              {SITE_CONFIG.brand.name}
            </Link>
            <p className="text-sm leading-relaxed text-[#A1A7B3]">
              {SITE_CONFIG.brand.positioning}. Focused floor space, maintained barbell equipment,
              and structured coaching.
            </p>
            <p className="text-xs leading-relaxed text-[#717886]">
              {SITE_CONFIG.brand.establishedNote}
            </p>
          </div>

          {/* 8-Page Navigation Mirror */}
          <div>
            <h2 className="text-xs font-semibold tracking-wider text-[#F4F5F7] uppercase">
              Pages
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {SITE_CONFIG.navigation.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="inline-block py-0.5 text-[#A1A7B3] transition-colors hover:text-[#C8F135]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold tracking-wider text-[#F4F5F7] uppercase">
              Studio &amp; Hours
            </h2>
            <div className="flex items-start gap-2.5 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C8F135]" aria-hidden="true" />
              <div className="space-y-0.5">
                {SITE_CONFIG.contact.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <a
                  href={SITE_CONFIG.contact.mapsQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 pt-1 text-xs font-medium text-[#C8F135] hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex items-start gap-2.5 text-sm">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#C8F135]" aria-hidden="true" />
              <ul className="space-y-1">
                {SITE_CONFIG.contact.openingHours.map((slot) => (
                  <li key={slot.days} className="tabular-nums">
                    <span className="text-[#F4F5F7]">{slot.days}:</span> {slot.hours}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Direct Contact & Social */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold tracking-wider text-[#F4F5F7] uppercase">
              Direct Enquiry
            </h2>
            <div className="flex flex-col gap-3">
              <WhatsAppCta source="footer" label="WhatsApp Desk" className="w-full sm:w-auto" />
              <a
                href={phoneEnabled ? SITE_CONFIG.contact.phoneHref : undefined}
                aria-disabled={!phoneEnabled}
                onClick={(event) => {
                  if (!phoneEnabled) { event.preventDefault(); return; }
                  trackPhoneCtaClick('footer');
                }}
                className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-[#F4F5F7] hover:text-[#C8F135] transition-colors"
              >
                <Phone className="h-4 w-4 text-[#C8F135]" aria-hidden="true" />
                <span className="tabular-nums">{phoneEnabled ? SITE_CONFIG.contact.phoneDisplay : 'Phone details pending'}</span>
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs">
              {SITE_CONFIG.socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.isPlaceholder ? undefined : social.url}
                  aria-disabled={social.isPlaceholder}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A1A7B3] hover:text-[#F4F5F7] transition-colors"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#717886] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {SITE_CONFIG.brand.name}. Built on GrowthSathi Package 02.
          </p>
          <p>Enquiries open via WhatsApp Click-to-Chat. No online billing or stored form data.</p>
        </div>
      </div>
    </footer>
  );
}
