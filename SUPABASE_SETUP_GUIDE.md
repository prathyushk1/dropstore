# 🗄️ Supabase Setup Guide

Complete step-by-step guide to set up your database and authentication.

---

## 📋 What You'll Do:

1. Create Supabase account
2. Create a new project
3. Get your API keys
4. Set up the database tables
5. Configure authentication
6. Test the connection

**Time needed:** 30-45 minutes

---

## Step 1: Create Supabase Account

### 1.1 Go to Supabase
Open your browser and go to: **https://supabase.com**

### 1.2 Sign Up
- Click **"Start your project"** or **"Sign Up"**
- Sign up with:
  - GitHub (recommended - fastest)
  - Google
  - Email

### 1.3 Verify Email
- Check your email for verification link
- Click the link to verify

✅ **Done!** You now have a Supabase account.

---

## Step 2: Create New Project

### 2.1 Create Organization (if first time)
- You'll be asked to create an organization
- Name it anything (e.g., "My Store" or your company name)
- Click **"Create organization"**

### 2.2 Create Project
Click **"New Project"** and fill in:

**Project Name:** `dropshipping-store` (or your store name)

**Database Password:** 
- Create a STRONG password
- **IMPORTANT:** Save this password! You'll need it later
- Example: `MyStr0ng!Pass2024`

**Region:** 
- Choose closest to your location
- For India: Choose `ap-south-1` (Mumbai)
- For US: Choose `us-east-1` (N. Virginia)
- For Europe: Choose `eu-west-1` (Ireland)

**Pricing Plan:** 
- Select **"Free"** (perfect for starting)
- You get:
  - 500 MB database
  - 1 GB file storage
  - 50,000 monthly active users
  - Unlimited API requests

### 2.3 Wait for Project Creation
- Takes 1-2 minutes
- You'll see a progress indicator
- Don't close the browser!

✅ **Done!** Your project is being created.

---

## Step 3: Get Your API Keys

### 3.1 Go to Project Settings
Once your project is ready:
- Click on **"Settings"** (gear icon in sidebar)
- Click on **"API"** in the settings menu

### 3.2 Copy Your Credentials
You'll see several keys. Copy these THREE:

**1. Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```
Copy this entire URL.

**2. anon public key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
```
This is a LONG key. Copy the entire thing.

**3. service_role secret key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
```
⚠️ **IMPORTANT:** This is SECRET! Never share or commit to GitHub!

### 3.3 Save These Keys
Open a text file and save:
```
Project URL: https://xxxxxxxxxxxxx.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Service Role Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

✅ **Done!** You have your API keys.

---

## Step 4: Configure Environment Variables

### 4.1 Create .env.local File
In your project folder, create a file named `.env.local`

**On Windows:**
- Right-click in project folder
- New → Text Document
- Name it `.env.local` (remove .txt extension)
- Or use command: `type nul > .env.local`

### 4.2 Add Your Credentials
Open `.env.local` and paste:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Razorpay (leave these for now)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your-secret-key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Replace:**
- `https://xxxxxxxxxxxxx.supabase.co` with YOUR Project URL
- First long key with YOUR anon key
- Second long key with YOUR service_role key

### 4.3 Save the File
- Save and close `.env.local`
- ⚠️ **NEVER commit this file to GitHub!**
- It's already in `.gitignore`

✅ **Done!** Environment variables configured.

---

## Step 5: Create Database Tables

### 5.1 Open SQL Editor
In Supabase dashboard:
- Click **"SQL Editor"** in the left sidebar
- Click **"New query"**

### 5.2 Run Table Creation Scripts

**Copy and paste this SQL** (in order):

#### Script 1: Enable UUID Extension
```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```
Click **"Run"** (or press Ctrl+Enter)

#### Script 2: Create Users Table
```sql
-- Create users table (extends auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'customer' CHECK (role IN ('guest', 'customer', 'admin')),
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```
Click **"Run"**

#### Script 3: Create Categories Table
```sql
-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  parent_id UUID REFERENCES categories(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```
Click **"Run"**

#### Script 4: Create Products Table
```sql
-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  price DECIMAL(10,2) NOT NULL,
  compare_price DECIMAL(10,2),
  cost_price DECIMAL(10,2),
  sku TEXT UNIQUE NOT NULL,
  stock INTEGER DEFAULT 0,
  category_id UUID REFERENCES categories(id),
  images TEXT[] DEFAULT '{}',
  specifications JSONB,
  seo_title TEXT,
  seo_description TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```
Click **"Run"**

