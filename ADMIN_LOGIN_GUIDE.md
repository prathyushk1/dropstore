# Admin Panel Login Guide

## 🔐 How to Access Admin Panel

### Step 1: Set Admin Password (Optional)

Add this to your `.env.local` file:

```env
ADMIN_PASSWORD=your_secure_password_here
```

**Default password:** `admin123` (if not set in .env.local)

### Step 2: Access Admin Login Page

Navigate to: **http://localhost:3000/admin/login**

Or in production: **https://yourdomain.com/admin/login**

### Step 3: Login

1. Enter your admin password
2. Click "Login to Admin Panel"
3. You'll be redirected to the admin dashboard

### Step 4: Logout

Click the "Logout" button in the sidebar when you're done.

---

## 🚀 Quick Access

### Development
```
URL: http://localhost:3000/admin/login
Password: admin123 (default)
```

### Production
```
URL: https://yourdomain.com/admin/login
Password: Set in Vercel environment variables
```

---

## 🔒 Security Features

✅ **Session-based authentication** - Secure HTTP-only cookies
✅ **Auto-redirect** - Unauthenticated users redirected to login
✅ **7-day session** - Stay logged in for a week
✅ **Logout functionality** - Clear session anytime

---

## ⚙️ Configuration

### Change Admin Password

**For Local Development:**
Edit `.env.local`:
```env
ADMIN_PASSWORD=my_super_secure_password
```

**For Production (Vercel):**
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add: `ADMIN_PASSWORD` = `your_secure_password`
4. Redeploy your application

---

## 📋 Admin Panel Features

Once logged in, you can access:

- **Dashboard** - Overview of store performance
- **Products** - Manage your product catalog
- **Categories** - Organize product categories
- **Orders** - View and manage customer orders
- **Coupons** - Create and manage discount codes
- **Settings** - Configure store settings

---

## 🛡️ Security Best Practices

### ⚠️ IMPORTANT: Change Default Password!

The default password `admin123` is for development only. 

**Before deploying to production:**

1. Set a strong password in environment variables
2. Use a password with:
   - At least 12 characters
   - Mix of uppercase and lowercase
   - Numbers and special characters
   - Example: `MyStore2024!SecureAdmin`

### Recommended Password Managers
- 1Password
- LastPass
- Bitwarden

---

## 🔧 Troubleshooting

### Can't Access Admin Panel?

**Problem:** Redirected to login page immediately

**Solution:** 
1. Clear browser cookies
2. Try logging in again
3. Check if password matches .env.local

**Problem:** "Invalid password" error

**Solution:**
1. Verify password in `.env.local`
2. Restart development server: `npm run dev`
3. Try default password: `admin123`

**Problem:** Session expires too quickly

**Solution:**
Session lasts 7 days by default. If you need longer, edit:
`app/api/admin/login/route.ts` - Change `maxAge` value

---

## 🚀 Advanced: Role-Based Access (Future Enhancement)

For multiple admin users with different permissions, consider:

1. **Supabase Auth Integration**
   - Create admin role in Supabase
   - Use Row Level Security (RLS)
   - Manage multiple admin accounts

2. **NextAuth.js**
   - Full authentication system
   - Multiple providers (Google, GitHub, etc.)
   - Role-based permissions

---

## 📞 Need Help?

If you're having trouble accessing the admin panel:

1. Check `.env.local` file exists
2. Verify `ADMIN_PASSWORD` is set
3. Restart development server
4. Clear browser cache/cookies
5. Try incognito/private browsing mode

---

## 🎯 Quick Start Checklist

- [ ] Add `ADMIN_PASSWORD` to `.env.local`
- [ ] Restart development server
- [ ] Navigate to `/admin/login`
- [ ] Enter password and login
- [ ] Access admin dashboard
- [ ] Change default password before production!

---

**Your admin panel is now secure and ready to use!** 🎉
