# E-Commerce Store - Next.js 14

A modern, full-featured e-commerce platform built with Next.js 14, Supabase, and Tailwind CSS.

## Features

- 🛍️ Complete e-commerce functionality
- 🎨 Modern, responsive design
- 🔐 Secure authentication with Supabase
- 💳 Payment integration with Razorpay
- 📦 Product management
- 🛒 Shopping cart & wishlist
- 📱 Mobile-responsive
- ⚡ Fast performance with Next.js 14
- 🎯 Admin dashboard for store management

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Payments:** Razorpay
- **Email:** Resend
- **Animations:** Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account
- Razorpay account (for payments)

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd myshop
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase credentials
   - Add your Razorpay keys
   - Configure other settings

4. Set up the database
   - Go to your Supabase project
   - Run the SQL from `supabase-schema.sql` in the SQL Editor
   - Optionally run `sample-data.sql` for test data

5. Run the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Configuration

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Add them to `.env.local`
4. Run the database schema from `supabase-schema.sql`

### Admin Access

- Default admin route: `/admin/login`
- Set your admin password in `.env.local` as `ADMIN_PASSWORD`

### Payment Setup

1. Sign up at [razorpay.com](https://razorpay.com)
2. Get your API keys from the dashboard
3. Add them to `.env.local`

## Customization

### Branding

- Update the store name in `components/layout/header.tsx` and `components/layout/footer.tsx`
- Change colors in `tailwind.config.ts`
- Update logo and favicon in the `public` folder

### Content

- Update footer contact information in `components/layout/footer.tsx`
- Customize hero slides in `app/(shop)/client-home-page.tsx`
- Add your products through the admin panel or database

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS
- DigitalOcean

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (shop)/            # Customer-facing pages
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── shop/             # Shop-specific components
│   └── ui/               # UI components
├── lib/                   # Utility functions
│   ├── db.ts             # Database helpers
│   └── supabase/         # Supabase client
└── types/                 # TypeScript types
```

## Support

For issues or questions, please open an issue in the repository.

## License

This project is licensed under the MIT License.
