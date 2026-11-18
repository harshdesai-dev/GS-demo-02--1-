import { MessageSquare, ArrowUpRight } from 'lucide-react';
import { buildQuickWhatsAppUrl } from '../lib/whatsapp';
import { trackWhatsAppCtaClick } from '../lib/analytics';

interface WhatsAppCtaProps {
  label?: string;
  topic?: string;
  source: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function WhatsAppCta({
  label = 'Enquire on WhatsApp',
  topic,
  source,
  variant = 'primary',
  className = '',
}: WhatsAppCtaProps) {
  const href = buildQuickWhatsAppUrl(topic);

  const variantClasses =
    variant === 'primary'
      ? 'bg-[#C8F135] text-[#090A0C] hover:bg-[#D6F85D] active:bg-[#B8E124] border border-[#C8F135] font-semibold'
      : 'bg-transparent text-[#F4F5F7] hover:bg-white/5 active:bg-white/10 border border-white/20 hover:border-[#C8F135]/60 font-medium';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppCtaClick(source)}
      className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 text-sm tracking-tight transition-colors duration-150 whitespace-nowrap shrink-0 ${variantClasses} ${className}`}
    >
      <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{label}</span>
      <ArrowUpRight className="h-4 w-4 shrink-0 opacity-80" aria-hidden="true" />
    </a>
  );
}
