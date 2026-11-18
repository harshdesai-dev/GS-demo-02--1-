import { Check, ArrowRight } from 'lucide-react';
import { FACILITIES_ITEMS } from '../data/gymContent';
import { usePageSeo } from '../lib/seo';
import { ActionLink } from '../components/ActionButton';
import { ContentSection } from '../components/ContentSection';
import { MediaFrame } from '../components/MediaFrame';
import { PageHeader } from '../components/PageHeader';
import { WhatsAppCta } from '../components/WhatsAppCta';

export function FacilitiesPage() {
  usePageSeo({
    title: 'Facilities & Services',
    description:
      'Explore Forge Fitness gym equipment, dedicated training zones, locker amenities, and personal or small-group coaching services.',
    path: '/facilities',
  });

  return (
    <>
      <PageHeader
        kicker="Facilities & Services"
        title="Equipment, Zones & Studio Amenities"
        description="Organized floor zones built for barbell strength, turf conditioning, and clean post-training recovery. Confirm exact equipment availability during your studio visit."
        action={
          <WhatsAppCta
            source="facilities_header"
            topic="a Facility Walkthrough"
            label="Book a Walkthrough"
          />
        }
      />

      {FACILITIES_ITEMS.map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <ContentSection
            key={item.id}
            id={item.id}
            tone={isEven ? 'surface' : 'obsidian'}
            bordered={index < FACILITIES_ITEMS.length - 1}
          >
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className={`lg:col-span-6 ${isEven ? '' : 'lg:order-2'}`}>
                <MediaFrame
                  src={item.image}
                  alt={item.imageAlt}
                  aspectClass="aspect-[4/3]"
                />
              </div>

              <div className={`space-y-5 lg:col-span-6 ${isEven ? '' : 'lg:order-1'}`}>
                <p className="text-xs font-medium tracking-wider text-[#C8F135] uppercase">
                  0{index + 1}. {item.category}
                </p>
                <h2 className="font-display text-3xl font-bold tracking-tight text-[#F4F5F7] sm:text-4xl">
                  {item.title}
                </h2>
                <p className="text-base leading-relaxed text-[#A1A7B3]">{item.summary}</p>

                <ul className="space-y-2.5 border-t border-white/10 pt-5">
                  {item.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-2.5 text-sm text-[#F4F5F7]">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#C8F135]"
                        aria-hidden="true"
                      />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3 pt-2">
                  <ActionLink
                    to={`/contact?plan=${encodeURIComponent('Book a Facility Visit / Trial')}#enquiry-form`}
                    variant="primary"
                  >
                    <span>Enquire About This Zone</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </ActionLink>
                </div>
              </div>
            </div>
          </ContentSection>
        );
      })}
    </>
  );
}
