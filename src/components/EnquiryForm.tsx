import { useEffect, useState, type FormEvent } from 'react';
import { MessageSquare, Phone, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG, isPhoneContactEnabled, isWhatsAppContactEnabled } from '../config/siteConfig';
import { INQUIRY_INTEREST_OPTIONS } from '../data/gymContent';
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  openWhatsAppClickToChat,
  validateEnquiryForm,
  type EnquiryValidationErrors,
} from '../lib/whatsapp';
import {
  trackFormValidationError,
  trackPhoneCtaClick,
  trackWhatsAppHandoffInitiated,
} from '../lib/analytics';
import { ActionButton } from './ActionButton';

interface EnquiryFormProps {
  initialInterest?: string;
  source?: string;
}

export function EnquiryForm({
  initialInterest = '',
  source = 'enquiry_form',
}: EnquiryFormProps) {
  const whatsappEnabled = isWhatsAppContactEnabled();
  const phoneEnabled = isPhoneContactEnabled();

  const defaultInterest =
    initialInterest &&
    (INQUIRY_INTEREST_OPTIONS as readonly string[]).includes(initialInterest)
      ? initialInterest
      : INQUIRY_INTEREST_OPTIONS[0];

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [interestedIn, setInterestedIn] = useState<string>(defaultInterest);
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<EnquiryValidationErrors>({});
  const [isCooldown, setIsCooldown] = useState(false);
  const [handoffUrl, setHandoffUrl] = useState<string | null>(null);

  useEffect(() => {
    if (
      initialInterest &&
      (INQUIRY_INTEREST_OPTIONS as readonly string[]).includes(initialInterest)
    ) {
      setInterestedIn(initialInterest);
    }
  }, [initialInterest]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isCooldown || !whatsappEnabled) return;

    const { cleaned, errors: validationErrors, isValid } = validateEnquiryForm({
      fullName,
      phone,
      interestedIn,
      message,
    });

    if (!isValid) {
      setErrors(validationErrors);
      setHandoffUrl(null);
      trackFormValidationError(Object.keys(validationErrors));
      return;
    }

    setErrors({});
    setIsCooldown(true);

    const formattedMessage = buildWhatsAppMessage(cleaned);
    const url = buildWhatsAppUrl(formattedMessage);

    // User-initiated synchronous handoff so popup blockers allow WhatsApp launch
    openWhatsAppClickToChat(url);
    setHandoffUrl(url);
    trackWhatsAppHandoffInitiated(cleaned.interestedIn);

    window.setTimeout(() => {
      setIsCooldown(false);
    }, 1500);
  };

  const selectOptions: string[] = [...INQUIRY_INTEREST_OPTIONS];
  if (initialInterest && !selectOptions.includes(initialInterest)) {
    selectOptions.unshift(initialInterest);
  }

  return (
    <div className="border border-white/10 bg-[#121418] p-6 sm:p-8">
      <div className="border-b border-white/10 pb-5">
        <p className="text-xs font-medium tracking-wider text-[#C8F135] uppercase">
          WhatsApp Enquiry
        </p>
        <h2 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-[#F4F5F7] sm:text-3xl">
          Send Your Enquiry via WhatsApp
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#A1A7B3]">
          Complete the fields below to prepare your message. WhatsApp will open with your
          details prefilled so you can review and tap Send.
        </p>
      </div>

      {!whatsappEnabled ? (
        <p className="mt-5 border border-white/10 bg-[#090A0C] p-3 text-xs leading-relaxed text-[#A1A7B3]" role="note">
          Preview mode: contact actions are disabled until the gym's verified WhatsApp and phone details are approved.
        </p>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        {/* Full Name */}
        <div>
          <label
            htmlFor="enquiry-full-name"
            className="block text-sm font-medium text-[#F4F5F7]"
          >
            Full name <span className="text-[#C8F135]">*</span>
          </label>
          <input
            id="enquiry-full-name"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            maxLength={80}
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
            }}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'enquiry-full-name-error' : undefined}
            placeholder="Your full name"
            className={`mt-2 block min-h-[44px] w-full border bg-[#090A0C] px-3.5 py-2.5 text-sm text-[#F4F5F7] placeholder:text-[#717886] transition-colors ${
              errors.fullName
                ? 'border-red-400 focus:border-red-400'
                : 'border-white/15 focus:border-[#C8F135]'
            }`}
          />
          {errors.fullName ? (
            <p
              id="enquiry-full-name-error"
              role="alert"
              className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.fullName}</span>
            </p>
          ) : null}
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="enquiry-phone"
            className="block text-sm font-medium text-[#F4F5F7]"
          >
            Phone number <span className="text-[#C8F135]">*</span>
          </label>
          <input
            id="enquiry-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
            }}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'enquiry-phone-error' : undefined}
            placeholder="e.g. +91 98765 43210"
            className={`mt-2 block min-h-[44px] w-full border bg-[#090A0C] px-3.5 py-2.5 text-sm text-[#F4F5F7] placeholder:text-[#717886] transition-colors tabular-nums ${
              errors.phone
                ? 'border-red-400 focus:border-red-400'
                : 'border-white/15 focus:border-[#C8F135]'
            }`}
          />
          {errors.phone ? (
            <p
              id="enquiry-phone-error"
              role="alert"
              className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.phone}</span>
            </p>
          ) : null}
        </div>

        {/* Interested In */}
        <div>
          <label
            htmlFor="enquiry-interest"
            className="block text-sm font-medium text-[#F4F5F7]"
          >
            Interested in <span className="text-[#C8F135]">*</span>
          </label>
          <select
            id="enquiry-interest"
            name="interestedIn"
            required
            value={interestedIn}
            onChange={(e) => {
              setInterestedIn(e.target.value);
              if (errors.interestedIn)
                setErrors((prev) => ({ ...prev, interestedIn: undefined }));
            }}
            aria-invalid={Boolean(errors.interestedIn)}
            aria-describedby={errors.interestedIn ? 'enquiry-interest-error' : undefined}
            className={`mt-2 block min-h-[44px] w-full border bg-[#090A0C] px-3.5 py-2.5 text-sm text-[#F4F5F7] transition-colors ${
              errors.interestedIn
                ? 'border-red-400 focus:border-red-400'
                : 'border-white/15 focus:border-[#C8F135]'
            }`}
          >
            {selectOptions.map((option) => (
              <option key={option} value={option} className="bg-[#090A0C] text-[#F4F5F7]">
                {option}
              </option>
            ))}
          </select>
          {errors.interestedIn ? (
            <p
              id="enquiry-interest-error"
              role="alert"
              className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.interestedIn}</span>
            </p>
          ) : null}
        </div>

        {/* Optional Message */}
        <div>
          <label
            htmlFor="enquiry-message"
            className="block text-sm font-medium text-[#F4F5F7]"
          >
            Message <span className="text-xs font-normal text-[#717886]">(Optional)</span>
          </label>
          <textarea
            id="enquiry-message"
            name="message"
            rows={3}
            maxLength={500}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
            }}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'enquiry-message-error' : undefined}
            placeholder="Preferred visit timing, training goals, or questions..."
            className={`mt-2 block w-full border bg-[#090A0C] px-3.5 py-2.5 text-sm text-[#F4F5F7] placeholder:text-[#717886] transition-colors ${
              errors.message
                ? 'border-red-400 focus:border-red-400'
                : 'border-white/15 focus:border-[#C8F135]'
            }`}
          />
          {errors.message ? (
            <p
              id="enquiry-message-error"
              role="alert"
              className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.message}</span>
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
          <ActionButton
            type="submit"
            variant="primary"
            disabled={isCooldown || !whatsappEnabled}
            className="w-full sm:w-auto"
          >
            <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{isCooldown ? 'Opening WhatsApp...' : 'Continue to WhatsApp'}</span>
          </ActionButton>

          <a
            href={phoneEnabled ? SITE_CONFIG.contact.phoneHref : undefined}
            aria-disabled={!phoneEnabled}
            onClick={(event) => {
              if (!phoneEnabled) { event.preventDefault(); return; }
              trackPhoneCtaClick(source);
            }
            className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-white/20 px-4 py-2.5 text-sm font-medium text-[#F4F5F7] hover:bg-white/5 transition-colors whitespace-nowrap"
          >
            <Phone className="h-4 w-4 text-[#C8F135]" aria-hidden="true" />
            <span>{phoneEnabled ? 'Or Call Studio' : 'Phone details pending'}</span>
          </a>
        </div>

        <p className="text-xs leading-relaxed text-[#717886]">
          Your details are used only to prefill your WhatsApp message and are not stored on this
          website.
        </p>
      </form>

      {/* Required WhatsApp Handoff Status Panel */}
      {handoffUrl ? (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 border border-[#C8F135]/40 bg-[#090A0C] p-5"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#C8F135]" aria-hidden="true" />
            <div className="space-y-3">
              <p className="text-sm font-medium text-[#F4F5F7]">
                WhatsApp has opened with your enquiry. Please tap Send to share it with the gym.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={handoffUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-1.5 border border-[#C8F135] px-3.5 py-2 text-xs font-semibold text-[#C8F135] hover:bg-[#C8F135] hover:text-[#090A0C] transition-colors"
                >
                  <span>Open WhatsApp Again</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={phoneEnabled ? SITE_CONFIG.contact.phoneHref : undefined}
                  aria-disabled={!phoneEnabled}
                  onClick={(event) => {
                    if (!phoneEnabled) { event.preventDefault(); return; }
                    trackPhoneCtaClick(`${source}_fallback`);
                  }
                  className="inline-flex min-h-[40px] items-center gap-1.5 border border-white/20 px-3.5 py-2 text-xs font-medium text-[#F4F5F7] hover:bg-white/5 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-[#C8F135]" aria-hidden="true" />
                  <span>{phoneEnabled ? `Call ${SITE_CONFIG.contact.phoneDisplay}` : 'Phone details pending'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
