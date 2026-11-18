export interface FacilityItem {
  id: string;
  category: 'Gym Equipment' | 'Training Zones' | 'Amenities' | 'Training Services';
  title: string;
  summary: string;
  specs: string[];
  image: string;
  imageAlt: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  duration: string;
  priceInr: string;
  billingNote: string;
  summary: string;
  featured?: boolean;
  benefits: string[];
  limitations: string;
}

export interface PlanComparisonRow {
  feature: string;
  foundation: string;
  quarterly: string;
  annual: string;
}

export interface TrainerProfile {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  bio: string;
  credentialsNote: string;
  image: string;
  imageAlt: string;
  isSampleProfile: boolean;
}

export interface TimetableSession {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  className: string;
  category: 'Strength' | 'Conditioning' | 'Mobility' | 'Open Floor';
  trainer: string;
  duration: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Strength Floor' | 'Conditioning' | 'Amenities' | 'Coaching';
  caption: string;
  image: string;
  alt: string;
  aspect: 'landscape' | 'portrait';
}

export const MEDIA_ASSETS = {
  heroGymFloor: '/src/assets/images/hero_gym_floor_1795006372527.jpg',
  strengthZone: '/src/assets/images/facilities_strength_zone_1795006373502.jpg',
  conditioningTurf: '/src/assets/images/facilities_conditioning_turf_1795006373374.jpg',
  recoveryAmenities: '/src/assets/images/facilities_recovery_amenities_1795006374150.jpg',
  groupSession: '/src/assets/images/gallery_group_session_1795006375429.jpg',
  trainerHeadCoach: '/src/assets/images/trainer_head_coach_1795006374492.jpg',
  trainerConditioningCoach: '/src/assets/images/trainer_conditioning_coach_1795006375407.jpg',
  trainerHypertrophyCoach: '/src/assets/images/trainer_hypertrophy_coach_1795006376533.jpg',
} as const;

export const ABOUT_CONTENT = {
  eyebrow: 'About Forge Fitness',
  headline: 'Structured training without overcrowded gimmicks.',
  storyParagraphs: [
    'Forge Fitness was designed around a straightforward premise: serious strength work and daily conditioning require uncrowded racks, calibrated equipment, and coaches who pay attention to movement quality.',
    'Notice: This studio story and philosophy serve as an illustrative template for Package 02. Upon client handover, this copy is updated with the verified founding background, ownership details, and facility history.',
  ],
  mission:
    'Provide a clean, well-maintained training environment where beginners and experienced lifters alike can follow structured programming safely and consistently.',
  values: [
    {
      title: '01. Technique First',
      description:
        'Load follows form. Every onboarding walkthrough covers barbell mechanics, bracing, and safe equipment adjustments before intensity scales.',
    },
    {
      title: '02. Calibrated Hardware',
      description:
        'Consistent bar knurling, maintained cable stacks, and dedicated lifting platforms so your training numbers stay reliable week to week.',
    },
    {
      title: '03. Quiet Discipline',
      description:
        'Respect for shared floor space, clean racking habits, and an atmosphere built for focused sessions rather than distractions.',
    },
  ],
  philosophyPoints: [
    'Progressive compound strength paired with aerobic base work.',
    'Small-group conditioning capped at manageable floor ratios.',
    'Transparent membership options with direct human support via WhatsApp or front desk.',
  ],
  founderIntro: {
    name: 'Arjun Menon (Illustrative Sample)',
    role: 'Founder & Lead Strength Coach',
    note: 'Sample leadership introduction — replace with verified owner biography and portrait upon client approval.',
    bio: 'Over a decade coaching general population strength, athletic conditioning, and sustainable movement habits. Focused on building an approachable, no-nonsense gym floor.',
    image: MEDIA_ASSETS.trainerHeadCoach,
    imageAlt: 'Illustrative portrait of lead strength coach beside competition squat rack',
  },
} as const;

