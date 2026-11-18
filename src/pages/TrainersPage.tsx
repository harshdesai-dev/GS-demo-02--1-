import { ArrowRight } from 'lucide-react';
import { TRAINERS } from '../data/gymContent';
import { usePageSeo } from '../lib/seo';
import { ActionLink } from '../components/ActionButton';
import { ContentSection } from '../components/ContentSection';
import { PageHeader } from '../components/PageHeader';
import { TrainerCard } from '../components/TrainerCard';
import { WhatsAppCta } from '../components/WhatsAppCta';

export function TrainersPage() {
  usePageSeo({
    title: 'Trainers',
    description:
      'Meet the Forge Fitness coaching team specializing in barbell strength, mobility, functional conditioning, and personal training.',
    path: '/trainers',
  });

  return (
    <>
      <PageHeader
        kicker="Coaching Team"
        title="Coaches on the Training Floor"
        description="Structured guidance for barbell mechanics, aerobic conditioning, and individual strength blocks. Enquire directly if you are looking for 1-on-1 coaching."
        action={
          <WhatsAppCta
            source="trainers_header"
            topic="Personal Training & Coaching"
            label="Enquire About Coaching"
          />
        }
      />

      <ContentSection tone="surface">
        <div className="mb-8 border border-white/10 bg-[#090A0C] p-4 text-xs leading-relaxed text-[#A1A7B3]">
          Illustrative Sample Profiles: Trainer portraits, names, and bios below demonstrate the
          Package 02 layout. Replace with client-approved coach photographs, names, and verified
          credentials before live deployment.
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TRAINERS.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      </ContentSection>

      <ContentSection tone="obsidian" bordered={false}>
        <div className="flex flex-col gap-6 border border-white/10 bg-[#121418] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-display text-2xl font-bold text-[#F4F5F7] sm:text-3xl">
              Looking for Personal Training or Onboarding?
            </h2>
            <p className="text-sm leading-relaxed text-[#A1A7B3]">
              Share your schedule and training goals on WhatsApp and our front desk will connect
              you with an available coach.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <ActionLink
              to={`/contact?plan=${encodeURIComponent('1-on-1 Personal Coaching (₹11,999)')}#enquiry-form`}
              variant="primary"
            >
              <span>Request Coaching Enquiry</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ActionLink>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
