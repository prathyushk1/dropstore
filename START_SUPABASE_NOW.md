# 🚀 Start Supabase Setup NOW

Quick guide to get started immediately!

---

## 📱 Open These Links:

### 1. Supabase Website
**Open in browser:** https://supabase.com

**What to do:**
- Click "Start your project"
- Sign up with GitHub (fastest) or Email
- Verify your email

---

## ⚡ Quick Setup (5 Steps)

### Step 1: Create Project (5 min)
1. Go to https://supabase.com
2. Sign up / Log in
3. Click "New Project"
4. Fill in:
   - Name: `dropshipping-store`
   - Password: (create strong password - SAVE IT!)
   - Region: Choose closest to you
   - Plan: Free
5. Click "Create new project"
6. Wait 1-2 minutes

### Step 2: Get API Keys (2 min)
1. Click "Settings" (gear icon)
2. Click "API"
3. Copy these THREE things:
   - Project URL
   - anon public key
   - service_role key
4. Save them in a text file

### Step 3: Add to .env.local (3 min)
1. Create file `.env.local` in your project folder
2. Paste this and replace with YOUR keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your-secret-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. Save the file

### Step 4: Create Database Tables (10 min)
1. In Supabase, click "SQL Editor"
2. Click "New query"
3. Open `SUPABASE_SETUP_GUIDE.md`
4. Copy each SQL script (Scripts 1-6)
5. Paste and click "Run" for each
6. Verify tables in "Table Editor"

### Step 5: Test Connection (2 min)
1. Restart your dev server:
   ```bash
   npm run dev
   ```
2. Open: http://localhost:3000/test-db
3. Check if all tests pass ✅

---

## 📋 Use the Checklist

Open `SUPABASE_CHECKLIST.md` and check off each step as you complete it!

---

## 📖 Need Detailed Instructions?

Open `SUPABASE_SETUP_GUIDE.md` for step-by-step guide with screenshots descriptions.

---

## ⏱️ Total Time: ~25 minutes

- Create account: 5 min
- Get keys: 2 min
- Environment setup: 3 min
- Database tables: 10 min
- Test: 2 min
- Buffer: 3 min

---

## 🆘 Stuck?

### Can't create account?
- Try different browser
- Use GitHub signup (easiest)
- Check email for verification

### Can't find API keys?
- Settings → API
- Scroll down to "Project API keys"
- Copy the full keys (they're long!)

### Tables not creating?
- Make sure you click "Run" for each script
- Check for error messages in SQL Editor
- Run scripts in order (1, 2, 3, 4, 5, 6)

### Connection test failing?
- Check .env.local has correct keys
- Restart dev server
- Verify no extra spaces in keys

---

## ✅ Success Checklist

You're done when:
- [ ] Supabase project created
- [ ] API keys copied
- [ ] .env.local file created
- [ ] All database tables visible in Table Editor
- [ ] Test page shows "Connected!" at http://localhost:3000/test-db

---

## 🎯 After Setup

Once Supabase is working:
1. I'll help you implement authentication
2. Connect products to database
3. Make cart work with real data
4. Build checkout flow

---

**Ready? Start with Step 1: Go to https://supabase.com** 🚀

**Questions? Just ask me!** 💬