#### Script 5: Create Remaining Tables
```sql
-- Create addresses table
CREATE TABLE public.addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT DEFAULT 'India',
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create coupons table
CREATE TABLE public.coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  type TEXT CHECK (type IN ('percentage', 'fixed')),
  value DECIMAL(10,2) NOT NULL,
  min_order_value DECIMAL(10,2),
  max_discount DECIMAL(10,2),
  usage_limit INTEGER,
  used_count INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  order_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  subtotal DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0,
  shipping DECIMAL(10,2) DEFAULT 0,
  tax DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  coupon_code TEXT,
  payment_method TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create wishlist table
CREATE TABLE public.wishlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create supplier_products table
CREATE TABLE public.supplier_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  supplier_name TEXT NOT NULL,
  supplier_sku TEXT NOT NULL,
  supplier_price DECIMAL(10,2) NOT NULL,
  supplier_url TEXT,
  shipping_time TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```
Click **"Run"**

#### Script 6: Create Indexes
```sql
-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_wishlist_user ON wishlist(user_id);
CREATE INDEX idx_reviews_product ON reviews(product_id);
```
Click **"Run"**

### 5.3 Verify Tables Created
- Click **"Table Editor"** in sidebar
- You should see all your tables listed!

✅ **Done!** Database tables created.

---

## Step 6: Set Up Row Level Security (RLS)

### 6.1 Enable RLS
Run this SQL:

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplier_products ENABLE ROW LEVEL SECURITY;
```

### 6.2 Create Basic Policies
```sql
-- Products: Everyone can read active products
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (is_active = true);

-- Categories: Everyone can read
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

-- Users can read their own data
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Users can manage their own addresses
CREATE POLICY "Users can manage own addresses"
  ON addresses FOR ALL
  USING (auth.uid() = user_id);

-- Users can view their own orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- Users can manage their own wishlist
CREATE POLICY "Users can manage own wishlist"
  ON wishlist FOR ALL
  USING (auth.uid() = user_id);
```

✅ **Done!** Security policies set up.

---

## Step 7: Enable Authentication

### 7.1 Configure Auth Settings
- Go to **"Authentication"** in sidebar
- Click **"Providers"**

### 7.2 Enable Email Provider
- Find **"Email"** provider
- Toggle it **ON**
- **Confirm email:** Toggle ON (recommended)
- Click **"Save"**

### 7.3 Configure Email Templates (Optional)
- Click **"Email Templates"**
- Customize confirmation email
- Customize password reset email

✅ **Done!** Authentication enabled.

---

## Step 8: Add Sample Data (Optional)

### 8.1 Add Sample Categories
```sql
INSERT INTO categories (name, slug, description) VALUES
('Electronics', 'electronics', 'Electronic devices and gadgets'),
('Fashion', 'fashion', 'Clothing and accessories'),
('Home & Living', 'home', 'Home decor and furniture'),
('Sports', 'sports', 'Sports equipment and gear');
```

### 8.2 Add Sample Products
```sql
INSERT INTO products (name, slug, description, price, sku, stock, category_id, images, is_active) 
SELECT 
  'Wireless Earbuds Pro',
  'wireless-earbuds-pro',
  'Premium wireless earbuds with active noise cancellation',
  2999.00,
  'WEP-001',
  50,
  id,
  ARRAY['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800'],
  true
FROM categories WHERE slug = 'electronics';
```

✅ **Done!** Sample data added.

---

## Step 9: Test Connection

### 9.1 Restart Your Dev Server
Stop the current server (Ctrl+C in terminal) and restart:
```bash
npm run dev
```

### 9.2 Check Console
Open browser console (F12) and check for any Supabase errors.

### 9.3 Test Database Query
I'll create a test page for you to verify connection.

✅ **Done!** Connection tested.

---

## 🎉 Congratulations!

Your Supabase database is now set up and ready!

### What You Have Now:
✅ Supabase project created
✅ Database tables created
✅ Authentication enabled
✅ Security policies set up
✅ Environment variables configured
✅ Sample data added

### Next Steps:
1. Test the connection (I'll help you)
2. Implement authentication in your app
3. Connect real data to your pages

---

## 🆘 Troubleshooting

### Can't see tables?
- Refresh the page
- Check SQL Editor for errors
- Make sure you clicked "Run" for each script

### Connection errors?
- Check `.env.local` has correct keys
- Restart dev server
- Verify keys don't have extra spaces

### RLS blocking queries?
- Check policies are created
- Verify user is authenticated
- Check auth.uid() matches user_id

---

## 📞 Need Help?

If you get stuck:
1. Check the error message
2. Verify all SQL scripts ran successfully
3. Confirm environment variables are correct
4. Make sure dev server restarted

---

**Ready to test the connection? Let me know and I'll create a test page!** 🚀
