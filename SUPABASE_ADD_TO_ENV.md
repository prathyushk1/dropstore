# 🔐 Add Supabase Keys to Your Project

Step-by-step guide to add your Supabase credentials to the project.

---

## 📍 What You Need

Make sure you have these THREE things from Supabase:
1. ✅ Project URL
2. ✅ anon public key  
3. ✅ service_role key

**Don't have them yet?** See **SUPABASE_GET_API_KEYS.md**

---

## 📍 Step 1: Create .env.local File

### Option A: Using File Explorer (Windows)

1. Open your project folder: `C:\myshop`
2. Right-click in the empty space
3. Select **New → Text Document**
4. Name it: `.env.local` (yes, with the dot at the start!)
5. Windows might warn you - click "Yes" to confirm

**Important:** Make sure it's `.env.local` NOT `.env.local.txt`

### Option B: Using Command Prompt

1. Open Command Prompt in your project folder
2. Run this command:
```cmd
type nul > .env.local
```

### Option C: Using PowerShell

1. Open PowerShell in your project folder
2. Run this command:
```powershell
New-Item -Path .env.local -ItemType File
```

---

## 📍 Step 2: Open .env.local File

1. Find the `.env.local` file in your project folder
2. Right-click on it
3. Select **Open with → Notepad** (or your favorite text editor)

---

## 📍 Step 3: Add Your Credentials

Copy this template and paste it into `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=YOUR_PROJECT_URL_HERE
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE

# Razorpay (leave these for now)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your-secret-key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📍 Step 4: Replace with Your Keys

Now replace the placeholder text with your actual keys:

### Before (template):
```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_PROJECT_URL_HERE
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE
```

### After (with your keys):
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjc1ODQwMCwiZXhwIjoxOTQ4MzM0NDAwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjMyNzU4NDAwLCJleHAiOjE5NDgzMzQ0MDB9.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
```

---

## 📍 Step 5: Save the File

1. Click **File → Save** (or press Ctrl+S)
2. Close the text editor
3. The file is now ready!

---

## ✅ Your Final .env.local Should Look Like This:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjMyNzU4NDAwLCJleHAiOjE5NDgzMzQ0MDB9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE2MzI3NTg0MDAsImV4cCI6MTk0ODMzNDQwMH0.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy

# Razorpay (leave these for now)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your-secret-key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## ⚠️ Important Rules

### DO:
- ✅ Keep the file named `.env.local`
- ✅ Put it in the root of your project (C:\myshop)
- ✅ Use the FULL keys (don't cut them short)
- ✅ Keep the `=` sign with no spaces around it
- ✅ Save the file after editing

### DON'T:
- ❌ Don't add spaces before or after the `=`
- ❌ Don't add quotes around the values
- ❌ Don't commit this file to GitHub
- ❌ Don't share your service_role key
- ❌ Don't rename the file

---

## 🔍 Common Mistakes

### ❌ Wrong:
```env
NEXT_PUBLIC_SUPABASE_URL = https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGci..."
SUPABASE_SERVICE_ROLE_KEY = "eyJhbGci..."
```

### ✅ Correct:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

---

## 📍 Step 6: Verify File Location

Your project structure should look like this:

```
C:\myshop\
├── .env.local          ← Your new file (HERE!)
├── .env.local.example  ← Template file
├── .gitignore          ← Contains .env.local (good!)
├── app/
├── components/
├── lib/
├── package.json
└── ...
```

---

## 📍 Step 7: Restart Dev Server

**Important:** You MUST restart the server for changes to take effect!

1. Go to your terminal/PowerShell where the server is running
2. Press **Ctrl+C** to stop the server
3. Start it again:
```bash
npm run dev
```

Or double-click `start-dev.bat`

---

## 🧪 Step 8: Test the Connection

1. Make sure your dev server is running
2. Open your browser
3. Go to: **http://localhost:3000/test-db**
4. You should see:
   - ✅ "Connected to Supabase!"
   - ✅ Environment variables showing as "Set"
   - ✅ No error messages

---

## ✅ Success Indicators

You'll know it's working when:

1. **No errors in terminal** when starting server
2. **Test page shows "Connected"** at http://localhost:3000/test-db
3. **Environment variables are "Set"** in test page
4. **No "Missing credentials" errors** in browser console

---

## 🆘 Troubleshooting

### "Cannot find module" error
**Solution:** Restart the dev server (Ctrl+C, then `npm run dev`)

### "Invalid API key" error
**Solution:** 
- Check for extra spaces in `.env.local`
- Make sure you copied the FULL key
- Verify the key starts with `eyJ`

### "Environment variables not set"
**Solution:**
- Make sure file is named `.env.local` (not `.env.local.txt`)
- File must be in project root (C:\myshop)
- Restart dev server

### Keys not working
**Solution:**
- Copy keys again from Supabase
- Make sure no spaces before/after `=`
- No quotes around values
- Save the file
- Restart server

---

## 🔐 Security Checklist

- [ ] `.env.local` file created
- [ ] All three keys added
- [ ] File saved
- [ ] Dev server restarted
- [ ] Connection tested
- [ ] File is in `.gitignore` (already done!)
- [ ] Not shared publicly

---

## 🎯 What's Next?

Once your connection is working:

1. ✅ **Create database tables** - See SUPABASE_SETUP_GUIDE.md
2. ✅ **Add sample data** - Test with real data
3. ✅ **Implement authentication** - User login/signup
4. ✅ **Connect products** - Real product data
5. ✅ **Build features** - Cart, orders, etc.

---

## 📝 Quick Reference

### File Location:
```
C:\myshop\.env.local
```

### File Content Template:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your-secret-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Test URL:
```
http://localhost:3000/test-db
```

---

**Done? Great! Now test your connection at http://localhost:3000/test-db** 🚀

**Next:** Create database tables - See **SUPABASE_SETUP_GUIDE.md** (Step 5)
