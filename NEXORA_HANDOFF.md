# Nexora — handoff notes

## What changed

- Rebranded the storefront from Applied to Nexora.
- Reworked the homepage hero, value strip, catalog copy, learning approach, FAQ, and footer.
- Replaced the old five-course catalog with six new one-time programs:
  - $10 AI Foundations
  - $25 Prompt Systems
  - $50 AI Productivity OS
  - $100 Build AI Tools
  - $200 AI Automation Lab
  - $500 AI Business Systems
- Removed the old subscription pricing and monthly billing language.
- Removed demonstration/demo/test-checkout messaging and the legacy Stripe checkout routes/functions.
- Kept Whop OAuth login and server-side access verification.
- Added a safe setup state for programs whose new Whop product has not yet been connected.
- Refreshed course artwork copy and favicon.
- Improved course cards so content fills the card consistently and improved small-screen category scrolling.

## One required launch step

The new Whop products must be created before the new site can accept purchases.

In `src/data/products.ts`, add the matching values for each program:

```ts
whopProductId: 'prod_...',
whopUrl: 'https://whop.com/...'
```

Then configure the new site's Whop OAuth callback and Netlify environment variables as described in `WHOP_SETUP.md`.

Do not reuse the old five Whop product IDs unless those products have actually been recreated/renamed to match the new catalog.
