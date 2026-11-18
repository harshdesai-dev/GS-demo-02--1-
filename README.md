# Forge Fitness — GrowthSathi Package 02 (Growth Website)

A static, conversion-focused eight-page website built for independent gyms and fitness studios using React, TypeScript, Vite, Tailwind CSS, and Lucide icons.

## Scope Summary

- **Package:** GrowthSathi Package 02 – Growth Website
- **Architecture:** Static Single-Page Application (zero backend, zero database, zero online billing)
- **Pages Included (8):**
  1. Home (`/`)
  2. About Us (`/about`)
  3. Facilities & Services (`/facilities`)
  4. Membership & Pricing (`/membership`)
  5. Trainers (`/trainers`)
  6. Class Timetable (`/timetable`)
  7. Gallery (`/gallery`)
  8. Contact Us (`/contact`)
- **Enquiry Workflow:** Form validation → user-initiated `https://wa.me/` Click-to-Chat launch with URL-encoded enquiry → customer manually taps Send. No enquiry data is stored in browser storage or any server.

---

## Local Installation & Development

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:3000`.

### Build & Typecheck

```bash
npm run lint
npm run build
```

Production static assets are output to `dist/`.

---

## Configuration Points

All editable business content and settings are separated from presentation code:

- `src/config/siteConfig.ts` — Gym brand name, positioning, phone/WhatsApp number, address, opening hours, social links, Google Maps URLs, GA4 config, and missing client input checklist.
- `src/data/gymContent.ts` — About copy, facilities/services, membership plans & comparison matrix, trainer profiles, static weekly timetable, and gallery photos.

### 1. WhatsApp Click-to-Chat Configuration

Set the client-confirmed WhatsApp number in international digits-only format (no `+` or spaces, e.g. `919876543210`) using either:

- Environment variable `VITE_WHATSAPP_NUMBER` in Vercel Project Settings, or
- `SITE_CONFIG.contact.whatsappNumber` in `src/config/siteConfig.ts`.

### 2. Google Analytics 4 Configuration

Set the client-owned GA4 Measurement ID (e.g. `G-ABC123XYZ0`) using either:

- Environment variable `VITE_GA4_MEASUREMENT_ID` in Vercel Project Settings, or
- `SITE_CONFIG.analytics.ga4MeasurementId` in `src/config/siteConfig.ts`.

**Privacy Rules Enforced:**
- Analytics only initializes when a valid `G-` ID is configured and consent is granted.
- Tracks only non-PII events: `page_view`, `whatsapp_cta_click`, `phone_cta_click`, `form_validation_error`, and `whatsapp_handoff_initiated`.
- Customer names, phone numbers, and message text are **never** sent to GA4.

---

## Vercel Static Deployment & Handover

1. Push this repository to the client-approved GitHub repository.
2. Import the repository into the client-owned Vercel account:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Add environment variables in Vercel Project Settings → Environment Variables:
   - `VITE_WHATSAPP_NUMBER`
   - `VITE_GA4_MEASUREMENT_ID`
4. `vercel.json` configures SPA rewrites (`/(.*) -> /index.html`) so direct visits and refreshes on all eight routes resolve cleanly.
5. Attach the client-owned custom domain in Vercel Domains and verify HTTPS is active before final handover.
6. Update `public/sitemap.xml` `<loc>` URLs with the final production domain prior to search console submission.

---

## Remaining Placeholders & Required Client Inputs Before Production

Before replacing demo status and launching publicly, obtain and confirm the following from the client:

1. **Brand Identity:** Confirmed gym name, tagline, and final logo SVG/PNG if applicable.
2. **Location & Maps:** Verified street address, landmark, and exact Google Maps share/embed coordinates.
3. **Contact Numbers:** Confirmed studio phone number (`tel:`) and official WhatsApp desk number.
4. **Google Analytics 4:** Client-owned GA4 Measurement ID (`G-XXXXXXXXXX`).
5. **Membership & Pricing:** Approved plan names, final INR fees, durations, GST notes, and membership terms.
6. **Trainers:** Approved coach names, portraits, roles, and verified credentials/certifications.
7. **Photography:** Client-supplied or approved gym interior, equipment, and training session photos.
8. **Weekly Timetable:** Final days, timings, class titles, and assigned coaches.
9. **Social & Domain:** Official Instagram/YouTube/Facebook URLs and custom domain DNS access.
