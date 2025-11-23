# Dropshipping Ecommerce Platform

A modern, fast, and professional dropshipping ecommerce website built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Features

### Customer Features
- 🏠 Home page with hero banner, trending products, categories
- 🛍️ Product listing with filters (category, price range, sorting)
- 📦 Product detail pages with images, specs, reviews
- 🛒 Shopping cart with quantity management
- 💳 Checkout with address management and payment integration
- 👤 User account (profile, orders, addresses, wishlist)
- 🔐 Authentication (signup, login, password reset)

### Admin Features
- 📊 Dashboard with sales stats and analytics
- 📦 Product management (CRUD, images, variants, SEO)
- 🗂️ Category management
- 📋 Order management with status updates
- 🎟️ Coupon management
- ⚙️ Store settings

### Technical Features
- ⚡ Next.js 14 with App Router
- 🎨 Tailwind CSS + shadcn/ui components
- 🗄️ Supabase (PostgreSQL + Auth)
- 💰 Razorpay payment integration (mock)
- 🔒 Role-based access control (guest, customer, admin)
- 📱 Fully responsive design
- 🚀 Optimized performance (SSR/SSG)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Payments:** Razorpay
- **Validation:** Zod
- **Forms:** React Hook Form

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── account/           # User account pages
│   ├── admin/             # Admin panel
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   ├── products/          # Product pages
│   └── page.tsx           # Home page
├── components/
│   ├── layout/            # Layout components (header, footer)
│   └── ui/                # Reusable UI components
├── lib/
│   ├── supabase/          # Supabase clients
│   ├── db.ts              # Database helpers
│   ├── utils.ts           # Utility functions
│   └── validations.ts     # Zod schemas
└── types/
    └── index.ts           # TypeScript types
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Razorpay account (for payments)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd dropshipping-ecommerce
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Set up the database

Follow the instructions in `DATABASE.md` to create the required tables in Supabase.

5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

See `DATABASE.md` for detailed database schema and setup instructions.

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
- AWS Amplify
- Self-hosted

## Development

### Adding New Pages

Pages are automatically routed based on the file structure in the `app/` directory.

### Adding New Components

UI components should be added to `components/ui/` and follow the shadcn/ui pattern.

### Database Queries

Use the helper functions in `lib/db.ts` for database operations.

## TODO

- [ ] Implement real Supabase authentication
- [ ] Connect Razorpay payment gateway
- [ ] Add image upload functionality
- [ ] Implement search functionality
- [ ] Add product reviews system
- [ ] Email notifications
- [ ] Order tracking
- [ ] Analytics integration
- [ ] SEO optimization
- [ ] Performance monitoring

## License

MIT
