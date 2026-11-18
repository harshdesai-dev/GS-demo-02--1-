import { Check, ArrowRight } from 'lucide-react';
import type { MembershipPlan } from '../data/gymContent';
import { ActionLink } from './ActionButton';

interface MembershipCardProps {
  plan: MembershipPlan;
}

export function MembershipCard({ plan }: MembershipCardProps) {
  const preselectValue = `${plan.name} (${plan.priceInr})`;
  const contactHref = `/contact?plan=${encodeURIComponent(preselectValue)}#enquiry-form`;

  return (
    <article
      className={`flex h-full flex-col justify-between border bg-[#121418] p-6 sm:p-7 ${
        plan.featured ? 'border-[#C8F135]/60' : 'border-white/10'
      }`}
    >
      <div>
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs font-medium tracking-wider text-[#A1A7B3] uppercase">
            {plan.duration}
          </p>
          {plan.featured ? (
            <span className="text-xs font-semibold tracking-wider text-[#C8F135] uppercase">
              Popular Tier
            </span>
          ) : null}
        </div>

        <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#F4F5F7] sm:text-3xl">
          {plan.name}
        </h3>

        <div className="mt-4 flex items-baseline gap-2 border-b border-white/10 pb-5">
          <span className="font-mono text-3xl font-semibold tracking-tight text-[#F4F5F7] tabular-nums sm:text-4xl">
            {plan.priceInr}
          </span>
          <span className="text-xs text-[#A1A7B3]">{plan.billingNote}</span>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-[#A1A7B3]">{plan.summary}</p>

        <ul className="mt-6 space-y-3">
          {plan.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2.5 text-sm text-[#F4F5F7]">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C8F135]" aria-hidden="true" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 space-y-4 border-t border-white/10 pt-5">
        <p className="text-xs leading-relaxed text-[#717886]">{plan.limitations}</p>
        <ActionLink
          to={contactHref}
          variant={plan.featured ? 'primary' : 'secondary'}
          className="w-full"
        >
          <span>Enquire About {plan.name}</span>
          <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </ActionLink>
      </div>
    </article>
  );
}
