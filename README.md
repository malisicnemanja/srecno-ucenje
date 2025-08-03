# Srećno učenje - Franchise Website

A modern, multi-page franchise website for the "Srećno učenje" educational methodology built with Next.js 14, TypeScript, and Tailwind CSS.

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.local.example` to `.env.local` and update values
4. **Configure API Keys:** See [API Keys Setup Guide](./docs/API_KEYS_SETUP.md)
5. Run development server: `npm run dev`

## 🔐 API Keys Management

This project uses a secure API key management system:

- **Production:** API keys are managed through Sanity CMS
- **Development:** Fallback to environment variables
- **Security:** No API keys are bundled in client code
- **Write Operations:** All Sanity write operations go through secure API routes

**Setup Steps:**
1. Add API keys through Sanity Studio → Site Settings → API Keys
2. For local development, set environment variables in `.env.local`
3. See full guide: [`docs/API_KEYS_SETUP.md`](./docs/API_KEYS_SETUP.md)

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, React 18
- **Styling:** Tailwind CSS, Framer Motion
- **CMS:** Sanity v3
- **Data Fetching:** React Query (TanStack Query)
- **Forms:** React Hook Form with Zod validation
- **PDF Generation:** @react-pdf/renderer
- **Charts:** Chart.js with react-chartjs-2
- **Maps:** Google Maps API, Mapbox GL
- **3D Graphics:** Three.js with React Three Fiber
- **Internationalization:** next-intl

## Project Structure

```
├── app/                # Next.js 14 app directory
├── components/         # React components
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries and helpers
├── public/            # Static assets
├── sanity/            # Sanity CMS configuration
└── scripts/           # Build and utility scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run check-images` - Verify all images exist in Sanity

## Security Features

- Secure API routes for all write operations
- Rate limiting on API endpoints
- Security headers (CSP, X-Frame-Options, etc.)
- No exposed API tokens in client code
- Environment variables validation

## Deployment

Deploy to Vercel:
```bash
vercel --prod
```

## Environment Variables

Required environment variables:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Optional - Development only
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
```

## License

Private project - All rights reserved