export const FACILITIES_ITEMS: FacilityItem[] = [
  {
    id: 'equipment-free-weights',
    category: 'Gym Equipment',
    title: 'Calibrated Free Weights & Power Racks',
    summary:
      'Commercial-grade half racks, Olympic lifting platforms, competition-style benches, and urethane dumbbells ranging from 2.5 kg to 50 kg.',
    specs: ['6 Competition Squat Stations', 'Olympic Barbells (15 kg & 20 kg)', 'Plate-Loaded & Pin-Selected Machines'],
    image: MEDIA_ASSETS.strengthZone,
    imageAlt: 'Free weights and barbell strength zone with matte black racks and dumbbells',
  },
  {
    id: 'zone-conditioning-turf',
    category: 'Training Zones',
    title: 'Indoor Sprint Turf & Conditioning Lane',
    summary:
      'Dedicated high-traction turf track paired with weighted push sleds, competition kettlebells, and Concept2 rowing ergometers for metabolic work.',
    specs: ['20m Marked Sprint Lane', 'Weighted Prowler Sleds', 'Rowing Ergometers & Kettlebell Rack'],
    image: MEDIA_ASSETS.conditioningTurf,
    imageAlt: 'Indoor black sprint turf track with push sled, kettlebells, and rowing ergometers',
  },
  {
    id: 'amenities-recovery-locker',
    category: 'Amenities',
    title: 'Changing Suites & Shower Lockers',
    summary:
      'Ventilated private shower stalls, secure day lockers, filtered hydration stations, and dedicated post-session stretch mats.',
    specs: ['Day-Use Secure Lockers', 'Private Rain Showers', 'Chilled Filtered Water Station'],
    image: MEDIA_ASSETS.recoveryAmenities,
    imageAlt: 'Dark slate changing room with matte black lockers and walk-in shower',
  },
  {
    id: 'services-coaching',
    category: 'Training Services',
    title: 'Personal & Small-Group Coaching',
    summary:
      'Guided 1-on-1 personal training blocks, movement onboarding for new members, and coach-led daily conditioning sessions.',
    specs: ['1-on-1 Personal Training Enquiries', 'New-Member Floor Orientation', 'Scheduled Daily Group Classes'],
    image: MEDIA_ASSETS.groupSession,
    imageAlt: 'Small-group functional training session supervised by a coach',
  },
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'foundation-monthly',
    name: 'Foundation Monthly',
    duration: '1 Month',
    priceInr: '₹2,999',
    billingNote: 'Illustrative Sample Rate · Per Month',
    summary: 'Full access to the strength floor, conditioning turf, and locker amenities with flexible month-to-month renewal.',
    benefits: [
      'Unlimited open-gym floor access during operating hours',
      'Initial equipment orientation session',
      'Locker room, shower, and hydration access',
    ],
    limitations: 'Group conditioning classes and 1-on-1 personal training billed separately. Non-transferable.',
  },
  {
    id: 'quarterly-strength',
    name: 'Quarterly Strength',
    duration: '3 Months',
    priceInr: '₹7,999',
    billingNote: 'Illustrative Sample Rate · 3 Months',
    summary: 'Built for consistent 12-week training blocks with full floor access and scheduled weekly group conditioning.',
    featured: true,
    benefits: [
      'Everything in Foundation Monthly',
      'Up to 3 scheduled group conditioning classes per week',
      '1-on-1 movement & goal check-in at Week 1 and Week 6',
      'Up to 7 days temporary membership freeze',
    ],
    limitations: 'Freeze requests require advance desk notice via WhatsApp. Taxes extra if applicable.',
  },
  {
    id: 'annual-performance',
    name: 'Annual Performance',
    duration: '12 Months',
    priceInr: '₹24,999',
    billingNote: 'Illustrative Sample Rate · 12 Months',
    summary: 'Year-round access for dedicated lifters seeking complete floor and group timetable privileges at the lowest monthly equivalent.',
    benefits: [
      'Unlimited open-gym and static timetable group sessions',
      'Quarterly 1-on-1 form & programming review',
      'Up to 30 days cumulative membership freeze',
      'Two complimentary guest day passes per quarter',
    ],
    limitations: 'Single-member registration only. Guest passes require valid ID at reception.',
  },
  {
    id: 'personal-coaching',
    name: '1-on-1 Personal Coaching',
    duration: '12 Sessions',
    priceInr: '₹11,999',
    billingNote: 'Illustrative Sample Add-on · 6-Week Validity',
    summary: 'Dedicated coaching tailored to strength progression, technique refinement, or return-to-training guidance.',
    benefits: [
      'Twelve 60-minute coached sessions with assigned trainer',
      'Custom training split aligned with your weekly schedule',
      'Direct schedule coordination via front desk',
    ],
    limitations: 'Requires an active gym floor membership. Unused sessions expire after validity window.',
  },
];

