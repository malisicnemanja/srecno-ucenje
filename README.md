# Srećno učenje - Franchise Website

A modern, multi-page franchise website for the "Srećno učenje" educational methodology built with Next.js 14, TypeScript, and Tailwind CSS.

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and update values
4. Run development server: `npm run dev`

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Strapi CMS
- SendGrid (email)
- Calendly (scheduling)

## Deployment

Deploy to Vercel:
```bash
vercel --prod
cat > app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply text-gray-900 bg-white;
  }
}
