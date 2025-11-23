# Quick Setup Guide

## Prerequisites
- Node.js 18+ installed
- A Supabase account (free tier available)
- A Razorpay account (for payments)

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Configure Environment Variables
1. Copy `.env.local.example` to `.env.local`
2. Fill in your credentials:
   - Supabase URL and keys (from Supabase dashboard)
   - Razorpay keys (from Razorpay dashboard)
   - Set a secure admin password

## Step 3: Setup Database
1. Go to your Supabase project
2. Navigate to SQL Editor
3. Run the SQL from `supabase-schema.sql`
4. (Optional) Run `sample-data.sql` for test products

## Step 4: Run Development Server
```bash
npm run dev
```
Visit http://localhost:3000

## Step 5: Access Admin Panel
- URL: http://localhost:3000/admin/login
- Password: The one you set in `.env.local`

## Step 6: Customize Your Store
1. Update branding in `components/layout/header.tsx` and `footer.tsx`
2. Change colors in `tailwind.config.ts`
3. Add your products via admin panel
4. Update contact information in footer

## Deployment
See `README.md` for deployment instructions.

## Need Help?
Check the README.md for detailed documentation.