export const PLAN_COMPARISON: PlanComparisonRow[] = [
  {
    feature: 'Open Strength & Turf Floor Access',
    foundation: 'Full Hours',
    quarterly: 'Full Hours',
    annual: 'Full Hours',
  },
  {
    feature: 'Weekly Group Timetable Classes',
    foundation: 'Drop-in Fee',
    quarterly: '3 / Week Included',
    annual: 'Unlimited',
  },
  {
    feature: 'Onboarding Movement Orientation',
    foundation: '1 Session',
    quarterly: '2 Check-ins',
    annual: 'Quarterly Reviews',
  },
  {
    feature: 'Membership Freeze Allowance',
    foundation: 'Not Included',
    quarterly: 'Up to 7 Days',
    annual: 'Up to 30 Days',
  },
  {
    feature: 'Guest Day Passes',
    foundation: 'Paid Day Pass',
    quarterly: '1 Pass / Quarter',
    annual: '2 Passes / Quarter',
  },
];

export const TRAINERS: TrainerProfile[] = [
  {
    id: 'arjun-menon',
    name: 'Arjun Menon',
    role: 'Head Strength & Conditioning Coach',
    specialties: ['Barbell Strength', 'Powerlifting Mechanics', 'Athletic Base'],
    bio: 'Illustrative sample profile: Focuses on foundational squat, hinge, press, and pull mechanics for general population lifters and intermediate strength athletes.',
    credentialsNote: 'Credentials & verified certifications pending client confirmation.',
    image: MEDIA_ASSETS.trainerHeadCoach,
    imageAlt: 'Portrait of Head Strength & Conditioning Coach Arjun Menon beside squat rack',
    isSampleProfile: true,
  },
  {
    id: 'meera-kapoor',
    name: 'Meera Kapoor',
    role: 'Mobility & Conditioning Specialist',
    specialties: ['Functional Conditioning', 'Kettlebell Flow', 'Joint Mobility'],
    bio: 'Illustrative sample profile: Leads morning engine-building conditioning sessions and structured mobility blocks designed to support pain-free lifting.',
    credentialsNote: 'Credentials & verified certifications pending client confirmation.',
    image: MEDIA_ASSETS.trainerConditioningCoach,
    imageAlt: 'Portrait of Mobility & Conditioning Specialist Meera Kapoor in studio',
    isSampleProfile: true,
  },
  {
    id: 'rohan-deshmukh',
    name: 'Rohan Deshmukh',
    role: 'Hypertrophy & Personal Training Coach',
    specialties: ['Hypertrophy Programming', 'Body Recomposition', 'Beginner Onboarding'],
    bio: 'Illustrative sample profile: Works 1-on-1 with busy professionals to establish consistent 3-to-4-day strength routines and sustainable progression.',
    credentialsNote: 'Credentials & verified certifications pending client confirmation.',
    image: MEDIA_ASSETS.trainerHypertrophyCoach,
    imageAlt: 'Portrait of Hypertrophy Coach Rohan Deshmukh in gym',
    isSampleProfile: true,
  },
];

