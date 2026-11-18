# Forge Fitness — GrowthSathi Package 02 (Growth Website)

A static, conversion-focused eight-page website built for independent gyms and fitness studios using React, TypeScript, Vite, Tailwind CSS, and Lucide icons.

## Scope

- **Architecture:** Static Single-Page Application. No backend, database, online billing, booking engine, or stored enquiry records.
- **Pages:** Home, About Us, Facilities & Services, Membership & Pricing, Trainers, Class Timetable, Gallery, and Contact Us.
- **Enquiry workflow:** Client-side validation → user-initiated WhatsApp Click-to-Chat with a prefilled message → visitor reviews and manually taps Send.

## Local development

The repository includes `bun.lock`. Use Bun to keep dependency resolution aligned with the committed lockfile:

```bash
bun install
bun run dev
```

The development server runs at `http://localhost:3000`.

## Checks and production build

```bash
bun run typecheck
bun run lint
bun run build
bun run preview
```

Note: `lint` currently runs the TypeScript compiler check; a separate ESLint configuration has not yet been added. Production files are generated in `dist/`.

## Configuration

### Demo and release safety

The site defaults to demo mode. In demo mode, phone and WhatsApp actions are disabled and sample contact details are not used as destinations.

For a real client release, configure all of the following in the client-owned Vercel project:

- `VITE_DEMO_MODE=false`
- `VITE_CLIENT_CONTENT_APPROVED=true` — set this only after all names, address, prices, timetable, trainers, credentials, images, and social URLs have been checked and approved.
- `VITE_WHATSAPP_NUMBER` — verified international digits only, 10–15 digits.
- `VITE_PHONE_DISPLAY` — verified display phone number.
- `VITE_PHONE_HREF` — verified `tel:+...` destination.
- `VITE_SITE_URL` — final canonical HTTPS domain, without a trailing slash.
- `VITE_GA4_MEASUREMENT_ID` — optional client-owned GA4 Measurement ID.

The production build fails if demo mode is disabled without the content approval flag, verified contact destinations, and canonical HTTPS domain. Do not bypass this guard to publish sample data.

### Content locations

- `src/config/siteConfig.ts` — brand, contact, opening hours, social links, analytics, and navigation.
- `src/data/gymContent.ts` — about copy, facilities, membership tiers, trainer profiles, timetable, and gallery content.

Replace every illustrative entry in both files before setting the content approval flag.

### Analytics consent

GA4 loads only after consent is granted. The visitor's choice is persisted in local storage; a Privacy settings control remains available so the visitor can reopen preferences. Revoking consent sends a denied consent update. Customer names, phone numbers, and free-text enquiry messages must never be sent to analytics.

## Vercel deployment

1. Use the client-owned Vercel account and approved GitHub repository.
2. Framework preset: **Vite**.
3. Build command: `bun run build` (or the equivalent configured package manager command).
4. Output directory: `dist`.
5. Add the release environment variables listed above.
6. Attach the client's domain and verify HTTPS before handover.
7. The build generates an absolute-URL sitemap only when `VITE_SITE_URL` is configured.

## Commercial / operational boundary

This package is a static marketing website with a manual WhatsApp enquiry handoff. It does not include a database, lead CRM, admin dashboard, online payments, class booking, membership management, or automated WhatsApp messaging.
