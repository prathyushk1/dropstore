# 🚀 Deploy to Vercel

Complete guide to deploy your dropshipping store to production!

---

## ✅ Prerequisites

- [x] Vercel CLI installed (`npm install -g vercel`)
- [x] Project working locally
- [x] Supabase connected
- [ ] GitHub account (recommended)
- [ ] Vercel account (free)

---

## 🎯 Deployment Options

### Option 1: Deploy with Vercel CLI (Quick)
Fast deployment directly from your computer.

### Option 2: Deploy with GitHub (Recommended)
Automatic deployments on every push.

---

## 🚀 Option 1: Deploy with Vercel CLI

### Step 1: Login to Vercel
```bash
vercel login
```

This will:
1. Open your browser
2. Ask you to sign in/sign up
3. Authenticate your CLI

### Step 2: Deploy
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → dropshipping-store (or your choice)
- **Directory?** → ./ (press Enter)
- **Override settings?** → No

### Step 3: Add Environment Variables

After deployment, add your Supabase credentials:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

For each one:
1. Paste the value from your `.env.local`
2. Select: **Production, Preview, Development**
3. Press Enter

### Step 4: Redeploy with Environment Variables
```bash
vercel --prod
```

---

## 🚀 Option 2: Deploy with GitHub (Recommended)

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `dropshipping-store`
3. Make it **Private** (recommended)
4. Click **Create repository**

### Step 2: Initialize Git (if not done)

```bash
git init
git add .
git commit -m "Initial commit"
```

### Step 3: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/dropshipping-store.git
git branch -M main
git push -u origin main
```

### Step 4: Connect to Vercel

1. Go to https://vercel.com
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your `dropshipping-store` repository
5. Click **"Import"**

### Step 5: Configure Project

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** ./

**Build Command:** `npm run build` (default)

**Output Directory:** `.next` (default)

### Step 6: Add Environment Variables

In Vercel dashboard:
1. Click **"Environment Variables"**
2. Add these three variables:

```
NEXT_PUBLIC_SUPABASE_URL = https://etykexzzvkktinbiqxrf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = sb_publishable_R0lALc2o9w6bXN99oSeWxg_bNcEiO9Y
SUPABASE_SERVICE_ROLE_KEY = sb_secret_fG-XPZqOxvLpFZWLpm6f0A_rHbjIXHY
```

**Important:** Select all three environments:
- ✅ Production
- ✅ Preview
- ✅ Development

### Step 7: Deploy

Click **"Deploy"**

Vercel will:
1. Build your project
2. Deploy to production
3. Give you a live URL

---

## 🎯 Quick Deploy Commands

### First Time Deploy:
```bash
vercel
```

### Deploy to Production:
```bash
vercel --prod
```

### Check Deployment Status:
```bash
vercel ls
```

### View Logs:
```bash
vercel logs
```

---

## 📝 Before Deploying Checklist

- [ ] `.env.local` has correct Supabase credentials
- [ ] `.env.local` is in `.gitignore` (already done!)
- [ ] Project builds successfully (`npm run build`)
- [ ] No TypeScript errors
- [ ] Supabase database tables created
- [ ] Test page works locally

---

## 🧪 Test Build Locally

Before deploying, test if your project builds:

```bash
npm run build
```

If successful, you'll see:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

---

## 🌐 After Deployment

### Your URLs:
- **Production:** `https://your-project.vercel.app`
- **Preview:** `https://your-project-git-branch.vercel.app`

### Update Supabase Settings:

1. Go to Supabase Dashboard
2. Settings → API
3. Add your Vercel URL to allowed origins

### Test Your Live Site:
- Visit your Vercel URL
- Test all pages
- Check API endpoints
- Verify Supabase connection

---

## 🔧 Common Issues

### Build Fails
**Solution:** Run `npm run build` locally to see errors

### Environment Variables Not Working
**Solution:** 
- Check they're added in Vercel dashboard
- Redeploy after adding variables
- Make sure names match exactly

### Supabase Connection Fails
**Solution:**
- Verify environment variables are correct
- Check Supabase allows your Vercel domain
- Test with `/test-db` page

### Images Not Loading
**Solution:**
- Check `next.config.js` has correct image domains
- Verify image URLs are accessible

---

## 🎯 Deployment Workflow

### For Future Updates:

**With GitHub:**
1. Make changes locally
2. `git add .`
3. `git commit -m "Your message"`
4. `git push`
5. Vercel auto-deploys!

**With CLI:**
1. Make changes locally
2. `vercel --prod`
3. Done!

---

## 📊 Vercel Dashboard Features

### What You Can Do:
- View deployment logs
- Monitor performance
- Set up custom domains
- Configure environment variables
- View analytics
- Set up preview deployments

---

## 🌍 Custom Domain (Optional)

### Add Your Own Domain:

1. Go to Vercel Dashboard
2. Select your project
3. Click **"Domains"**
4. Add your domain
5. Update DNS records
6. Wait for verification

---

## 🔐 Security Checklist

- [ ] `.env.local` not committed to Git
- [ ] Service role key only in environment variables
- [ ] Supabase RLS policies enabled
- [ ] API routes have authentication
- [ ] CORS configured properly

---

## 💰 Vercel Pricing

**Free Tier Includes:**
- Unlimited deployments
- 100 GB bandwidth/month
- Automatic HTTPS
- Preview deployments
- Analytics

**Perfect for starting!**

---

## 🎉 Success Indicators

Your deployment is successful when:
- ✅ Build completes without errors
- ✅ Site loads at Vercel URL
- ✅ All pages work
- ✅ API endpoints respond
- ✅ Supabase connection works
- ✅ No console errors

---

## 📞 Need Help?

### Vercel Resources:
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support
- Community: https://github.com/vercel/vercel/discussions

### Common Commands:
```bash
vercel --help          # Show all commands
vercel login           # Login to Vercel
vercel logout          # Logout
vercel ls              # List deployments
vercel logs            # View logs
vercel env ls          # List environment variables
vercel domains         # Manage domains
vercel --prod          # Deploy to production
```

---

## 🚀 Ready to Deploy?

### Quick Start:
```bash
# Login
vercel login

# Deploy
vercel

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY

# Deploy to production
vercel --prod
```

---

**Your store will be live in minutes!** 🎊

**Start with:** `vercel login` 🚀
