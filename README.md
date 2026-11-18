# Forge Fitness — GrowthSathi Package 02 (Growth Website)

A static, conversion-focused eight-page website for independent gyms and fitness studios. Built with React, TypeScript, Vite, Tailwind CSS, React Router, and Lucide icons.

## Package Scope

- **Architecture:** Static Single-Page Application. No backend, database, authentication, admin panel, online billing, or booking system.
- **Pages:** Home, About, Facilities & Services, Membership & Pricing, Trainers, Class Timetable, Gallery, and Contact.
- **Enquiry flow:** Client-side validation → user-initiated WhatsApp Click-to-Chat with a prefilled message → the visitor manually taps Send.
- **Hosting:** Static deployment on the client's Vercel account and domain.

The website does not claim that a WhatsApp message was sent, does not store enquiry details, and does not create leads in a CRM.

## Important: Demo Content

This repository is a portfolio/demo template. Forge Fitness branding, address, contact details, opening hours, social links, membership prices, trainer names, timetable, facilities, and photos are illustrative sample content.

**Do not present the current content as verified information about a real gym.** Replace it with client-approved information before handover.

The default build is deliberately **not indexable**:
- The HTML robots directive is set to `noindex,nofollow`.
- `robots.txt` disallows crawling.
- No sitemap is emitted.

Search indexing is enabled only when the final HTTPS domain is configured and `VITE_INDEXING_ENABLED=true`.

## Local Development

Use a Node.js version supported by Vite 8 (Node.js 20.19+ or 22.12+).

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:3000`.

### Typecheck and Production Build

```bash
npm run typecheck
npm run build
npm run preview
```

Production static assets are output to `dist/`.

To remove generated output:

```bash
npm run clean
```

## Configuration

Copy `.env.example` to `.env.local` for local configuration. In Vercel, set the same variables in Project Settings → Environment Variables.

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_WHATSAPP_NUMBER` | Yes for a real client | Confirmed WhatsApp number in international digits only, e.g. `919876543210` |
| `VITE_PHONE_DISPLAY` | Yes for a real client | Confirmed phone number shown on the site |
| `VITE_PHONE_HREF` | Yes for a real client | Confirmed E.164 phone link, e.g. `tel:+919876543210` |
| `VITE_GA4_MEASUREMENT_ID` | Optional | Client-owned GA4 Measurement ID, e.g. `G-ABC123XYZ0` |
| `VITE_SITE_URL` | Required to enable indexing | Final canonical HTTPS domain, e.g. `https://www.clientdomain.in` |
| `VITE_INDEXING_ENABLED` | Optional; defaults to false | Set to `true` only after the client approves the domain and all public content |

Other business details are maintained in:
- `src/config/siteConfig.ts` — brand, phone, email, address, maps, opening hours, social links, GA4 settings, and client-input checklist.
- `src/data/gymContent.ts` — about copy, facilities, membership plans, trainers, timetable, and gallery content.

### WhatsApp Click-to-Chat

Set `VITE_WHATSAPP_NUMBER` to the client-confirmed number. It must contain the country code and digits only, with no plus sign or spaces. Set `VITE_PHONE_DISPLAY` and `VITE_PHONE_HREF` to the approved phone display text and E.164 `tel:` link. The source fallbacks are demo placeholders and must not be used for a client launch. The production indexing build fails if these three client contact values are missing or invalid.

The enquiry form validates input in the browser and opens WhatsApp with a prefilled message. Visitors must manually send the message in WhatsApp.

### Google Analytics 4 and Consent

Set the client's GA4 Measurement ID in `VITE_GA4_MEASUREMENT_ID`. Analytics does not load until the visitor grants consent.

- Consent choice is persisted in local storage.
- A persistent Privacy settings control allows visitors to reopen the choice and revoke consent.
- Google Consent Mode starts with analytics and advertising storage denied.
- Only non-PII events are sent: `page_view`, `whatsapp_cta_click`, `phone_cta_click`, `form_validation_error`, and `whatsapp_handoff_initiated`.
- Names, phone numbers, email addresses, and free-text enquiry messages must never be passed to analytics.

### Search Indexing and Sitemap

Keep `VITE_INDEXING_ENABLED=false` while the site contains demo or unverified client information.

For an approved production launch:
1. Replace all sample content and contact details with client-approved information.
2. Set `VITE_SITE_URL` to the final HTTPS domain with no trailing slash.
3. Set `VITE_INDEXING_ENABLED=true`.
4. Run a fresh production build.

The Vite build plugin then:
- Changes the robots meta directive to `index,follow`.
- Generates `robots.txt` with an absolute sitemap URL.
- Generates `sitemap.xml` with absolute URLs for all eight routes.

If indexing is disabled, the build emits a disallow-all robots file and removes the sitemap. Canonical URLs are generated from `VITE_SITE_URL`; deployment preview hostnames are not used as canonical URLs.

No structured business schema is included by default because the current gym details are illustrative. Add LocalBusiness/ExerciseGym structured data only after the client verifies the exact public business information.

## Vercel Deployment and Handover

1. Push the approved client version to the client's GitHub repository.
2. Import it into the client's Vercel account.
3. Configure:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Add the required environment variables.
5. Attach the client's domain and verify HTTPS.
6. Confirm all eight routes work on direct navigation and refresh.
7. Verify the final WhatsApp number, phone links, map, social links, opening hours, prices, trainer details, and timetable.
8. Enable indexing only after the client approves all public content.

`vercel.json` configures SPA rewrites so direct visits and refreshes on all eight routes resolve correctly.

## Production Content Checklist

Before client handover, obtain and verify:

1. Brand name, tagline, and approved logo.
2. Full street address, landmark, and Google Maps share link.
3. Official phone and WhatsApp Business numbers.
4. Membership names, INR prices, durations, tax notes, and terms.
5. Trainer names, portraits, roles, and verified credentials.
6. Client-approved gym and training photographs, with any required model releases.
7. Weekly class schedule and assigned coaches.
8. Official Instagram, YouTube, and Facebook URLs.
9. Client-owned domain, Vercel account, and GA4 Measurement ID (if analytics is requested).

## Quality Notes

- `npm run typecheck` checks TypeScript types; it is not an ESLint run.
- The app is intentionally static and does not include server-side data storage.
- Large source JPEGs still need responsive WebP/AVIF variants before a real production launch.