export const TIMETABLE_DAYS: TimetableSession['day'][] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const CLASS_TIMETABLE: TimetableSession[] = [
  {
    id: 'mon-1',
    day: 'Monday',
    time: '06:30 – 07:30',
    className: 'Foundational Barbell Strength',
    category: 'Strength',
    trainer: 'Arjun Menon',
    duration: '60 min',
  },
  {
    id: 'mon-2',
    day: 'Monday',
    time: '18:30 – 19:20',
    className: 'Engine & Erg Conditioning',
    category: 'Conditioning',
    trainer: 'Meera Kapoor',
    duration: '50 min',
  },
  {
    id: 'tue-1',
    day: 'Tuesday',
    time: '07:00 – 07:50',
    className: 'Kettlebell & Core Control',
    category: 'Conditioning',
    trainer: 'Meera Kapoor',
    duration: '50 min',
  },
  {
    id: 'tue-2',
    day: 'Tuesday',
    time: '19:00 – 20:00',
    className: 'Upper / Lower Hypertrophy Lab',
    category: 'Strength',
    trainer: 'Rohan Deshmukh',
    duration: '60 min',
  },
  {
    id: 'wed-1',
    day: 'Wednesday',
    time: '06:30 – 07:20',
    className: 'Turf Sled & Aerobic Intervals',
    category: 'Conditioning',
    trainer: 'Meera Kapoor',
    duration: '50 min',
  },
  {
    id: 'wed-2',
    day: 'Wednesday',
    time: '18:30 – 19:15',
    className: 'Joint Mobility & Thoracic Reset',
    category: 'Mobility',
    trainer: 'Meera Kapoor',
    duration: '45 min',
  },
  {
    id: 'thu-1',
    day: 'Thursday',
    time: '06:30 – 07:30',
    className: 'Barbell Hinge & Pull Progression',
    category: 'Strength',
    trainer: 'Arjun Menon',
    duration: '60 min',
  },
  {
    id: 'thu-2',
    day: 'Thursday',
    time: '19:00 – 20:00',
    className: 'Structural Hypertrophy Circuit',
    category: 'Strength',
    trainer: 'Rohan Deshmukh',
    duration: '60 min',
  },
  {
    id: 'fri-1',
    day: 'Friday',
    time: '07:00 – 07:50',
    className: 'Team Conditioning Metcon',
    category: 'Conditioning',
    trainer: 'Arjun Menon',
    duration: '50 min',
  },
  {
    id: 'fri-2',
    day: 'Friday',
    time: '18:30 – 19:20',
    className: 'Full-Body Athletic Carry & Sled',
    category: 'Conditioning',
    trainer: 'Rohan Deshmukh',
    duration: '50 min',
  },
  {
    id: 'sat-1',
    day: 'Saturday',
    time: '08:00 – 09:00',
    className: 'Saturday Strength & Engine',
    category: 'Conditioning',
    trainer: 'Arjun Menon & Meera Kapoor',
    duration: '60 min',
  },
  {
    id: 'sat-2',
    day: 'Saturday',
    time: '09:30 – 10:15',
    className: 'Weekend Mobility & Recovery',
    category: 'Mobility',
    trainer: 'Meera Kapoor',
    duration: '45 min',
  },
  {
    id: 'sun-1',
    day: 'Sunday',
    time: '07:00 – 14:00',
    className: 'Open Gym Floor & Recovery Access',
    category: 'Open Floor',
    trainer: 'Floor Coach on Duty',
    duration: 'Open Hours',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Main Competition Squat Bay',
    category: 'Strength Floor',
    caption: 'Calibrated plate stations and dedicated power racks along the main floor.',
    image: MEDIA_ASSETS.heroGymFloor,
    alt: 'Wide architectural view of Forge Fitness main barbell racks and lifting platforms',
    aspect: 'landscape',
  },
  {
    id: 'gal-2',
    title: 'Free Weights & Dumbbell Wall',
    category: 'Strength Floor',
    caption: 'Urethane dumbbell progression paired with chalk stands and competition benches.',
    image: MEDIA_ASSETS.strengthZone,
    alt: 'Free weight racks, dumbbells, and barbell benches in dark gym lighting',
    aspect: 'landscape',
  },
  {
    id: 'gal-3',
    title: '20-Meter Turf & Erg Track',
    category: 'Conditioning',
    caption: 'Dedicated sled lane, kettlebell lineup, and rowing ergometers.',
    image: MEDIA_ASSETS.conditioningTurf,
    alt: 'Indoor sprint turf track with push sled and rowing ergometers',
    aspect: 'landscape',
  },
  {
    id: 'gal-4',
    title: 'Coached Small-Group Conditioning',
    category: 'Coaching',
    caption: 'Focused coaching ratios during morning and evening conditioning blocks.',
    image: MEDIA_ASSETS.groupSession,
    alt: 'Small group performing kettlebell and rowing intervals under coach guidance',
    aspect: 'landscape',
  },
  {
    id: 'gal-5',
    title: 'Locker & Recovery Suites',
    category: 'Amenities',
    caption: 'Private slate-tiled rain showers, day lockers, and clean preparation benches.',
    image: MEDIA_ASSETS.recoveryAmenities,
    alt: 'Minimalist dark stone locker room and shower facilities',
    aspect: 'landscape',
  },
  {
    id: 'gal-6',
    title: 'Strength Floor Coaching',
    category: 'Coaching',
    caption: 'Hands-on barbell setup and technical coaching on the main racks.',
    image: MEDIA_ASSETS.trainerHeadCoach,
    alt: 'Strength coach standing beside loaded barbell power rack',
    aspect: 'portrait',
  },
];

export const INQUIRY_INTEREST_OPTIONS = [
  'General Gym Enquiry',
  'Book a Facility Visit / Trial',
  'Foundation Monthly (₹2,999)',
  'Quarterly Strength (₹7,999)',
  'Annual Performance (₹24,999)',
  '1-on-1 Personal Coaching (₹11,999)',
  'Group Conditioning Timetable',
] as const;
