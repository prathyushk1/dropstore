# Quick Start Guide

Get your dropshipping store running in 5 steps!

## Step 1: Install Node.js ⚡

**You need to do this first!**

1. Go to: https://nodejs.org/
2. Download the **LTS version** (recommended)
3. Run the installer
4. Restart your terminal/PowerShell

Verify installation:
```powershell
node --version
npm --version
```

> 📖 Detailed instructions: See `INSTALL_NODEJS.md`

## Step 2: Install Dependencies 📦

Open PowerShell in your project folder and run:

```powershell
npm install
```

This will take 5-10 minutes. It's downloading all the packages needed.

## Step 3: Start Development Server 🚀

```powershell
npm run dev
```

Open your browser to: **http://localhost:3000**

🎉 **Your store is now running!**

## What You'll See

### Customer Pages
- **Home** (`/`) - Hero, categories, trending products
- **Products** (`/products`) - Product listing with filters
- **Product Detail** (`/products/1`) - Individual product page
- **Cart** (`/cart`) - Shopping cart
- **Checkout** (`/checkout`) - Checkout flow
- **Account** (`/account`) - User dashboard
- **Login** (`/auth/login`) - Sign in page
- **Signup** (`/auth/signup`) - Create account

### Admin Panel
- **Dashboard** (`/admin`) - Analytics and stats
- **Products** (`/admin/products`) - Manage products
- **Categories** (`/admin/categories`) - Manage categories
- **Orders** (`/admin/orders`) - View orders
- **Coupons** (`/admin/coupons`) - Discount codes
- **Settings** (`/admin/settings`) - Store settings

## Current Status

✅ **All UI is complete and working**
✅ **Using dummy data for now**
⏳ **Database connection needed** (see Step 4)

## Step 4: Connect Database (Optional for now)

To connect real data, you need to:

1. **Create Supabase Account**
   - Go to: https://supabase.com
   - Create a free project

2. **Set up Database**
   - Copy SQL from `DATABASE.md`
   - Run in Supabase SQL Editor

3. **Add Environment Variables**
   ```powershell
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your Supabase credentials

4. **Restart dev server**
   ```powershell
   npm run dev
   ```

> 📖 Detailed instructions: See `SETUP.md`

## Step 5: Customize Your Store 🎨

### Change Store Name
Search and replace "ShopDrop" with your store name

### Update Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    DEFAULT: '#your-color',
    // ...
  }
}
```

### Add Your Logo
1. Add logo to `public/logo.png`
2. Update `components/layout/header.tsx`

### Add Real Products
Use the admin panel at `/admin/products` (after database setup)

## Common Commands

```powershell
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Troubleshooting

### "npm is not recognized"
- Node.js is not installed or not in PATH
- See `INSTALL_NODEJS.md`

### Port 3000 already in use
```powershell
# Use a different port
npm run dev -- -p 3001
```

### Changes not showing
- Hard refresh: `Ctrl + Shift + R`
- Clear cache
- Restart dev server

### TypeScript errors
- Run: `npm install`
- Restart VS Code
- Check `tsconfig.json`

## Project Structure

```
myshop/
├── app/
│   ├── (shop)/          # Customer-facing pages
│   │   ├── page.tsx     # Home page
│   │   ├── products/    # Product pages
│   │   ├── cart/        # Cart page
│   │   ├── checkout/    # Checkout
│   │   ├── account/     # User account
│   │   └── auth/        # Login/Signup
│   ├── admin/           # Admin panel
│   └── layout.tsx       # Root layout
├── components/
│   ├── layout/          # Header, Footer
│   └── ui/              # Reusable components
├── lib/
│   ├── supabase/        # Database clients
│   ├── db.ts            # Database helpers
│   └── validations.ts   # Form validation
├── types/
│   └── index.ts         # TypeScript types
└── public/              # Static files
```

## Next Steps

1. ✅ **Install Node.js** (if not done)
2. ✅ **Run `npm install`**
3. ✅ **Start dev server** (`npm run dev`)
4. ⏳ **Browse the site** (http://localhost:3000)
5. ⏳ **Set up Supabase** (when ready)
6. ⏳ **Add real products**
7. ⏳ **Deploy to Vercel**

## Resources

- 📖 **Full Setup**: `SETUP.md`
- 🗄️ **Database**: `DATABASE.md`
- 📊 **Project Status**: `PROJECT_STATUS.md`
- 💻 **Node.js Install**: `INSTALL_NODEJS.md`

## Need Help?

1. Check the documentation files
2. Review error messages
3. Ensure Node.js is installed
4. Verify all dependencies installed
5. Check environment variables

## What's Working Right Now

Even without database setup, you can:
- ✅ Browse all pages
- ✅ See the UI and design
- ✅ Test navigation
- ✅ View dummy products
- ✅ Test cart functionality (client-side)
- ✅ Explore admin panel
- ✅ Customize styling

## Ready to Launch?

When you're ready for production:
1. Set up Supabase database
2. Configure Razorpay payments
3. Add real products
4. Test thoroughly
5. Deploy to Vercel
6. Connect custom domain

---

**You're all set! Start with `npm install` and `npm run dev`** 🚀
