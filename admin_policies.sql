-- ============================================
-- ADMIN RLS POLICIES
-- Run this in Supabase SQL Editor to enable admin access
-- ============================================

-- 1. PRODUCTS
CREATE POLICY "Admins can insert products" ON products FOR INSERT WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));
CREATE POLICY "Admins can update products" ON products FOR UPDATE USING (auth.uid() IN (SELECT user_id FROM admin_users));
CREATE POLICY "Admins can delete products" ON products FOR DELETE USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- 2. CATEGORIES
CREATE POLICY "Admins can insert categories" ON categories FOR INSERT WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));
CREATE POLICY "Admins can update categories" ON categories FOR UPDATE USING (auth.uid() IN (SELECT user_id FROM admin_users));
CREATE POLICY "Admins can delete categories" ON categories FOR DELETE USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- 3. COUPONS
CREATE POLICY "Admins can select coupons" ON coupons FOR SELECT USING (auth.uid() IN (SELECT user_id FROM admin_users));
CREATE POLICY "Admins can insert coupons" ON coupons FOR INSERT WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));
CREATE POLICY "Admins can update coupons" ON coupons FOR UPDATE USING (auth.uid() IN (SELECT user_id FROM admin_users));
CREATE POLICY "Admins can delete coupons" ON coupons FOR DELETE USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- 4. ORDERS
CREATE POLICY "Admins can select all orders" ON orders FOR SELECT USING (auth.uid() IN (SELECT user_id FROM admin_users));
CREATE POLICY "Admins can update orders" ON orders FOR UPDATE USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- 5. USERS (Optional, if admins need to manage users)
CREATE POLICY "Admins can select all users" ON users FOR SELECT USING (auth.uid() IN (SELECT user_id FROM admin_users));
