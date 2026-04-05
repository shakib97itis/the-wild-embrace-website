# The Wild Embrace

<p align="center">A luxury cabin booking experience built with Next.js, Supabase, and NextAuth.</p>

<p align="center">
  <img alt="Next.js 14" src="https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white">
  <img alt="React 18" src="https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white">
  <img alt="Tailwind CSS 3" src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white">
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-Backend-3FCF8E?logo=supabase&logoColor=white">
  <img alt="NextAuth" src="https://img.shields.io/badge/NextAuth-Google_Sign--In-8B5CF6">
</p>

<p align="center">
  <a href="https://the-wild-embrace.vercel.app">Live Demo</a>
  |
  <a href="https://github.com/shakib97itis/the-wild-embrace-website">Source Code</a>
  |
  <a href="#tech-stack">Tech Stack</a>
  |
  <a href="#getting-started">Getting Started</a>
</p>

## Overview

The Wild Embrace is a hospitality-style booking application for a fictional mountain retreat in the Italian Dolomites. It combines a polished marketing site with authenticated guest workflows for browsing cabins, selecting travel dates, creating reservations, and managing bookings from a protected account area.

## Feature Highlights

- Browse a curated cabin catalog with guest-capacity filtering
- Open detailed cabin pages with pricing, availability, and stay information
- Select travel dates with an interactive booking calendar
- Sign in with Google and create reservations through Server Actions
- Update guest profile data and manage reservations inside a protected dashboard
- Load application data and hosted cabin images from Supabase

## Core Pages

| Page | Purpose |
| --- | --- |
| `/` | Branded landing page and primary entry point |
| `/about` | Storytelling page for the retreat and brand |
| `/cabins` | Cabin listing with capacity filters |
| `/cabins/[cabinId]` | Cabin details, booking calendar, and reservation form |
| `/login` | Google sign-in flow |
| `/account` | Guest dashboard home |
| `/account/profile` | Guest profile update form |
| `/account/reservations` | Reservation list and reservation management |

## Tech Stack

- **Frontend:** Next.js 14 App Router, React 18, Tailwind CSS, Heroicons
- **Booking UX:** `react-day-picker`, `date-fns`
- **Authentication:** NextAuth v5 beta with Google provider
- **Data Layer:** Supabase for cabins, guests, bookings, settings, and hosted images
- **External Service:** Rest Countries API for nationality selection in the guest profile flow

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A Supabase project with the expected tables and storage objects
- Google OAuth credentials for sign-in

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root with:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_or_service_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

The app currently expects Supabase resources for `cabins`, `guests`, `bookings`, `settings`, and public cabin images stored in Supabase Storage.

If you enable Google sign-in locally, make sure your OAuth app allows the NextAuth callback URL for your local environment.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create the production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Run Next.js ESLint checks |

## Architecture Notes

- The project uses the Next.js App Router for public pages and guest account flows.
- `middleware.js` protects all routes under `/account`.
- Server Actions handle reservation creation, updates, deletion, and guest profile updates.
- Cabin detail pages are generated from Supabase records with `generateStaticParams`.
- Remote images are configured for Supabase Storage and Google profile avatars.

## Verification

The current repository has been validated with:

```bash
npm run lint
npm run build
```

## Project Notes

- Installing `sharp` in production can improve Next.js image optimization performance.
- Because authentication is enforced through middleware, auth or Supabase integration changes should be checked for Edge Runtime compatibility.
- Some in-app copy still references the older name `The Wild Oasis`; this README standardizes on `The Wild Embrace`.
