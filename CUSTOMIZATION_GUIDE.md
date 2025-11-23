# Customization Guide

This guide will help you customize the store to match your brand.

## 1. Branding

### Store Name
Update in these files:
- `components/layout/header.tsx` - Line 30: Change "ShopDrop" to your store name
- `components/layout/footer.tsx` - Line 13: Change "ShopDrop" to your store name
- `package.json` - Line 2: Update the name field

### Logo
- Replace the gradient circle with your logo in `components/layout/header.tsx`
- Update the favicon in `app/favicon.ico`

## 2. Colors & Theme

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    DEFAULT: "hsl(262.1 83.3% 57.8%)", // Change this
    // ... other shades
  }
}
```

Common color schemes:
- Purple (current): `hsl(262.1 83.3% 57.8%)`
- Blue: `hsl(221.2 83.2% 53.3%)`
- Green: `hsl(142.1 76.2% 36.3%)`
- Red: `hsl(346.8 77.2% 49.8%)`

## 3. Contact Information

Update `components/layout/footer.tsx`:
- Line 82-84: Address
- Line 87-89: Phone number
- Line 92-94: Email address

## 4. Hero Section

Edit `app/(shop)/client-home-page.tsx`:
- Lines 45-67: Update hero carousel slides
- Change images, titles, and subtitles

## 5. Top Banner

Edit `components/layout/header.tsx`:
- Line 13: Update promotional message

## 6. Payment Gateway

### Razorpay
Update in `.env.local`:
```
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

Also update in `app/(shop)/checkout/page.tsx`:
- Line 73: Change "MyShop Premium" to your store name

## 7. Email Settings

Update in `.env.local`:
```
EMAIL_FROM=Your Store <noreply@yourdomain.com>
ADMIN_EMAIL=admin@yourdomain.com
```

## 8. SEO & Metadata

Edit `app/layout.tsx`:
- Update site title
- Update description
- Add your domain

## 9. Social Media Links

Update `components/layout/footer.tsx`:
- Lines 17-32: Add your social media URLs

## 10. Categories

Add your own categories through:
- Admin panel: `/admin/categories`
- Or directly in Supabase

## 11. Products

Add products through:
- Admin panel: `/admin/products`
- Or import via SQL

## 12. Policies & Legal Pages

Create these pages in `app/(shop)/`:
- `privacy/page.tsx` - Privacy Policy
- `terms/page.tsx` - Terms of Service
- `shipping/page.tsx` - Shipping Policy
- `faq/page.tsx` - FAQ
- `contact/page.tsx` - Contact Us

## Quick Customization Checklist

- [ ] Change store name in header and footer
- [ ] Update colors in tailwind.config.ts
- [ ] Add your logo
- [ ] Update contact information
- [ ] Configure payment gateway
- [ ] Set up email service
- [ ] Add your products and categories
- [ ] Update hero section images
- [ ] Add social media links
- [ ] Create legal pages
- [ ] Test checkout flow
- [ ] Update SEO metadata

## Need Help?

Refer to the component files - they're well-commented and easy to understand!
