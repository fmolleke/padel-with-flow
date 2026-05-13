# Padel With Flow

Personal website for Florian Molleker, certified DPV C-level padel coach based in Osnabrück and Ibbenbüren, Germany.

## What it does

- Presents training offers (individual, duo, small group) with pricing
- Lists open training sessions that visitors can register for directly on the site
- Sends confirmation emails on registration and cancellation
- Available in German and English

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- [Supabase](https://supabase.com) — database for training sessions and registrations
- [Resend](https://resend.com) — transactional email
- [next-intl](https://next-intl-docs.vercel.app) — i18n (DE / EN)
- Deployed on [Netlify](https://netlify.com)

## Local development

```bash
npm install
npm run dev
```

Copy `.env.local.example` to `.env.local` and fill in your Supabase and Resend credentials.

## Testing

```bash
npm test
```

Tests run automatically before each Netlify build — a failing test prevents deployment.
