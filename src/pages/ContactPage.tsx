import { useSearchParams } from 'react-router-dom';
import { MapPin, Phone, Clock, MessageSquare, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG, isPhoneContactEnabled } from '../config/siteConfig';
import { usePageSeo } from '../lib/seo';
import { trackPhoneCtaClick } from '../lib/analytics';
import { ContentSection } from '../components/ContentSection';
import { EnquiryForm } from '../components/EnquiryForm';
import { PageHeader } from '../components/PageHeader';
import { WhatsAppCta } from '../components/WhatsAppCta';

export function ContactPage() {
  usePageSeo({
    title: 'Contact Us',
    description:
      'Contact Forge Fitness via WhatsApp enquiry form, direct phone call, studio address, opening hours, and Google Maps directions.',
    path: '/contact',
  });

  const phoneEnabled = isPhoneContactEnabled();
  const [searchParams] = useSearchParams();
  const preselectedPlan = searchParams.get('plan') || '';

  return (
    <>
      <PageHeader
        kicker="Contact Us"
        title="Enquire, Call or Visit the Studio"
        description="Fill in the WhatsApp enquiry form below or call the front desk directly during operating hours."
        action={
          <WhatsAppCta
            source="contact_header"
            label="Direct WhatsApp Chat"
          />
        }
      />

      <ContentSection tone="surface" id="enquiry-form">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left: WhatsApp Enquiry Form */}
          <div className="lg:col-span-7">
            <EnquiryForm initialInterest={preselectedPlan} source="contact_page_form" />
          </div>

          {/* Right: Studio Business Details */}
          <div className="space-y-6 lg:col-span-5">
            <div className="border border-white/10 bg-[#090A0C] p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#F4F5F7]">
                  Studio Contact Details
                </h2>
                <p className="mt-1.5 text-xs text-[#717886]">
                  {SITE_CONFIG.contact.addressNote}
                </p>
              </div>

              <div className="space-y-5 border-t border-white/10 pt-5 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#C8F135]" aria-hidden="true" />
                  <div className="space-y-1">
                    <p className="font-semibold text-[#F4F5F7]">Address</p>
                    {SITE_CONFIG.contact.addressLines.map((line) => (
                      <p key={line} className="text-[#A1A7B3]">
                        {line}
                      </p>
                    ))}
                    <a
                      href={SITE_CONFIG.contact.mapsQueryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 pt-1 text-xs font-semibold text-[#C8F135] hover:underline"
                    >
                      <span>Get Directions on Google Maps</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#C8F135]" aria-hidden="true" />
                  <div className="space-y-1">
                    <p className="font-semibold text-[#F4F5F7]">Phone (Click-to-Call)</p>
                    <a
                      href={phoneEnabled ? SITE_CONFIG.contact.phoneHref : undefined}
                      aria-disabled={!phoneEnabled}
                      onClick={(event) => {
                        if (!phoneEnabled) { event.preventDefault(); return; }
                        trackPhoneCtaClick('contact_details');
                      }}
                      className="inline-block font-mono text-base font-medium text-[#F4F5F7] hover:text-[#C8F135] tabular-nums"
                    >
                      {phoneEnabled ? SITE_CONFIG.contact.phoneDisplay : 'Phone details pending client approval'}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <MessageSquare
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#C8F135]"
                    aria-hidden="true"
                  />
                  <div className="space-y-1">
                    <p className="font-semibold text-[#F4F5F7]">WhatsApp Desk</p>
                    <p className="font-mono text-sm text-[#A1A7B3] tabular-nums">
                      {SITE_CONFIG.contact.whatsappNumber ? `+${SITE_CONFIG.contact.whatsappNumber}` : 'WhatsApp details pending client approval'}
                    </p>
                    <div className="pt-1">
                      <WhatsAppCta
                        source="contact_details_card"
                        label="Open WhatsApp Chat"
                        variant="secondary"
                      />
                    </div>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#C8F135]" aria-hidden="true" />
                  <div className="space-y-1">
                    <p className="font-semibold text-[#F4F5F7]">Opening Hours</p>
                    <ul className="space-y-1 text-[#A1A7B3] tabular-nums">
                      {SITE_CONFIG.contact.openingHours.map((slot) => (
                        <li key={slot.days}>
                          <span className="text-[#F4F5F7]">{slot.days}:</span> {slot.hours}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="border-t border-white/10 pt-5">
                <p className="text-xs font-semibold tracking-wider text-[#F4F5F7] uppercase">
                  Social Channels
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {SITE_CONFIG.socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.isPlaceholder ? undefined : social.url}
                      aria-disabled={social.isPlaceholder}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[40px] items-center gap-1.5 border border-white/15 bg-[#121418] px-3.5 py-2 text-xs font-medium text-[#F4F5F7] hover:border-[#C8F135]/60 transition-colors"
                    >
                      <span>{social.platform}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#A1A7B3]" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Google Maps Location Section */}
      <ContentSection tone="obsidian" bordered={false}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium tracking-wider text-[#C8F135] uppercase">
                Location Map
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold text-[#F4F5F7] sm:text-3xl">
                Find Us on Google Maps
              </h2>
            </div>
            <a
              href={SITE_CONFIG.contact.mapsQueryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C8F135] hover:underline"
            >
              <span>Open Full Map</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="overflow-hidden border border-white/10 bg-[#121418]">
            <iframe
              title="Forge Fitness studio location on Google Maps"
              src={SITE_CONFIG.contact.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full border-0 grayscale contrast-125 sm:h-96"
            />
          </div>
        </div>
      </ContentSection>
    </>
  );
}
