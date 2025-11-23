# Deployment Checklist

## Pre-Deployment

### 1. Environment Variables
- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Add Supabase URL and keys
- [ ] Add Razorpay keys (production keys, not test)
- [ ] Set strong ADMIN_PASSWORD
- [ ] Update NEXT_PUBLIC_APP_URL to your domain
- [ ] Add Resend API key (if using email)
- [ ] Add Sentry DSN (if using error monitoring)

### 2. Database Setup
- [ ] Run `supabase-schema.sql` in Supabase SQL Editor
- [ ] Create admin user in Supabase Auth
- [ ] Add admin to `admin_users` table
- [ ] Verify all tables created successfully
- [ ] Add your products and categories

### 3. Customization
- [ ] Update store name
- [ ] Change colors/theme
- [ ] Add logo and favicon
- [ ] Update contact information
- [ ] Customize hero section
- [ ] Add social media links

### 4. Content
- [ ] Add products via admin panel
- [ ] Set up categories
- [ ] Create legal pages (privacy, terms, etc.)
- [ ] Test all pages load correctly

### 5. Testing
- [ ] Test product browsing
- [ ] Test add to cart
- [ ] Test checkout flow
- [ ] Test payment (use Razorpay test mode first)
- [ ] Test admin login
- [ ] Test admin product management
- [ ] Test on mobile devices
- [ ] Check all links work

## Deployment to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-repo-url
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables (copy from `.env.local`)
5. Click "Deploy"

### 3. Post-Deployment
- [ ] Update `NEXT_PUBLIC_APP_URL` to your Vercel URL
- [ ] Test the live site thoroughly
- [ ] Set up custom domain (optional)
- [ ] Update Razorpay webhook URLs
- [ ] Enable Vercel Analytics (optional)

## Production Environment Variables

Make sure these are set in Vercel:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
NEXT_PUBLIC_APP_URL=
ADMIN_PASSWORD=
RESEND_API_KEY=
EMAIL_FROM=
ADMIN_EMAIL=
```

## Security Checklist

- [ ] Use strong admin password
- [ ] Enable Supabase RLS policies
- [ ] Use production Razorpay keys
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Set up proper CORS if needed
- [ ] Review all API routes for security
- [ ] Don't commit `.env.local` to git

## Performance Optimization

- [ ] Optimize images (use Next.js Image component)
- [ ] Enable caching where appropriate
- [ ] Test page load speeds
- [ ] Check mobile performance
- [ ] Enable Vercel Analytics

## Monitoring

- [ ] Set up Sentry for error tracking
- [ ] Monitor Supabase usage
- [ ] Check Razorpay dashboard regularly
- [ ] Set up uptime monitoring

## Post-Launch

- [ ] Test complete purchase flow
- [ ] Monitor for errors
- [ ] Check email notifications work
- [ ] Verify payment processing
- [ ] Test admin panel functionality
- [ ] Backup database regularly

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Supabase logs
3. Check browser console for errors
4. Verify all environment variables are set correctly
