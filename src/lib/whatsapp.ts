import { SITE_CONFIG } from '../config/siteConfig';

export interface EnquiryPayload {
  fullName: string;
  phone: string;
  interestedIn: string;
  message: string;
}

export interface EnquiryValidationErrors {
  fullName?: string;
  phone?: string;
  interestedIn?: string;
  message?: string;
}

export function sanitizeInput(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

export function normalizeDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function isWhatsAppConfigured(): boolean {
  return /^\d{10,15}$/.test(normalizeDigits(SITE_CONFIG.contact.whatsappNumber));
}

export function validateEnquiryForm(raw: EnquiryPayload): {
  cleaned: EnquiryPayload;
  errors: EnquiryValidationErrors;
  isValid: boolean;
} {
  const cleaned: EnquiryPayload = {
    fullName: sanitizeInput(raw.fullName),
    phone: sanitizeInput(raw.phone),
    interestedIn: sanitizeInput(raw.interestedIn),
    message: raw.message.trim(),
  };

  const errors: EnquiryValidationErrors = {};
  if (!cleaned.fullName) errors.fullName = 'Please enter your full name.';
  else if (cleaned.fullName.length < 2) errors.fullName = 'Name must be at least 2 characters.';
  else if (cleaned.fullName.length > 80) errors.fullName = 'Name must be 80 characters or fewer.';

  const digits = normalizeDigits(cleaned.phone);
  if (!cleaned.phone) errors.phone = 'Please enter your phone or WhatsApp number.';
  else if (!/^[+\d\s()-]+$/.test(cleaned.phone)) {
    errors.phone = 'Phone number may only contain digits, spaces, +, -, or parentheses.';
  } else if (digits.length < 10 || digits.length > 15) {
    errors.phone = 'Please enter a valid 10 to 15 digit phone number.';
  }

  if (!cleaned.interestedIn) errors.interestedIn = 'Please select what you are enquiring about.';
  if (cleaned.message.length > 500) errors.message = 'Message must be 500 characters or fewer.';

  return { cleaned, errors, isValid: Object.keys(errors).length === 0 };
}

export function buildWhatsAppMessage(payload: EnquiryPayload): string {
  const lines = [
    `Hello ${SITE_CONFIG.brand.name},`,
    '',
    `Name: ${payload.fullName}`,
    `Phone: ${payload.phone}`,
    `Interested in: ${payload.interestedIn}`,
  ];
  if (payload.message) lines.push(`Message: ${payload.message}`);
  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  const targetDigits = normalizeDigits(SITE_CONFIG.contact.whatsappNumber);
  if (!/^\d{10,15}$/.test(targetDigits)) {
    throw new Error('WhatsApp contact is not configured with a verified number.');
  }
  return `https://wa.me/${targetDigits}?text=${encodeURIComponent(message)}`;
}

export function buildQuickWhatsAppUrl(topic?: string): string {
  const baseText = topic
    ? `Hello ${SITE_CONFIG.brand.name}, I would like to enquire about ${topic}.`
    : `Hello ${SITE_CONFIG.brand.name}, I would like to enquire about memberships and visiting the gym.`;
  return buildWhatsAppUrl(baseText);
}

export function openWhatsAppClickToChat(url: string): void {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
