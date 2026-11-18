export interface NavItem {
  label: string;
  path: string;
}

export interface SocialLink {
  platform: 'Instagram' | 'YouTube' | 'Facebook';
  handle: string;
  url: string;
  isPlaceholder: boolean;
}

export interface OpeningHour {
  days: string;
  hours: string;
}

export const SITE_CONFIG = {
  brand: {
    name: 'Forge Fitness',
    shortMark: 'FORGE',
    positioning: 'Strength, Conditioning & Coached Training',
    heroHeadline: 'Built for disciplined strength and lasting conditioning.',
    heroSubheadline:
      'An independent training floor equipped with calibrated free weights, functional turf lanes, and structured coaching built around measurable progress.',
    establishedNote: 'Illustrative Studio Preview — Client Details Pending Final Sign-off',
  },
  colors: {
    canvas: '#090A0C',
    surface: '#121418',
    surfaceElevated: '#181B20',
    accent: '#C8F135',
    inkPrimary: '#F4F5F7',
    inkSecondary: '#A1A7B3',
  },
  contact: {
    // Replace with client-confirmed WhatsApp number (international digits only, no '+' or spaces)
    whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '919800000000',
    // Replace with client-confirmed display phone and tel: href
    phoneDisplay: '+91 98000 00000',
    phoneHref: 'tel:+919800000000',
    emailDisplay: 'hello@forgefitness.example',
    addressLines: [
      'Sample Location: 42 Indiranagar 100 Ft Road',
      'Bengaluru, Karnataka 560038',
    ],
    addressNote: 'Placeholder address shown for layout preview — confirm exact studio address before launch.',
    mapsQueryUrl:
      'https://www.google.com/maps/search/?api=1&query=Indiranagar+100+Feet+Road+Bengaluru',
    mapsEmbedUrl:
      'https://www.google.com/maps?q=Indiranagar+100+Feet+Road+Bengaluru&output=embed',
    openingHours: [
      { days: 'Monday – Saturday', hours: '05:30 AM – 10:00 PM' },
      { days: 'Sunday', hours: '07:00 AM – 02:00 PM' },
    ] satisfies OpeningHour[],
  },
  analytics: {
    // Set VITE_GA4_MEASUREMENT_ID in Vercel environment variables or update fallback below
    ga4MeasurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID || '',
    placeholderId: 'G-XXXXXXXXXX',
    requireConsentBanner: true,
  },
  navigation: [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Facilities', path: '/facilities' },
    { label: 'Membership', path: '/membership' },
    { label: 'Trainers', path: '/trainers' },
    { label: 'Timetable', path: '/timetable' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ] satisfies NavItem[],
  socialLinks: [
    {
      platform: 'Instagram',
      handle: '@forgefitness.studio',
      url: 'https://instagram.com',
      isPlaceholder: true,
    },
    {
      platform: 'YouTube',
      handle: 'Forge Fitness Training',
      url: 'https://youtube.com',
      isPlaceholder: true,
    },
    {
      platform: 'Facebook',
      handle: 'Forge Fitness Studio',
      url: 'https://facebook.com',
      isPlaceholder: true,
    },
  ] satisfies SocialLink[],
  missingClientInputs: [
    'Confirmed Gym Brand Name, Tagline, and Vector Logo SVG/PNG',
    'Verified Street Address, Landmark, and Exact Google Maps Coordinates / Share Link',
    'Confirmed Business Phone Number and Official WhatsApp Business/Desk Number',
    'Client-owned Google Analytics 4 Measurement ID (G-XXXXXXXXXX)',
    'Approved Membership Tier Names, Final INR Pricing, Durations, and Terms',
    'Real Coach Names, High-Res Portraits, and Verified Credentials/Certifications',
    'Approved Gym Interior & Training Session Photographs (with Model Releases)',
    'Final Weekly Group Class Schedule (Days, Timings, Class Names, Assigned Coaches)',
    'Official Social Media Profile URLs and Custom Domain Name for Vercel DNS',
  ],
} as const;
