# Project guide

## Architecture

Nexora is a React 19 / TypeScript AI course storefront using TanStack Start, file-based TanStack Router routes, Vite, Tailwind CSS 4, and Netlify. It is not an LMS. Do not imply that student accounts, lessons, enrollment entitlements, or fulfillment emails exist.

## Key directories

- `src/routes/index.tsx`: homepage, category filtering, search, sorting, approach section, and FAQ.
- `src/routes/products/$productId.tsx`: course details, syllabus accordions, and purchase panel.
- `src/routes/checkout/`: verified payment result and cancellation pages.
- `src/routes/__root.tsx`: global shell, navigation, footer, metadata, and stylesheet import.
- `src/components/`: shared header/footer, code-native course illustrations, and checkout interaction.
- `src/data/products.ts`: fixed illustrative editorial catalog and shared product type. This is content configuration, not a mutable application data store.
- `src/lib/stripe.ts`: browser-side payment API wrappers; never import secret-bearing server code here.
- `netlify/functions/`: `.mts` API handlers for checkout, receipt verification, and webhooks.
- `netlify/functions/lib/payments.ts`: server-only Stripe initialization, availability gate, origin selection, and idempotent order recording.
- `db/schema.ts`: Drizzle schema, the source of truth for persisted order data.
- `db/index.ts`: invocation-time Netlify Database client factory.
- `netlify/database/migrations/`: generated migrations nexora by Netlify at deployment.
- `src/styles.css`: cream, orange, and muted olive design tokens, layout rules, component styles, motion, and responsive breakpoints.
- `public/`: favicon and static assets.

## Coding conventions

Use TypeScript, PascalCase components, camelCase functions, and single-quoted strings. Follow the existing no-semicolon convention. Use `@/` aliases in frontend code and relative `.js` extension imports in database/functions code. Use Lucide for UI icons. Prefer small, focused edits and keep responsive and keyboard interaction states intact.

Preserve the editorial style: Manrope headings, DM Sans body, serif italic accents, spacious cream backgrounds, restrained orange accents, and muted green. Course illustrations are lightweight CSS/SVG rather than external images. Respect reduced-motion preferences and maintain the skip link, semantic labels, focus indicators, and mobile navigation.

## Payments and data

Read the relevant Netlify skills before changing platform integrations. Use `Netlify.env.get()` for function environment variables; never output credentials. Only initialize runtime clients inside a function call.

The checkout API computes prices from the canonical catalog and only accepts valid course IDs. Never accept a price, redirect target, or payment status from a client. Keep the same-origin checkout check, trusted redirect origin selection, signed raw-body webhook verification, and server-side session retrieval.


Verified paid orders persist in Netlify Database via `drizzle-orm/netlify-db` with `@netlify/database`. The session ID is the primary key, and duplicate webhook/receipt recording is a no-op. Never use memory, browser storage, or local files for purchase persistence. Receipt APIs do not expose buyer email or other customer details.

Both `drizzle-orm` and `drizzle-kit` use the `@beta` release line required by the platform skill. Check migration status before generating changes. Generate migrations with Drizzle Kit; never hand-edit generated snapshots or nexora SQL. Migration output must remain `netlify/database/migrations`.

## Development and validation

Use pnpm and Node.js 22. Local platform development uses `netlify dev --port 8889`. Do not run builds, dev servers, typecheck commands, or tests during agent tasks unless the user explicitly changes the current no-local-validation requirement. The deployment pipeline installs and validates automatically. Review source directly and report unverified runtime behavior honestly.

Keep `README.md` accurate and write a standalone past-tense changes summary to `.netlify/results.md` at the end of implementation tasks. Do not create commits or inspect the `.git` directory.
