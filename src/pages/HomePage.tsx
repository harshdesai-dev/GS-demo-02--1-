import { ArrowRight, MapPin, Phone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG, isPhoneContactEnabled } from '../config/siteConfig';
import {
  ABOUT_CONTENT,
  CLASS_TIMETABLE,
  FACILITIES_ITEMS,
  GALLERY_PHOTOS,
  MEDIA_ASSETS,
  MEMBERSHIP_PLANS,
  TRAINERS,
} from '../data/gymContent';
import { usePageSeo } from '../lib/seo';
import { trackPhoneCtaClick } from '../lib/analytics';
import { ActionLink } from '../components/ActionButton';
import { ContentSection } from '../components/ContentSection';
import { MediaFrame } from '../components/MediaFrame';
import { MembershipCard } from '../components/MembershipCard';
import { TrainerCard } from '../components/TrainerCard';
import { WhatsAppCta } from '../components/WhatsAppCta';

export function HomePage() {
  const phoneEnabled = isPhoneContactEnabled();

  usePageSeo({
    title: 'Forge Fitness – Strength, Conditioning & Coached Training',
    description:
      'Independent strength and conditioning gym with calibrated free weights, sprint turf, coached group sessions, and direct WhatsApp membership enquiries.',
    path: '/',
  });

  const featuredSessions = CLASS_TIMETABLE.slice(0, 4);
  const previewGallery = GALLERY_PHOTOS.slice(0, 3);
  const teaserPlans = MEMBERSHIP_PLANS.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative border-b border-white/10 bg-[#090A0C]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="space-y-6 lg:col-span-6">
              <p className="text-xs font-medium tracking-wider text-[#C8F135] uppercase">
                {SITE_CONFIG.brand.name} · {SITE_CONFIG.brand.positioning}
              </p>

              <h1 className="font-display text-4xl font-extrabold tracking-tight text-[#F4F5F7] sm:text-5xl lg:text-6xl">
                {SITE_CONFIG.brand.heroHeadline}
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-[#A1A7B3] sm:text-lg">
                {SITE_CONFIG.brand.heroSubheadline}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <WhatsAppCta
                  source="home_hero"
                  label="Enquire on WhatsApp"
                  variant="primary"
                />
                <ActionLink to="/membership" variant="secondary">
                  <span>View Membership Plans</span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </ActionLink>
              </div>
            </div>

            <div className="lg:col-span-6">
              <MediaFrame
                src={MEDIA_ASSETS.heroGymFloor}
                alt="Forge Fitness main strength floor with competition squat racks and calibrated plates"
                aspectClass="aspect-[16/9]"
                priority
              />
            </div>
          </div>

          {/* Grounded Studio Facts Strip */}
          <div className="mt-12 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-white/10 bg-[#121418] p-4">
              <p className="text-xs text-[#A1A7B3]">Strength Stations</p>
              <p className="mt-1 font-display text-2xl font-bold text-[#F4F5F7] tabular-nums">
                6 Squat Bays
              </p>
            </div>
            <div className="border border-white/10 bg-[#121418] p-4">
              <p className="text-xs text-[#A1A7B3]">Conditioning Track</p>
              <p className="mt-1 font-display text-2xl font-bold text-[#F4F5F7] tabular-nums">
                20m Sprint Turf
              </p>
            </div>
            <div className="border border-white/10 bg-[#121418] p-4">
              <p className="text-xs text-[#A1A7B3]">Weekday Hours</p>
              <p className="mt-1 font-display text-2xl font-bold text-[#F4F5F7] tabular-nums">
                05:30 AM – 10:00 PM
              </p>
            </div>
            <div className="border border-white/10 bg-[#121418] p-4">
              <p className="text-xs text-[#A1A7B3]">Direct Support</p>
              <p className="mt-1 font-display text-2xl font-bold text-[#C8F135]">
                WhatsApp &amp; Front Desk
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction to the Gym */}
      <ContentSection tone="surface">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="space-y-5 lg:col-span-7">
            <p className="text-xs font-medium tracking-wider text-[#C8F135] uppercase">
              Training Environment
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#F4F5F7] sm:text-4xl">
              {ABOUT_CONTENT.headline}
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-[#A1A7B3]">
              {ABOUT_CONTENT.storyParagraphs[0]}
            </p>
            <ul className="space-y-2.5 pt-1 text-sm text-[#F4F5F7]">
              {ABOUT_CONTENT.philosophyPoints.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#C8F135]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#C8F135] hover:underline"
              >
                <span>Read Our Story &amp; Philosophy</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <MediaFrame
              src={MEDIA_ASSETS.conditioningTurf}
              alt="Indoor black sprint turf lane with push sled and kettlebells"
              aspectClass="aspect-[4/3]"
            />
          </div>
        </div>
      </ContentSection>

      {/* Facilities & Services Highlights */}
      <ContentSection tone="obsidian">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium tracking-wider text-[#C8F135] uppercase">
              Facilities &amp; Services
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#F4F5F7] sm:text-4xl">
              Four Purpose-Built Training Areas
            </h2>
          </div>
          <Link
            to="/facilities"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#C8F135] hover:underline whitespace-nowrap"
          >
            <span>Explore All Facilities</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {FACILITIES_ITEMS.map((item) => (
            <article
              key={item.id}
              className="flex flex-col border border-white/10 bg-[#121418]"
            >
              <MediaFrame
                src={item.image}
                alt={item.imageAlt}
                aspectClass="aspect-[4/3]"
                className="border-0 border-b border-white/10"
              />
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <p className="text-xs font-medium text-[#C8F135]">{item.category}</p>
                  <h3 className="mt-1.5 font-display text-2xl font-bold text-[#F4F5F7]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#A1A7B3]">
                    {item.summary}
                  </p>
                </div>
                <p className="mt-5 border-t border-white/10 pt-4 text-xs text-[#A1A7B3]">
                  {item.specs.join(' · ')}
                </p>
              </div>
            </article>
          ))}
        </div>
      </ContentSection>

      {/* Membership Teaser */}
      <ContentSection tone="surface">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium tracking-wider text-[#C8F135] uppercase">
              Membership &amp; Pricing
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#F4F5F7] sm:text-4xl">
              Clear Plans With Direct Desk Support
            </h2>
            <p className="max-w-2xl text-sm text-[#A1A7B3]">
              Illustrative sample tiers shown below. Final fees and membership terms are confirmed
              directly via WhatsApp or at studio reception.
            </p>
          </div>
          <Link
            to="/membership"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#C8F135] hover:underline whitespace-nowrap"
          >
            <span>Compare All Plans</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {teaserPlans.map((plan) => (
            <MembershipCard key={plan.id} plan={plan} />
          ))}
        </div>
      </ContentSection>

      {/* Trainer Highlights */}
      <ContentSection tone="obsidian">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium tracking-wider text-[#C8F135] uppercase">
              Coaching Team
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#F4F5F7] sm:text-4xl">
              Coaches on the Floor
            </h2>
          </div>
          <Link
            to="/trainers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#C8F135] hover:underline whitespace-nowrap"
          >
            <span>Meet All Trainers</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TRAINERS.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      </ContentSection>

      {/* Class Timetable Highlights */}
      <ContentSection tone="surface">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium tracking-wider text-[#C8F135] uppercase">
              Weekly Timetable
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#F4F5F7] sm:text-4xl">
              Structured Group Sessions
            </h2>
          </div>
          <Link
            to="/timetable"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#C8F135] hover:underline whitespace-nowrap"
          >
            <span>Full Weekly Timetable</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 divide-y divide-white/10 border border-white/10 bg-[#090A0C]">
          {featuredSessions.map((session) => (
            <div
              key={session.id}
              className="grid gap-2 px-5 py-4 sm:grid-cols-12 sm:items-center sm:gap-4"
            >
              <div className="text-sm font-semibold text-[#F4F5F7] sm:col-span-2">
                {session.day}
              </div>
              <div className="font-mono text-sm text-[#C8F135] tabular-nums sm:col-span-3">
                {session.time}
              </div>
              <div className="sm:col-span-4">
                <p className="text-sm font-medium text-[#F4F5F7]">{session.className}</p>
                <p className="text-xs text-[#A1A7B3]">
                  {session.category} · {session.duration}
                </p>
              </div>
              <div className="text-xs text-[#A1A7B3] sm:col-span-3 sm:text-right">
                {session.trainer}
              </div>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* Gallery Preview */}
      <ContentSection tone="obsidian">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium tracking-wider text-[#C8F135] uppercase">
              Studio Gallery
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#F4F5F7] sm:text-4xl">
              Inside the Training Floor
            </h2>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#C8F135] hover:underline whitespace-nowrap"
          >
            <span>Open Full Gallery</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {previewGallery.map((photo) => (
            <Link
              key={photo.id}
              to="/gallery"
              className="group block border border-white/10 bg-[#121418]"
            >
              <MediaFrame
                src={photo.image}
                alt={photo.alt}
                aspectClass="aspect-[4/3]"
                className="border-0"
                imgClassName="transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="border-t border-white/10 p-4">
                <p className="text-xs text-[#C8F135]">{photo.category}</p>
                <p className="mt-1 font-display text-lg font-bold text-[#F4F5F7]">
                  {photo.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </ContentSection>

      {/* Location & Repeated Enquiry CTA */}
      <ContentSection tone="surface" bordered={false}>
        <div className="grid gap-8 border border-white/10 bg-[#090A0C] p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
          <div className="space-y-5 lg:col-span-7">
            <p className="text-xs font-medium tracking-wider text-[#C8F135] uppercase">
              Visit or Enquire
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#F4F5F7] sm:text-4xl">
              Schedule a Studio Walkthrough or Ask About Memberships
            </h2>
            <div className="grid gap-4 pt-2 sm:grid-cols-2">
              <div className="flex items-start gap-2.5 text-sm text-[#A1A7B3]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C8F135]" aria-hidden="true" />
                <div>
                  {SITE_CONFIG.contact.addressLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-[#A1A7B3]">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#C8F135]" aria-hidden="true" />
                <div>
                  {SITE_CONFIG.contact.openingHours.map((slot) => (
                    <p key={slot.days} className="tabular-nums">
                      {slot.days}: {slot.hours}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-5 lg:items-end">
            <ActionLink to="/contact#enquiry-form" variant="primary" className="w-full lg:w-auto">
              <span>Open Enquiry Form</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ActionLink>
            <div className="flex flex-col gap-3 w-full sm:flex-row lg:justify-end">
              <WhatsAppCta
                source="home_bottom_cta"
                label="Quick WhatsApp Chat"
                variant="secondary"
                className="w-full sm:w-auto"
              />
              <a
                href={phoneEnabled ? SITE_CONFIG.contact.phoneHref : undefined}
                aria-disabled={!phoneEnabled}
                onClick={(event) => {
                  if (!phoneEnabled) { event.preventDefault(); return; }
                  trackPhoneCtaClick('home_bottom_cta');
                }}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-white/20 px-4 py-2.5 text-sm font-medium text-[#F4F5F7] hover:bg-white/5 transition-colors whitespace-nowrap"
              >
                <Phone className="h-4 w-4 text-[#C8F135]" aria-hidden="true" />
                <span className="tabular-nums">{phoneEnabled ? SITE_CONFIG.contact.phoneDisplay : 'Phone details pending'}</span>
              </a>
            </div>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
