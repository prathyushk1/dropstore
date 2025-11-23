# 🚀 Access Your Admin Panel RIGHT NOW

## Your Admin URL:
```
https://yourdomain.com/admin/login
```

## Default Password:
```
admin123
```

## ⚠️ IMPORTANT: Change Password!

### Quick Method:

1. **Find where you hosted** (Google Cloud Run, App Engine, Firebase, etc.)

2. **Add environment variable:**
   ```
   Name: ADMIN_PASSWORD
   Value: YourSecurePassword123!
   ```

3. **Restart/Redeploy your app**

4. **Login with new password**

---

## Platform Quick Commands

### Google Cloud Run:
```bash
gcloud run services update YOUR_SERVICE \
  --set-env-vars ADMIN_PASSWORD=YourPassword123!
```

### Google App Engine:
Edit `app.yaml`, add:
```yaml
env_variables:
  ADMIN_PASSWORD: 'YourPassword123!'
```
Then: `gcloud app deploy`

### Firebase:
```bash
firebase functions:config:set admin.password="YourPassword123!"
firebase deploy --only functions
```

---

## Can't Remember Where You Hosted?

Check your deployment history:
- Look at your terminal/command history
- Check Google Cloud Console
- Check Firebase Console
- Look for deployment scripts in your project

---

## Need Help?

See detailed guides:
- `ADMIN_PRODUCTION_SETUP.md` - Full production guide
- `ADMIN_LOGIN_GUIDE.md` - Complete documentation
- `ADMIN_QUICK_START.md` - Quick reference

---

**Login now and start managing your store!** 🎉
