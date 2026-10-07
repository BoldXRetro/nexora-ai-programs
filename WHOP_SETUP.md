# Whop setup for Nexora

The storefront contains six one-time AI programs. Each program is protected by a Whop access check. Before launch, create six Whop products and paste their product IDs and checkout URLs into `src/data/products.ts`.

## Product mapping

| Website | Price | Product ID | Checkout URL |
|---|---:|---|---|
| `/products/1` — AI Foundations | $10 | `REPLACE` | `REPLACE` |
| `/products/2` — Prompt Systems | $25 | `REPLACE` | `REPLACE` |
| `/products/3` — AI Productivity OS | $50 | `REPLACE` | `REPLACE` |
| `/products/4` — Build AI Tools | $100 | `REPLACE` | `REPLACE` |
| `/products/5` — AI Automation Lab | $200 | `REPLACE` | `REPLACE` |
| `/products/6` — AI Business Systems | $500 | `REPLACE` | `REPLACE` |

### Where to add them

Open `src/data/products.ts` and replace the empty values:

```ts
whopProductId: 'prod_...',
whopUrl: 'https://whop.com/...',
```

Do not put Whop API keys or OAuth secrets in this file.

## Netlify environment variables

Add these in **Netlify → Site configuration → Environment variables**:

- `WHOP_APP_ID` — your Whop OAuth app/client ID (`app_...`)
- `WHOP_APP_SECRET` — your Whop OAuth client secret
- `WHOP_COMPANY_API_KEY` — your production Company API key (`apik_...`)
- `WHOP_SESSION_SECRET` — a random secret of at least 32 characters

Never commit these values to GitHub.

## Whop OAuth

For the new deployed domain, configure the OAuth callback:

`https://YOUR-NEW-DOMAIN/api/whop-auth?action=callback`

Request the minimum identity scopes needed by the login flow: `openid profile email`.

Enable the `oauth:token_exchange` App API permission if required by your Whop OAuth configuration.

## Checkout redirect

For each Whop product, configure the post-checkout redirect to its matching program page:

- AI Foundations → `/products/1`
- Prompt Systems → `/products/2`
- AI Productivity OS → `/products/3`
- Build AI Tools → `/products/4`
- AI Automation Lab → `/products/5`
- AI Business Systems → `/products/6`

## Customer flow

1. Customer selects a program.
2. Customer completes payment on Whop.
3. Whop redirects them to the matching Nexora program page.
4. Customer signs in with Whop.
5. Nexora checks the Whop account against the correct product ID.
6. If access is active, the protected curriculum appears.

This keeps the Whop credentials server-side and does not expose the Company API key to the browser.
