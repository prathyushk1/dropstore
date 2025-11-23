# 🔑 How to Get Supabase API Keys

Step-by-step visual guide to find and copy your Supabase API keys.

---

## 📍 Step 1: Go to Your Supabase Dashboard

1. Open your browser
2. Go to: **https://supabase.com/dashboard**
3. Log in if you haven't already
4. You'll see your project(s) listed

---

## 📍 Step 2: Open Your Project

1. Click on your project name (e.g., "dropshipping-store")
2. You'll be taken to the project dashboard
3. You should see the main dashboard with various options in the left sidebar

---

## 📍 Step 3: Navigate to Settings

**Look at the LEFT SIDEBAR:**

You'll see these menu items:
- Table Editor
- SQL Editor
- Database
- Authentication
- Storage
- Functions
- **⚙️ Settings** ← Click this one!

**Click on the ⚙️ Settings icon** (it's usually at the bottom of the sidebar)

---

## 📍 Step 4: Go to API Settings

After clicking Settings, you'll see a submenu:
- General
- Database
- **API** ← Click this one!
- Auth
- Storage

**Click on "API"**

---

## 📍 Step 5: Find Your API Keys

You're now on the API settings page. Scroll down and you'll see:

### Section 1: Project URL
```
┌─────────────────────────────────────────┐
│ Project URL                              │
│ https://xxxxxxxxxxxxx.supabase.co       │
│ [Copy] button                            │
└─────────────────────────────────────────┘
```

**Click the [Copy] button** next to the URL

### Section 2: Project API keys

You'll see a table with keys:

```
┌──────────────────────────────────────────────────────────┐
│ Name              │ Key                    │ Actions      │
├──────────────────────────────────────────────────────────┤
│ anon              │ eyJhbGciOiJIUzI1N...  │ [Copy] [👁]  │
│ public            │                        │              │
├──────────────────────────────────────────────────────────┤
│ service_role      │ eyJhbGciOiJIUzI1N...  │ [Copy] [👁]  │
│ secret            │                        │              │
└──────────────────────────────────────────────────────────┘
```

---

## 📍 Step 6: Copy Each Key

### Key 1: Project URL
1. Find "Project URL" section
2. Click the **[Copy]** button
3. Paste it somewhere safe (Notepad, text file)

**Example:**
```
https://abcdefghijklmnop.supabase.co
```

### Key 2: anon public key
1. Find the row that says **"anon"** or **"anon public"**
2. Click the **[Copy]** button next to it
3. Paste it in your text file

**Example (this is LONG):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjc1ODQwMCwiZXhwIjoxOTQ4MzM0NDAwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Key 3: service_role secret key
1. Find the row that says **"service_role"** or **"service_role secret"**
2. Click the **[Copy]** button next to it
3. Paste it in your text file

**⚠️ IMPORTANT:** This key is SECRET! Never share it or commit to GitHub!

**Example (also LONG):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjMyNzU4NDAwLCJleHAiOjE5NDgzMzQ0MDB9.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
```

---

## 📍 Step 7: Save Your Keys

Create a text file with your keys:

```text
=== MY SUPABASE CREDENTIALS ===

Project URL:
https://xxxxxxxxxxxxx.supabase.co

Anon Public Key:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMjc1ODQwMCwiZXhwIjoxOTQ4MzM0NDAwfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Service Role Key:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjMyNzU4NDAwLCJleHAiOjE5NDgzMzQ0MDB9.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
```

**Save this file as:** `supabase-credentials.txt`

---

## 📍 Visual Guide - Where to Look

### Dashboard Layout:
```
┌─────────────────────────────────────────────────────────┐
│  SUPABASE                                    [Profile]   │
├──────────┬──────────────────────────────────────────────┤
│          │                                               │
│ 📊 Home  │  Project Dashboard                           │
│ 📁 Table │                                               │
│ 💾 SQL   │  Your project content here...                │
│ 🗄️ DB    │                                               │
│ 🔐 Auth  │                                               │
│ 📦 Store │                                               │
│ ⚡ Func  │                                               │
│          │                                               │
│ ⚙️ Settings ← CLICK HERE                                │
│   ├─ General                                            │
│   ├─ Database                                           │
│   ├─ API ← THEN CLICK HERE                             │
│   ├─ Auth                                               │
│   └─ Storage                                            │
└──────────┴──────────────────────────────────────────────┘
```

---

## 🎯 Quick Checklist

- [ ] Logged into Supabase dashboard
- [ ] Opened my project
- [ ] Clicked ⚙️ Settings in left sidebar
- [ ] Clicked "API" in settings menu
- [ ] Copied Project URL
- [ ] Copied anon public key
- [ ] Copied service_role key
- [ ] Saved all three in a text file

---

## 🔍 Can't Find the Keys?

### If you don't see "Settings":
- Scroll down in the left sidebar
- It's usually at the bottom
- Look for the ⚙️ gear icon

### If you don't see "API":
- Make sure you clicked on Settings first
- Look for the submenu that appears
- API should be the 3rd option

### If the keys are hidden:
- Look for an 👁️ (eye) icon next to each key
- Click it to reveal the full key
- Then click [Copy] to copy it

### If you see "Reveal" button:
- Click "Reveal" to show the key
- Then click [Copy]

---

## ⚠️ Important Notes

1. **Keys are LONG** - They're supposed to be! Don't worry if they look like gibberish.

2. **Don't share service_role key** - This is your admin key. Keep it secret!

3. **Copy the FULL key** - Make sure you copy the entire thing, not just part of it.

4. **No spaces** - The keys should have no spaces at the beginning or end.

---

## ✅ Verify Your Keys

Your keys should look like this:

**Project URL:**
- Starts with `https://`
- Ends with `.supabase.co`
- Example: `https://abcdefg.supabase.co`

**anon key:**
- Starts with `eyJ`
- Very long (200+ characters)
- Has dots (.) in it
- Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...`

**service_role key:**
- Also starts with `eyJ`
- Also very long (200+ characters)
- Also has dots (.) in it
- Different from anon key
- Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...`

---

## 🎯 Next Step

Once you have all three keys, go to:
**SUPABASE_ADD_TO_ENV.md** for instructions on adding them to your project!

---

## 🆘 Still Stuck?

### Common Issues:

**"I don't have a project yet"**
- Go to https://supabase.com
- Click "New Project"
- Follow the setup wizard

**"I can't find Settings"**
- Look at the very bottom of the left sidebar
- It might be collapsed - look for ⚙️ icon

**"The keys are too long to copy"**
- Use the [Copy] button, don't try to select manually
- The button copies the entire key automatically

**"I copied but it's not working"**
- Make sure you copied the FULL key
- Check for extra spaces at the start/end
- Try copying again

---

**Got your keys? Great! Now let's add them to your project!** 🚀

**Next:** See **SUPABASE_ADD_TO_ENV.md**
