# 🌐 Admin Panel - Production Setup Guide

## Your Site is Live! Now Secure Your Admin Panel

Since you've hosted on Google, here's how to set up admin access:

---

## 🔐 Set Admin Password in Production

### Option 1: Google Cloud Run / App Engine

1. **Go to Google Cloud Console**
   - Navigate to your project
   - Find your deployed service

2. **Add Environment Variable**
   ```
   Variable Name: ADMIN_PASSWORD
   Value: YourSecurePassword123!
   ```

3. **Redeploy** (if needed)

### Option 2: Firebase Hosting + Cloud Functions

1. **Set Environment Config**
   ```bash
   firebase functions:config:set admin.password="YourSecurePassword123!"
   ```

2. **Redeploy Functions**
   ```bash
   firebase deploy --only functions
   ```

### Option 3: Using .env in Production

If you deployed with .env file support:

1. **SSH into your server** or use Cloud Shell
2. **Edit environment file**
   ```bash
   nano .env.production
   # or
   nano .env.local
   ```
3. **Add:**
   ```env
   ADMIN_PASSWORD=YourSecurePassword123!
   ```
4. **Restart your application**

---

## 🚀 Access Your Admin Panel

### Your Admin Login URL:
```
https://yourdomain.com/admin/login
```

### First Time Login:

**If you set ADMIN_PASSWORD:**
- Use your custom password

**If you didn't set it yet:**
- Default password: `admin123`
- ⚠️ **CHANGE THIS IMMEDIATELY!**

---

## ⚡ Quick Setup Steps

### Step 1: Find Your Hosting Platform

Check where you deployed:
- [ ] Google Cloud Run
- [ ] Google App Engine  
- [ ] Firebase Hosting
- [ ] Google Compute Engine (VM)
- [ ] Other

### Step 2: Set Environment Variable

Add this environment variable:
```
ADMIN_PASSWORD=YourSecurePassword123!
```

### Step 3: Restart/Redeploy

Restart your service or redeploy to apply changes.

### Step 4: Test Login

1. Go to: `https://yourdomain.com/admin/login`
2. Enter your password
3. Access admin dashboard ✅

---

## 🔒 Security Checklist

Before using in production:

- [ ] Changed default password from `admin123`
- [ ] Used strong password (12+ characters)
- [ ] Set `ADMIN_PASSWORD` environment variable
- [ ] Tested login on production URL
- [ ] Saved password in secure location (password manager)
- [ ] Verified logout works correctly

---

## 📋 Platform-Specific Instructions

### Google Cloud Run

```bash
# Update service with environment variable
gcloud run services update YOUR_SERVICE_NAME \
  --set-env-vars ADMIN_PASSWORD=YourSecurePassword123!
```

### Google App Engine

Edit `app.yaml`:
```yaml
env_variables:
  ADMIN_PASSWORD: 'YourSecurePassword123!'
```

Then deploy:
```bash
gcloud app deploy
```

### Firebase Functions

```bash
# Set config
firebase functions:config:set admin.password="YourSecurePassword123!"

# Deploy
firebase deploy --only functions
```

### Compute Engine (VM)

```bash
# SSH into your VM
gcloud compute ssh YOUR_VM_NAME

# Edit environment file
sudo nano /path/to/your/app/.env.local

# Add:
ADMIN_PASSWORD=YourSecurePassword123!

# Restart your app
pm2 restart all
# or
sudo systemctl restart your-app-service
```

---

## 🎯 What If I Forgot My Password?

### Solution 1: Reset via Environment Variable

1. Access your hosting platform
2. Update `ADMIN_PASSWORD` environment variable
3. Restart/redeploy
4. Login with new password

### Solution 2: Direct Server Access

If you have SSH access:
1. SSH into server
2. Edit `.env.local` or `.env.production`
3. Change `ADMIN_PASSWORD`
4. Restart application

### Solution 3: Remove Password Temporarily

1. Remove `ADMIN_PASSWORD` from environment
2. Default password `admin123` will be used
3. Login and immediately set new password

---

## 🌐 Your Production URLs

### Public Store:
```
https://yourdomain.com
```

### Admin Login:
```
https://yourdomain.com/admin/login
```

### Admin Dashboard:
```
https://yourdomain.com/admin
```

---

## 🛡️ Additional Security Tips

### 1. Use Strong Password
```
❌ Bad: admin123, password, 12345678
✅ Good: MyStore2024!Secure#Admin
```

### 2. Enable HTTPS
- Google Cloud automatically provides SSL
- Verify your site uses `https://`

### 3. Regular Password Changes
- Change password every 3-6 months
- Use password manager to track

### 4. Monitor Access
- Check admin activity regularly
- Review order changes
- Monitor product updates

### 5. Backup Regularly
- Backup your Supabase database
- Export important data weekly

---

## 📞 Troubleshooting

### Problem: Can't access admin panel

**Check:**
1. Is your site fully deployed?
2. Did you restart after setting password?
3. Are you using correct URL?
4. Try clearing browser cache

### Problem: "Invalid password" error

**Solutions:**
1. Verify environment variable is set
2. Check for typos in password
3. Try default: `admin123`
4. Restart your service

### Problem: Redirects to login immediately

**Solutions:**
1. Clear browser cookies
2. Try incognito/private mode
3. Check if cookies are enabled
4. Verify HTTPS is working

---

## ✅ Final Checklist

Before sharing your admin panel:

- [ ] Admin password is set in production
- [ ] Password is NOT `admin123`
- [ ] Can successfully login at `/admin/login`
- [ ] Can access all admin pages
- [ ] Logout button works
- [ ] Password saved in password manager
- [ ] Team members have access (if needed)

---

## 🎉 You're All Set!

Your admin panel is now secure and ready for production use!

**Next Steps:**
1. Login to your admin panel
2. Add your products
3. Configure settings
4. Start managing your store

**Need help?** Check `ADMIN_LOGIN_GUIDE.md` for detailed documentation.

---

**Your Store:** https://yourdomain.com
**Admin Panel:** https://yourdomain.com/admin/login

Happy selling! 🚀
