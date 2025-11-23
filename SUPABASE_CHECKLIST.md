# ✅ Supabase Setup Checklist

Use this checklist to track your progress!

---

## 📋 Step-by-Step Checklist

### Part 1: Account & Project Setup
- [ ] Created Supabase account at https://supabase.com
- [ ] Verified email address
- [ ] Created organization
- [ ] Created new project named "dropshipping-store"
- [ ] Set strong database password (saved it!)
- [ ] Selected region closest to you
- [ ] Waited for project to finish creating (1-2 min)

### Part 2: Get API Keys
- [ ] Opened Settings → API
- [ ] Copied Project URL
- [ ] Copied anon public key
- [ ] Copied service_role secret key
- [ ] Saved all three keys in a safe place

### Part 3: Environment Variables
- [ ] Created `.env.local` file in project root
- [ ] Pasted Project URL as `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Pasted anon key as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Pasted service_role key as `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Saved the file
- [ ] Verified file is in `.gitignore`

### Part 4: Database Tables
- [ ] Opened SQL Editor in Supabase
- [ ] Ran Script 1: Enable UUID extension
- [ ] Ran Script 2: Create users table
- [ ] Ran Script 3: Create categories table
- [ ] Ran Script 4: Create products table
- [ ] Ran Script 5: Create remaining tables
- [ ] Ran Script 6: Create indexes
- [ ] Verified tables in Table Editor

### Part 5: Security
- [ ] Ran RLS enable script
- [ ] Created basic security policies
- [ ] Verified policies are active

### Part 6: Authentication
- [ ] Opened Authentication → Providers
- [ ] Enabled Email provider
- [ ] Turned on "Confirm email"
- [ ] Saved settings

### Part 7: Sample Data (Optional)
- [ ] Added sample categories
- [ ] Added sample products
- [ ] Verified data in Table Editor

### Part 8: Testing
- [ ] Restarted dev server (`npm run dev`)
- [ ] Opened http://localhost:3000/test-db
- [ ] Verified connection works
- [ ] No errors in console

---

## 🎯 Quick Reference

### Your Credentials Location:
- **Supabase Dashboard:** https://supabase.com/dashboard
- **Your Project:** https://supabase.com/dashboard/project/YOUR_PROJECT_ID
- **Environment File:** `C:\myshop\.env.local`

### Important URLs:
- **SQL Editor:** Dashboard → SQL Editor
- **Table Editor:** Dashboard → Table Editor
- **Authentication:** Dashboard → Authentication
- **API Settings:** Dashboard → Settings → API

---

## ⏱️ Time Estimate

- Account setup: 5 minutes
- Get API keys: 2 minutes
- Environment variables: 3 minutes
- Database tables: 10 minutes
- Security setup: 5 minutes
- Authentication: 3 minutes
- Sample data: 5 minutes
- Testing: 5 minutes

**Total: ~40 minutes**

---

## 🆘 Common Issues

### Issue: "Cannot find module '@supabase/supabase-js'"
**Solution:** Already installed! Just restart dev server.

### Issue: "Invalid API key"
**Solution:** 
- Check for extra spaces in `.env.local`
- Make sure you copied the FULL key
- Restart dev server after changing `.env.local`

### Issue: "Row Level Security policy violation"
**Solution:**
- Make sure RLS policies are created
- Check if user is authenticated
- Verify policy conditions

### Issue: Tables not showing
**Solution:**
- Refresh Supabase dashboard
- Check SQL Editor for error messages
- Make sure you clicked "Run" for each script

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ Tables visible in Table Editor
- ✅ No errors in browser console
- ✅ Test page shows "Connected to Supabase!"
- ✅ Can query data without errors

---

## 📞 Next Steps After Setup

Once all checkboxes are checked:
1. Test the connection
2. Implement authentication
3. Connect products to database
4. Make cart functional with database
5. Implement checkout flow

---

**Current Status:** 
- [ ] Setup Complete
- [ ] Connection Tested
- [ ] Ready for Development

---

**Need help? Check SUPABASE_SETUP_GUIDE.md for detailed instructions!**
