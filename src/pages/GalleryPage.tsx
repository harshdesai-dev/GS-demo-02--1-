import { ArrowRight } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/gymContent';
import { usePageSeo } from '../lib/seo';
import { ActionLink } from '../components/ActionButton';
import { ContentSection } from '../components/ContentSection';
import { GalleryGrid } from '../components/GalleryGrid';
import { PageHeader } from '../components/PageHeader';
import { WhatsAppCta } from '../components/WhatsAppCta';

export function GalleryPage() {
  usePageSeo({
    title: 'Gallery',
    description:
      'View photos of Forge Fitness training zones, free weights, conditioning turf, locker amenities, and small-group coaching sessions.',
    path: '/gallery',
  });

  return (
    <>
      <PageHeader
        kicker="Studio Gallery"
        title="Floor, Equipment & Coaching Moments"
        description="Browse our strength bays, sprint turf track, changing suites, and small-group sessions. Select any image to inspect a larger view."
        action={
          <WhatsAppCta
            source="gallery_header"
            topic="a Studio Tour"
            label="Schedule a Walkthrough"
          />
        }
      />

      <ContentSection tone="surface">
        <GalleryGrid photos={GALLERY_PHOTOS} />
      </ContentSection>

      <ContentSection tone="obsidian" bordered={false}>
        <div className="flex flex-col gap-6 border border-white/10 bg-[#121418] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-display text-2xl font-bold text-[#F4F5F7] sm:text-3xl">
              Want to See the Studio in Person?
            </h2>
            <p className="text-sm leading-relaxed text-[#A1A7B3]">
              Book a quick walkthrough with our desk team to test the floor layout and discuss
              membership options.
            </p>
          </div>
          <ActionLink
            to={`/contact?plan=${encodeURIComponent('Book a Facility Visit / Trial')}#enquiry-form`}
            variant="primary"
          >
            <span>Book a Facility Visit</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ActionLink>
        </div>
      </ContentSection>
    </>
  );
}
