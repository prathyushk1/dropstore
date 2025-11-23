# 🌐 Connect Your Custom Domain to Vercel

Complete guide to use your own domain for your dropshipping store!

---

## 🎯 What You Need

- ✅ Your domain name (e.g., `yourstore.com`)
- ✅ Access to your domain registrar (GoDaddy, Namecheap, etc.)
- ✅ Vercel project deployed

---

## 🚀 Step-by-Step Guide

### Step 1: Deploy to Vercel First

Make sure your project is deployed:
```bash
vercel --prod
```

You should have a Vercel URL like: `https://dropshipping-store.vercel.app`

---

### Step 2: Add Domain in Vercel Dashboard

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Click on your project (`dropshipping-store`)
3. Click **"Settings"** tab
4. Click **"Domains"** in the left sidebar
5. Enter your domain name (e.g., `yourstore.com`)
6. Click **"Add"**

#### Option B: Using Vercel CLI

```bash
vercel domains add yourstore.com
```

---

### Step 3: Configure DNS Records

Vercel will show you which DNS records to add. You'll need to add these in your domain registrar.

#### For Root Domain (yourstore.com):

**Add an A Record:**
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

#### For www Subdomain (www.yourstore.com):

**Add a CNAME Record:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

---

## 📝 DNS Configuration by Provider

### GoDaddy

1. Go to https://dcc.godaddy.com/manage/dns
2. Find your domain
3. Click **"DNS"** or **"Manage DNS"**
4. Click **"Add"** to add new records

**A Record:**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21`
- TTL: `1 Hour`

**CNAME Record:**
- Type: `CNAME`
- Name: `www`
- Points to: `cname.vercel-dns.com`
- TTL: `1 Hour`

---

### Namecheap

1. Go to https://ap.www.namecheap.com/domains/list/
2. Click **"Manage"** next to your domain
3. Go to **"Advanced DNS"** tab
4. Click **"Add New Record"**

**A Record:**
- Type: `A Record`
- Host: `@`
- Value: `76.76.21.21`
- TTL: `Automatic`

**CNAME Record:**
- Type: `CNAME Record`
- Host: `www`
- Target: `cname.vercel-dns.com`
- TTL: `Automatic`

---

### Cloudflare

1. Go to https://dash.cloudflare.com/
2. Select your domain
3. Click **"DNS"** tab
4. Click **"Add record"**

**A Record:**
- Type: `A`
- Name: `@`
- IPv4 address: `76.76.21.21`
- Proxy status: `Proxied` (orange cloud)

**CNAME Record:**
- Type: `CNAME`
- Name: `www`
- Target: `cname.vercel-dns.com`
- Proxy status: `Proxied` (orange cloud)

---

### Google Domains

1. Go to https://domains.google.com/
2. Click on your domain
3. Click **"DNS"** in the left menu
4. Scroll to **"Custom resource records"**

**A Record:**
- Name: `@`
- Type: `A`
- TTL: `1h`
- Data: `76.76.21.21`

**CNAME Record:**
- Name: `www`
- Type: `CNAME`
- TTL: `1h`
- Data: `cname.vercel-dns.com`

---

### Other Providers

The process is similar:
1. Find DNS settings
2. Add A record pointing to `76.76.21.21`
3. Add CNAME record pointing to `cname.vercel-dns.com`

---

## ⏱️ DNS Propagation

After adding DNS records:
- **Propagation time**: 5 minutes to 48 hours
- **Usually takes**: 15-30 minutes
- **Check status**: https://www.whatsmydns.net/

---

## ✅ Verify Domain

### In Vercel Dashboard:

1. Go to your project
2. Click **"Domains"**
3. You'll see your domain with status:
   - 🟡 **Pending**: DNS not configured yet
   - 🟢 **Valid**: Domain is working!

### Test Your Domain:

Once DNS propagates, visit:
- `https://yourstore.com`
- `https://www.yourstore.com`

Both should show your store!

---

## 🔒 SSL Certificate

Vercel automatically provides:
- ✅ Free SSL certificate
- ✅ HTTPS enabled
- ✅ Auto-renewal
- ✅ No configuration needed!

Your site will be secure: `https://yourstore.com` 🔒

---

## 🎯 Redirect www to Root (Optional)

To redirect `www.yourstore.com` → `yourstore.com`:

