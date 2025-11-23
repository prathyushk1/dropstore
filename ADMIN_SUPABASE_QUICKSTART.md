# 🚀 Admin Access - Supabase Quickstart

## You Have 2 Options:

### ⚡ Option 1: FASTEST (Use Right Now!)

**Current simple password login:**

1. Go to: `https://your-site.vercel.app/admin/login`
2. Password: `admin123` (default)
3. Done! ✅

**To change password:**
- Add to Vercel environment variables: `ADMIN_PASSWORD=YourPassword`

---

### 🎯 Option 2: BETTER (Supabase Auth)

**Multiple admins, more secure:**

#### Quick Setup (5 minutes):

1. **Go to Supabase Dashboard**
   - https://supabase.com/dashboard
   - Your project → SQL Editor

2. **Run this SQL:**
```sql
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
```

3. **Create Admin User:**
   - Go to: Authentication → Users → Add User
   - Email: `your-email@example.com`
   - Password: `YourPassword123!`
   - ✅ Auto Confirm User
   - Click "Create User"
   - **Copy the User ID**

4. **Add to Admin Table:**
```sql
INSERT INTO admin_users (user_id, email, role)
VALUES (
  'PASTE_USER_ID_HERE',
  'your-email@example.com',
  'admin'
);
```

5. **Login:**
   - Go to: `https://your-site.vercel.app/admin/login-supabase`
   - Enter your email and password
   - Done! ✅

---

## 🎯 Which Should You Use?

### Use Option 1 (Simple) If:
- ✅ You need access RIGHT NOW
- ✅ You're the only admin
- ✅ You want quick setup

### Use Option 2 (Supabase) If:
- ✅ Multiple people need admin access
- ✅ You want better security
- ✅ You need password reset features

---

## 📍 Your URLs

**Simple Login:**
```
https://your-site.vercel.app/admin/login
```

**Supabase Login:**
```
https://your-site.vercel.app/admin/login-supabase
```

**Admin Dashboard:**
```
https://your-site.vercel.app/admin
```

---

## 🆘 Need Help?

**Detailed guides:**
- `SUPABASE_ADMIN_AUTH_SETUP.md` - Full Supabase setup
- `ADMIN_LOGIN_GUIDE.md` - Simple password setup
- `ADMIN_PRODUCTION_SETUP.md` - Production deployment

---

## ✅ Recommended Path

1. **Use simple login NOW** to start managing your store
2. **Setup Supabase auth LATER** when you need multiple admins

**Start here:** `/admin/login` with password `admin123`

🎉 **You're ready to go!**
