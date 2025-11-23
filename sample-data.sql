-- ============================================
-- SAMPLE DATA FOR TESTING
-- Run this in Supabase SQL Editor
-- ============================================

-- Insert sample categories
INSERT INTO categories (name, slug, description, image) VALUES
  ('Electronics', 'electronics', 'Latest gadgets and electronics', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600'),
  ('Fashion', 'fashion', 'Trendy clothing and accessories', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600'),
  ('Home & Living', 'home', 'Beautiful home decor and furniture', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?w=600'),
  ('Sports', 'sports', 'Sports equipment and gear', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600'),
  ('Accessories', 'accessories', 'Watches, jewelry and more', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600')
ON CONFLICT (slug) DO NOTHING;

-- Get category IDs for products
DO $$
DECLARE
  electronics_id UUID;
  fashion_id UUID;
  home_id UUID;
  sports_id UUID;
  accessories_id UUID;
BEGIN
  SELECT id INTO electronics_id FROM categories WHERE slug = 'electronics';
  SELECT id INTO fashion_id FROM categories WHERE slug = 'fashion';
  SELECT id INTO home_id FROM categories WHERE slug = 'home';
  SELECT id INTO sports_id FROM categories WHERE slug = 'sports';
  SELECT id INTO accessories_id FROM categories WHERE slug = 'accessories';

  -- Insert sample products for Electronics
  INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, stock, category_id, images, is_featured, is_active) VALUES
    ('Wireless Earbuds Pro', 'wireless-earbuds-pro', 'Premium wireless earbuds with active noise cancellation and 30-hour battery life. Crystal clear sound quality with deep bass.', 'Premium wireless earbuds with ANC', 2999, 3999, 'WEP-001', 50, electronics_id, ARRAY['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400'], true, true),
    ('Smart Watch Ultra', 'smart-watch-ultra', 'Advanced smartwatch with health tracking, GPS, and 7-day battery life. Track your fitness goals with precision.', 'Advanced smartwatch with health tracking', 8999, 12999, 'SWU-001', 30, electronics_id, ARRAY['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'], true, true),
    ('Bluetooth Speaker', 'bluetooth-speaker', 'Portable waterproof speaker with 360° sound and 20-hour playtime. Perfect for outdoor adventures.', 'Portable waterproof speaker', 1999, 2999, 'BTS-001', 75, electronics_id, ARRAY['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400'], false, true),
    ('Wireless Mouse', 'wireless-mouse', 'Ergonomic wireless mouse with precision tracking and long battery life. Comfortable for all-day use.', 'Ergonomic wireless mouse', 799, 1299, 'WMS-001', 100, electronics_id, ARRAY['https://images.unsplash.com/photo-1527814050087-3793815479db?w=400'], false, true);

  -- Insert sample products for Fashion
  INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, stock, category_id, images, is_featured, is_active) VALUES
    ('Premium Cotton T-Shirt', 'premium-cotton-tshirt', 'Soft and comfortable 100% cotton t-shirt. Available in multiple colors. Perfect for casual wear.', 'Soft 100% cotton t-shirt', 599, 999, 'PCT-001', 200, fashion_id, ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'], false, true),
    ('Denim Jacket', 'denim-jacket', 'Classic denim jacket with modern fit. Durable and stylish for all seasons.', 'Classic denim jacket', 2499, 3999, 'DNJ-001', 45, fashion_id, ARRAY['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'], true, true),
    ('Running Shoes', 'running-shoes', 'Lightweight running shoes with superior cushioning and breathable mesh. Perfect for your daily runs.', 'Lightweight running shoes', 3499, 4999, 'RNS-001', 60, fashion_id, ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'], true, true);

  -- Insert sample products for Home & Living
  INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, stock, category_id, images, is_featured, is_active) VALUES
    ('Ceramic Vase Set', 'ceramic-vase-set', 'Beautiful set of 3 ceramic vases in modern design. Perfect for home decoration.', 'Set of 3 ceramic vases', 1499, 2499, 'CVS-001', 35, home_id, ARRAY['https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400'], false, true),
    ('LED Desk Lamp', 'led-desk-lamp', 'Adjustable LED desk lamp with touch control and USB charging port. Eye-friendly lighting.', 'Adjustable LED desk lamp', 1299, 1999, 'LDL-001', 80, home_id, ARRAY['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400'], false, true),
    ('Wall Clock Modern', 'wall-clock-modern', 'Minimalist wall clock with silent movement. Adds elegance to any room.', 'Minimalist wall clock', 899, 1499, 'WCM-001', 50, home_id, ARRAY['https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400'], false, true);

  -- Insert sample products for Sports
  INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, stock, category_id, images, is_featured, is_active) VALUES
    ('Yoga Mat Premium', 'yoga-mat-premium', 'Extra thick yoga mat with non-slip surface. Includes carrying strap.', 'Extra thick yoga mat', 1299, 1999, 'YMP-001', 90, sports_id, ARRAY['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400'], false, true),
    ('Dumbbell Set', 'dumbbell-set', 'Adjustable dumbbell set from 5kg to 25kg. Perfect for home workouts.', 'Adjustable dumbbell set', 4999, 6999, 'DBS-001', 25, sports_id, ARRAY['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400'], true, true);

  -- Insert sample products for Accessories
  INSERT INTO products (name, slug, description, short_description, price, compare_price, sku, stock, category_id, images, is_featured, is_active) VALUES
    ('Leather Wallet', 'leather-wallet', 'Genuine leather wallet with RFID protection. Multiple card slots and bill compartment.', 'Genuine leather wallet', 1499, 2499, 'LTW-001', 70, accessories_id, ARRAY['https://images.unsplash.com/photo-1627123424574-724758594e93?w=400'], false, true),
    ('Sunglasses Classic', 'sunglasses-classic', 'UV protection sunglasses with polarized lenses. Timeless design.', 'UV protection sunglasses', 1999, 2999, 'SGC-001', 55, accessories_id, ARRAY['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400'], false, true),
    ('Backpack Travel', 'backpack-travel', 'Spacious travel backpack with laptop compartment and USB charging port.', 'Spacious travel backpack', 2999, 4499, 'BPT-001', 40, accessories_id, ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'], true, true);

END $$;

-- Verify the data was inserted
SELECT 
  c.name as category,
  COUNT(p.id) as product_count
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
GROUP BY c.name
ORDER BY c.name;

-- Show sample products
SELECT 
  p.name,
  p.price,
  c.name as category,
  p.stock,
  p.is_featured
FROM products p
JOIN categories c ON p.category_id = c.id
ORDER BY p.created_at DESC
LIMIT 10;