1. In Vercel Dashboard
2. Go to **Settings** → **Domains**
3. Click on `www.yourstore.com`
4. Select **"Redirect to yourstore.com"**
5. Save

---

## 🔧 Troubleshooting

### Domain Not Working After 24 Hours

**Check DNS Records:**
```bash
nslookup yourstore.com
```

Should show: `76.76.21.21`

**Check CNAME:**
```bash
nslookup www.yourstore.com
```

Should show: `cname.vercel-dns.com`

### "Invalid Configuration" Error

**Solutions:**
1. Remove any existing A records for `@`
2. Remove any existing CNAME records for `www`
3. Make sure you're using the correct IP: `76.76.21.21`
4. Wait 5-10 minutes after changes

### SSL Certificate Not Working

**Solutions:**
1. Wait 5-10 minutes after DNS propagation
2. Vercel auto-generates SSL certificates
3. Check Vercel dashboard for certificate status
4. Try accessing with `https://` (not `http://`)

---

## 📧 Email Setup (Optional)

If you want email@yourstore.com:

### Option 1: Google Workspace
- $6/month per user
- Professional email
- Gmail interface

### Option 2: Zoho Mail
- Free for 5 users
- Basic features
- Good for starting

### Option 3: Forward to Gmail
- Free
- Set up email forwarding in your domain registrar
- Forward to your existing Gmail

---

## 🎨 Update Your Store

After connecting domain, update these:

### 1. Environment Variables

In Vercel Dashboard:
```
NEXT_PUBLIC_APP_URL=https://yourstore.com
```

### 2. Supabase Settings

In Supabase Dashboard:
1. Go to **Settings** → **API**
2. Add your domain to **Site URL**
3. Add to **Redirect URLs**:
   - `https://yourstore.com/**`
   - `https://www.yourstore.com/**`

### 3. Social Media

Update your domain in:
- Facebook Business
- Google Search Console
- Google Analytics
- Any other integrations

---

## 📊 Domain Management Commands

### Add Domain:
```bash
vercel domains add yourstore.com
```

### List Domains:
```bash
vercel domains ls
```

### Remove Domain:
```bash
vercel domains rm yourstore.com
```

### Check Domain Status:
```bash
vercel domains inspect yourstore.com
```

---

## 🎯 Best Practices

### Use Both Root and www:
- Add both `yourstore.com` and `www.yourstore.com`
- Redirect one to the other
- Ensures all visitors reach your site

### Enable HTTPS:
- Always use `https://`
- Vercel handles this automatically
- Never use `http://` in production

### Monitor DNS:
- Check DNS propagation: https://www.whatsmydns.net/
- Verify from different locations
- Test on mobile and desktop

---

## 🌍 Multiple Domains (Optional)

You can add multiple domains:

```bash
vercel domains add yourstore.com
vercel domains add shop.yourstore.com
vercel domains add store.yourstore.com
```

All will point to the same Vercel project!

---

## 📝 Quick Checklist

- [ ] Domain registered and owned by you
- [ ] Vercel project deployed
- [ ] Domain added in Vercel dashboard
- [ ] A record added (@ → 76.76.21.21)
- [ ] CNAME record added (www → cname.vercel-dns.com)
- [ ] Waited 15-30 minutes for DNS propagation
- [ ] Tested https://yourstore.com
- [ ] Tested https://www.yourstore.com
- [ ] SSL certificate working (🔒 in browser)
- [ ] Updated NEXT_PUBLIC_APP_URL
- [ ] Updated Supabase redirect URLs

---

## 🎉 Success!

Once everything is set up:
- ✅ Your store is live at your custom domain
- ✅ HTTPS is enabled automatically
- ✅ Both root and www work
- ✅ Professional appearance
- ✅ Ready for customers!

---

## 📞 Need Help?

### Vercel Support:
- Docs: https://vercel.com/docs/concepts/projects/domains
- Support: https://vercel.com/support

### DNS Help:
- Check propagation: https://www.whatsmydns.net/
- DNS lookup: https://mxtoolbox.com/

---

## 🚀 Example Setup

**Your Domain:** `myawesomestore.com`

**DNS Records:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Result:**
- `https://myawesomestore.com` ✅
- `https://www.myawesomestore.com` ✅

**Both work perfectly!** 🎊

---

**Ready to connect your domain?** 

1. Deploy to Vercel first
2. Add domain in Vercel dashboard
3. Configure DNS records
4. Wait 15-30 minutes
5. Your store is live! 🚀
