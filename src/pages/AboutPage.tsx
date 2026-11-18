import { ArrowRight } from 'lucide-react';
import { ABOUT_CONTENT, MEDIA_ASSETS } from '../data/gymContent';
import { usePageSeo } from '../lib/seo';
import { ActionLink } from '../components/ActionButton';
import { ContentSection } from '../components/ContentSection';
import { MediaFrame } from '../components/MediaFrame';
import { PageHeader } from '../components/PageHeader';
import { WhatsAppCta } from '../components/WhatsAppCta';

export function AboutPage() {
  usePageSeo({
    title: 'About Us',
    description:
      'Learn about Forge Fitness, our training philosophy, core values, facility standards, and studio coaching leadership.',
    path: '/about',
  });

  return (
    <>
      <PageHeader
        kicker={ABOUT_CONTENT.eyebrow}
        title={ABOUT_CONTENT.headline}
        description="Built around uncrowded strength stations, maintained conditioning hardware, and attentive coaching for every experience level."
        action={<WhatsAppCta source="about_header" label="Plan a Studio Visit" />}
      />

      {/* Story & Supporting Photo */}
      <ContentSection tone="surface">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
          <div className="flex flex-col justify-center space-y-5 lg:col-span-6">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#F4F5F7] sm:text-4xl">
              Our Story &amp; Studio Purpose
            </h2>
            {ABOUT_CONTENT.storyParagraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`text-base leading-relaxed ${
                  index === 1
                    ? 'border border-white/10 bg-[#090A0C] p-4 text-xs text-[#A1A7B3]'
                    : 'text-[#A1A7B3]'
                }`}
              >
                {paragraph}
              </p>
            ))}

            <div className="border-t border-white/10 pt-5">
              <p className="text-xs font-semibold tracking-wider text-[#C8F135] uppercase">
                Mission Statement
              </p>
              <p className="mt-2 text-base leading-relaxed text-[#F4F5F7]">
                {ABOUT_CONTENT.mission}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <MediaFrame
              src={MEDIA_ASSETS.heroGymFloor}
              alt="Main training floor at Forge Fitness with competition racks and lifting platforms"
              aspectClass="aspect-[16/10] lg:h-full"
            />
          </div>
        </div>
      </ContentSection>

      {/* Core Values */}
      <ContentSection tone="obsidian">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-medium tracking-wider text-[#C8F135] uppercase">
            Operating Principles
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#F4F5F7] sm:text-4xl">
            How We Run the Floor
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {ABOUT_CONTENT.values.map((value) => (
            <article
              key={value.title}
              className="border border-white/10 bg-[#121418] p-6 sm:p-7"
            >
              <h3 className="font-display text-2xl font-bold text-[#F4F5F7]">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#A1A7B3]">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </ContentSection>

      {/* Training Philosophy & Founder Note */}
      <ContentSection tone="surface">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-5">
            <MediaFrame
              src={ABOUT_CONTENT.founderIntro.image}
              alt={ABOUT_CONTENT.founderIntro.imageAlt}
              aspectClass="aspect-[3/4] lg:h-full"
              imgClassName="object-top"
            />
          </div>

          <div className="flex flex-col justify-between space-y-6 lg:col-span-7">
            <div className="space-y-4">
              <p className="text-xs font-medium tracking-wider text-[#C8F135] uppercase">
                Leadership &amp; Coaching Philosophy
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-[#F4F5F7] sm:text-4xl">
                {ABOUT_CONTENT.founderIntro.name}
              </h2>
              <p className="text-sm font-medium text-[#A1A7B3]">
                {ABOUT_CONTENT.founderIntro.role}
              </p>
              <p className="text-base leading-relaxed text-[#A1A7B3]">
                {ABOUT_CONTENT.founderIntro.bio}
              </p>
              <p className="border border-white/10 bg-[#090A0C] p-3.5 text-xs text-[#717886]">
                {ABOUT_CONTENT.founderIntro.note}
              </p>
            </div>

            <div className="space-y-3 border-t border-white/10 pt-6">
              <h3 className="text-sm font-semibold text-[#F4F5F7]">Training Philosophy</h3>
              <ul className="space-y-2 text-sm text-[#A1A7B3]">
                {ABOUT_CONTENT.philosophyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#C8F135]"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <ActionLink to="/contact#enquiry-form" variant="primary">
                <span>Book a Studio Visit</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ActionLink>
              <ActionLink to="/facilities" variant="secondary">
                <span>Inspect Our Facilities</span>
              </ActionLink>
            </div>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
