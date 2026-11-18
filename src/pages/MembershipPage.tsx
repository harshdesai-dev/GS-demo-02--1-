import { MEMBERSHIP_PLANS, PLAN_COMPARISON } from '../data/gymContent';
import { usePageSeo } from '../lib/seo';
import { ContentSection } from '../components/ContentSection';
import { MembershipCard } from '../components/MembershipCard';
import { PageHeader } from '../components/PageHeader';
import { WhatsAppCta } from '../components/WhatsAppCta';

export function MembershipPage() {
  usePageSeo({
    title: 'Membership & Pricing',
    description:
      'View Forge Fitness membership plans, durations, included benefits, plan comparison, and terms. Enquire directly on WhatsApp with zero online checkout fees.',
    path: '/membership',
  });

  return (
    <>
      <PageHeader
        kicker="Membership & Pricing"
        title="Transparent Training Tiers"
        description="Choose a membership structure that matches how often you train. Selecting any plan pre-fills your WhatsApp enquiry so our desk can confirm availability and onboarding."
        action={
          <WhatsAppCta
            source="membership_header"
            topic="Membership Pricing"
            label="Ask About Plans"
          />
        }
      />

      {/* Membership Cards */}
      <ContentSection tone="surface">
        <div className="mb-8 border border-white/10 bg-[#090A0C] p-4 text-xs leading-relaxed text-[#A1A7B3]">
          Note on Pricing: The INR figures displayed below are illustrative sample tiers for Package
          02 review. Confirm final approved membership fees, applicable GST, and joining terms with
          studio management prior to launch. No online payment or recurring billing is processed on
          this site.
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {MEMBERSHIP_PLANS.map((plan) => (
            <MembershipCard key={plan.id} plan={plan} />
          ))}
        </div>
      </ContentSection>

      {/* Plan Comparison */}
      <ContentSection tone="obsidian" bordered={false}>
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-medium tracking-wider text-[#C8F135] uppercase">
            Side-by-Side Comparison
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#F4F5F7] sm:text-4xl">
            Compare Membership Privileges
          </h2>
        </div>

        <div className="mt-8 overflow-x-auto border border-white/10 bg-[#121418]">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-[#181B20]">
                <th scope="col" className="px-5 py-4 font-semibold text-[#F4F5F7]">
                  Included Feature
                </th>
                <th scope="col" className="px-5 py-4 font-semibold text-[#F4F5F7]">
                  Foundation Monthly
                </th>
                <th scope="col" className="px-5 py-4 font-semibold text-[#C8F135]">
                  Quarterly Strength
                </th>
                <th scope="col" className="px-5 py-4 font-semibold text-[#F4F5F7]">
                  Annual Performance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {PLAN_COMPARISON.map((row) => (
                <tr key={row.feature}>
                  <th
                    scope="row"
                    className="px-5 py-4 font-medium text-[#F4F5F7]"
                  >
                    {row.feature}
                  </th>
                  <td className="px-5 py-4 text-[#A1A7B3] tabular-nums">{row.foundation}</td>
                  <td className="px-5 py-4 text-[#F4F5F7] tabular-nums">{row.quarterly}</td>
                  <td className="px-5 py-4 text-[#A1A7B3] tabular-nums">{row.annual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Terms & Limitations */}
        <div className="mt-10 border border-white/10 bg-[#121418] p-6 sm:p-8">
          <h3 className="font-display text-2xl font-bold text-[#F4F5F7]">
            Membership Terms &amp; General Notes
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#A1A7B3]">
            <li>
              · All memberships are registered individually and cannot be shared or transferred
              between members.
            </li>
            <li>
              · New members complete a brief floor orientation and health-readiness check at the
              studio before heavy barbell work.
            </li>
            <li>
              · Membership freeze allowances require prior notice to the front desk via WhatsApp.
            </li>
            <li>
              · Final invoices and registrations are completed in person at the gym reception.
            </li>
          </ul>
        </div>
      </ContentSection>
    </>
  );
}
