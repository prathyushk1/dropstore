# Setup Guide

Quick start guide to get your dropshipping ecommerce platform up and running.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- A Supabase account (free tier works)
- A Razorpay account (for payment integration)

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Supabase client
- Zod for validation
- React Hook Form
- Lucide React icons
- shadcn/ui components

## Step 2: Environment Variables

1. Copy the example environment file:
```bash
cp .env.local.example .env.local
```

2. Fill in your credentials in `.env.local`:

```env
# Supabase - Get these from your Supabase project settings
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Razorpay - Get these from Razorpay dashboard
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your-secret-key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 3: Set Up Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and run the SQL commands from `DATABASE.md`
4. This will create all necessary tables:
   - users
   - categories
   - products
   - addresses
   - coupons
   - orders
   - order_items
   - wishlist
   - reviews
   - supplier_products

## Step 4: Enable Supabase Authentication

1. In Supabase dashboard, go to Authentication > Providers
2. Enable Email provider
3. (Optional) Enable other providers like Google, GitHub, etc.
4. Configure email templates if needed

## Step 5: Set Up Row Level Security (RLS)

Run the RLS policies from `DATABASE.md` to secure your database:
- Public can read active products
- Only authenticated users can manage their own data
- Only admins can manage products, categories, orders

## Step 6: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## Step 7: Test the Application

### Customer Flow
1. Browse products on home page
2. Click on a product to view details
3. Add to cart
4. Go to checkout
5. Sign up / Login
6. Complete order

### Admin Flow
1. Navigate to `/admin`
2. View dashboard
3. Manage products, categories, orders, coupons
4. Update settings

## Optional: Seed Database with Sample Data

Create a seed script to populate your database with sample products and categories for testing.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy

Vercel will automatically:
- Build your Next.js app
- Set up serverless functions
- Configure CDN
- Enable automatic deployments on push

### Post-Deployment

1. Update `NEXT_PUBLIC_APP_URL` in environment variables
2. Configure custom domain (optional)
3. Set up Supabase production database
4. Switch Razorpay to live mode (when ready)

## Troubleshooting

### Build Errors
- Make sure all dependencies are installed: `npm install`
- Check Node.js version: `node -v` (should be 18+)
- Clear cache: `rm -rf .next` and rebuild

### Supabase Connection Issues
- Verify environment variables are correct
- Check Supabase project is active
- Ensure RLS policies are set up correctly

### TypeScript Errors
- Run `npm run build` to see all errors
- Check `tsconfig.json` is properly configured
- Ensure all types are imported correctly

## Next Steps

1. **Customize Design**: Update colors, fonts, and styling in `tailwind.config.ts`
2. **Add Real Products**: Use admin panel to add your products
3. **Configure Payments**: Set up Razorpay webhook for payment confirmations
4. **Email Notifications**: Set up email service for order confirmations
5. **Analytics**: Add Google Analytics or similar
6. **SEO**: Update metadata in each page
7. **Performance**: Optimize images, enable caching

## Support

For issues or questions:
- Check `README.md` for project overview
- Review `DATABASE.md` for schema details
- Check Next.js docs: https://nextjs.org/docs
- Check Supabase docs: https://supabase.com/docs
