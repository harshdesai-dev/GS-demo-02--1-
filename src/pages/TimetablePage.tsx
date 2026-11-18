import { ArrowRight } from 'lucide-react';
import { CLASS_TIMETABLE } from '../data/gymContent';
import { usePageSeo } from '../lib/seo';
import { ActionLink } from '../components/ActionButton';
import { ContentSection } from '../components/ContentSection';
import { PageHeader } from '../components/PageHeader';
import { TimetableSection } from '../components/TimetableSection';
import { WhatsAppCta } from '../components/WhatsAppCta';

export function TimetablePage() {
  usePageSeo({
    title: 'Class Timetable',
    description:
      'Weekly group class timetable at Forge Fitness featuring barbell strength, functional conditioning, and mobility sessions.',
    path: '/timetable',
  });

  return (
    <>
      <PageHeader
        kicker="Class Timetable"
        title="Weekly Group Training Schedule"
        description="A static weekly schedule of coached strength, conditioning, and mobility sessions. Check timings below and message us on WhatsApp to visit a session."
        action={
          <WhatsAppCta
            source="timetable_header"
            topic="Group Conditioning Timetable"
            label="Enquire About Classes"
          />
        }
      />

      <ContentSection tone="surface">
        <div className="mb-8 border border-white/10 bg-[#090A0C] p-4 text-xs leading-relaxed text-[#A1A7B3]">
          Static Weekly Reference: Timings and assigned coaches shown below represent the standard
          weekly routine (sample schedule pending final client confirmation). Floor availability
          and class participation are coordinated directly via WhatsApp or at reception.
        </div>

        <TimetableSection sessions={CLASS_TIMETABLE} />
      </ContentSection>

      <ContentSection tone="obsidian" bordered={false}>
        <div className="flex flex-col gap-6 border border-white/10 bg-[#121418] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-display text-2xl font-bold text-[#F4F5F7] sm:text-3xl">
              Interested in Joining a Scheduled Session?
            </h2>
            <p className="text-sm leading-relaxed text-[#A1A7B3]">
              Send us an enquiry with your preferred morning or evening timing and we will confirm
              group class options with you directly.
            </p>
          </div>
          <ActionLink
            to={`/contact?plan=${encodeURIComponent('Group Conditioning Timetable')}#enquiry-form`}
            variant="primary"
          >
            <span>Enquire About Timetable</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ActionLink>
        </div>
      </ContentSection>
    </>
  );
}
