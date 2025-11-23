# 🔐 Supabase Admin Authentication - Complete Setup

## 🎯 Two Admin Login Options Available

### Option 1: Simple Password (Current)
- File: `/admin/login`
- Quick and easy
- Single password for all admins

### Option 2: Supabase Auth (Better)
- File: `/admin/login-supabase`  
- Multiple admin accounts
- Email/password per admin
- More secure

---

## 🚀 Setup Supabase Auth Admin (Recommended)

### Step 1: Create Admin Table in Supabase

1. **Go to Supabase Dashboard**
   - https://supabase.com/dashboard
   - Select your project
   - Go to **SQL Editor**

2. **Run This SQL:**

```sql
-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Only admins can view admin_users
CREATE POLICY "Admins can view admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );

-- Create index for faster lookups
CREATE INDEX idx_admin_users_user_id ON admin_users(user_id);
CREATE INDEX idx_admin_users_email ON admin_users(email);
```

### Step 2: Create Your First Admin User

#### Method A: Via Supabase Dashboard (Easiest)

1. **Go to Authentication → Users**
2. **Click "Add User"**
3. **Enter:**
   - Email: `your-email@example.com`
   - Password: `YourSecurePassword123!`
   - Auto Confirm User: ✅ (check this)
4. **Click "Create User"**
5. **Copy the User ID** (you'll see it in the users list)

6. **Go to SQL Editor and run:**
```sql
INSERT INTO admin_users (user_id, email, role)
VALUES (
  'PASTE_USER_ID_HERE',
  'your-email@example.com',
  'admin'
);
```

#### Method B: Via SQL (All at once)

```sql
-- This creates both auth user and admin entry
-- Note: You'll need to set password via Supabase Dashboard after

DO $$
DECLARE
  new_user_id UUID;
BEGIN
  -- Insert into auth.users (you'll still need to set password in dashboard)
  -- For now, just create the admin entry manually after creating user in dashboard
  
  -- Get the user ID from auth.users
  SELECT id INTO new_user_id 
  FROM auth.users 
  WHERE email = 'your-email@example.com';
  
  -- Insert into admin_users
  INSERT INTO admin_users (user_id, email, role)
  VALUES (new_user_id, 'your-email@example.com', 'admin');
END $$;
```

### Step 3: Update Your Admin Login Page

**Option A: Replace current login**

Rename files:
```bash
# Backup current login
mv app/admin/login/page.tsx app/admin/login-simple/page.tsx

# Use Supabase login
mv app/admin/login-supabase/page.tsx app/admin/login/page.tsx
```

**Option B: Keep both (Recommended for testing)**

Access them at:
- Simple: `https://yoursite.com/admin/login`
- Supabase: `https://yoursite.com/admin/login-supabase`

### Step 4: Test Login

1. Go to: `https://yoursite.com/admin/login-supabase`
2. Enter your admin email and password
3. Click "Sign In"
4. You should be redirected to admin dashboard!

---

## 📋 Add More Admin Users

### Quick Method:

1. **Create user in Supabase Dashboard:**
   - Authentication → Users → Add User
   - Enter email and password
   - Copy User ID

2. **Add to admin_users table:**
```sql
INSERT INTO admin_users (user_id, email, role)
VALUES (
  'USER_ID_HERE',
  'new-admin@example.com',
  'admin'
);
```

### Verify Admin Users:

```sql
-- See all admin users
SELECT 
  au.email,
  au.role,
  au.created_at,
  u.email as auth_email
FROM admin_users au
LEFT JOIN auth.users u ON au.user_id = u.id;
```

---

## 🔄 Switch Between Login Methods

### Use Simple Password Login:
```
URL: /admin/login
Good for: Quick access, single admin
```

### Use Supabase Auth Login:
```
URL: /admin/login-supabase
Good for: Multiple admins, better security
```

---

## 🛡️ Security Features

### Supabase Auth Provides:

✅ **Email verification**
✅ **Password reset** (forgot password)
✅ **Session management**
✅ **Rate limiting**
✅ **Audit logs**
✅ **2FA support** (can be enabled)
✅ **Multiple admin accounts**

---

## 🔧 Troubleshooting

### Problem: "You don't have admin access"

**Solution:**
1. Check if user exists in `admin_users` table:
```sql
SELECT * FROM admin_users WHERE email = 'your-email@example.com';
```

2. If not found, add them:
```sql
INSERT INTO admin_users (user_id, email, role)
SELECT id, email, 'admin'
FROM auth.users
WHERE email = 'your-email@example.com';
```

### Problem: Can't login with email/password

**Solution:**
1. Verify user exists in Authentication → Users
2. Check if email is confirmed
3. Try resetting password in Supabase Dashboard
4. Check Supabase logs for errors

### Problem: Table doesn't exist

**Solution:**
Run the CREATE TABLE SQL again from Step 1

---

## 📊 Check Your Setup

Run this SQL to verify everything:

```sql
-- Check if admin_users table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'admin_users'
) as table_exists;

-- Count admin users
SELECT COUNT(*) as admin_count FROM admin_users;

-- List all admins
SELECT 
  au.email,
  au.role,
  au.created_at,
  CASE 
    WHEN u.id IS NOT NULL THEN 'Active'
    ELSE 'Deleted'
  END as status
FROM admin_users au
LEFT JOIN auth.users u ON au.user_id = u.id;
```

---

## 🎯 Recommended Setup

1. ✅ Create `admin_users` table
2. ✅ Add yourself as first admin
3. ✅ Test login at `/admin/login-supabase`
4. ✅ Once working, make it default login
5. ✅ Add other team members as needed

---

## 🚀 Quick Start Commands

```sql
-- 1. Create table (run once)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Add yourself as admin (after creating user in dashboard)
INSERT INTO admin_users (user_id, email, role)
SELECT id, email, 'admin'
FROM auth.users
WHERE email = 'YOUR_EMAIL_HERE';

-- 3. Verify
SELECT * FROM admin_users;
```

---

## ✅ Final Checklist

- [ ] Created `admin_users` table in Supabase
- [ ] Created admin user in Authentication
- [ ] Added user to `admin_users` table
- [ ] Tested login at `/admin/login-supabase`
- [ ] Can access admin dashboard
- [ ] Logout works correctly

---

**You now have enterprise-grade admin authentication!** 🎉

Need help? Check the Supabase docs: https://supabase.com/docs/guides/auth
