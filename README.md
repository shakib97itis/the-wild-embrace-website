# The Wild Embrace

The Wild Embrace is a luxury cabin booking website built with Next.js App Router. It combines a polished hospitality-style storefront with authenticated guest flows for browsing cabins, checking availability, creating reservations, and managing bookings through a protected account area.

## Highlights

- Immersive landing and about pages tailored to a mountain-retreat brand
- Cabin catalog with guest-capacity filtering
- Individual cabin pages with pricing, availability, and reservation flow
- Google sign-in powered by NextAuth
- Protected guest dashboard for profile updates and reservation management
- Supabase-backed data layer for cabins, guests, bookings, settings, and hosted images
- Server Actions for creating, editing, and deleting reservations

## Tech Stack

- Next.js 14 with the App Router
- React 18
- Tailwind CSS
- NextAuth v5 beta with Google authentication
- Supabase for data access and image storage
- `date-fns` for reservation and calendar date logic
- Heroicons for UI icons
- Rest Countries API for nationality selection in the profile form

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- A Supabase project with the required tables and storage objects
- Google OAuth credentials for guest sign-in

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root and provide the following values:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_or_service_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

These variables are required for:

- connecting the app to Supabase
- loading cabin, booking, guest, and settings data
- enabling Google authentication through NextAuth

The current code expects Supabase resources for:

- `cabins`
- `guests`
- `bookings`
- `settings`
- public cabin images stored in Supabase Storage

If you enable Google sign-in locally, make sure your OAuth app is configured to allow the NextAuth callback route for your local environment.

### Run the Project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the local development server |
| `npm run build` | Creates an optimized production build |
| `npm run start` | Runs the production build locally |
| `npm run lint` | Runs the Next.js ESLint checks |

## Route Overview

| Route | Purpose | Access |
| --- | --- | --- |
| `/` | Landing page and primary entry point | Public |
| `/about` | Brand and story page | Public |
| `/cabins` | Cabin listing with capacity filter | Public |
| `/cabins/[cabinId]` | Cabin details, pricing, and reservation UI | Public |
| `/cabins/thanks` | Reservation confirmation screen | Public |
| `/login` | Google sign-in page | Public |
| `/account` | Guest dashboard landing page | Protected |
| `/account/profile` | Profile update form | Protected |
| `/account/reservations` | Reservation list | Protected |
| `/account/reservations/edit/[reservationId]` | Reservation edit form | Protected |
| `/api/auth/[...nextauth]` | NextAuth handlers | Internal/auth |
| `/api/cabins/[cabinId]` | Cabin details and booked-date JSON response | Internal/app |

## Implementation Notes

- The app uses `middleware.js` to protect all `/account` routes.
- Reservation creation, reservation updates, reservation deletion, and guest profile updates are handled with Server Actions.
- Cabin detail pages are generated from Supabase cabin records through `generateStaticParams`.
- Remote images are configured for Supabase Storage and Google profile avatars in `next.config.mjs`.

## Verification

The current project setup has been validated with:

```bash
npm run lint
npm run build
```

## Known Considerations

- Installing `sharp` in production can improve Next.js image optimization performance.
- Because authentication is enforced through middleware, changes to the auth or Supabase integration should be checked for Edge Runtime compatibility.
- Some in-app copy still references the older name `The Wild Oasis`; this README standardizes on `The Wild Embrace`.
