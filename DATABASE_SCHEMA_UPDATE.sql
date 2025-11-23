-- ============================================
-- DATABASE SCHEMA UPDATES
-- Run these in Supabase SQL Editor
-- ============================================

-- 1. Add has_variants column to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS has_variants BOOLEAN DEFAULT FALSE;

-- 2. Create product_variants table
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  sku TEXT NOT NULL UNIQUE,
  price DECIMAL(10, 2) NOT NULL,
  compare_price DECIMAL(10, 2),
  stock INTEGER NOT NULL DEFAULT 0,
  attributes JSONB NOT NULL DEFAULT '{}',
  image TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create inventory_logs table
CREATE TABLE IF NOT EXISTS inventory_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('purchase', 'sale', 'adjustment', 'return')),
  quantity INTEGER NOT NULL,
  previous_stock INTEGER NOT NULL,
  new_stock INTEGER NOT NULL,
  reason TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Add variant_id to order_items table
ALTER TABLE order_items 
ADD COLUMN IF NOT EXISTS variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL;

-- 5. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_sku ON product_variants(sku);
CREATE INDEX IF NOT EXISTS idx_inventory_logs_product_id ON inventory_logs(product_id);
CREATE INDEX IF NOT EXISTS idx_inventory_logs_variant_id ON inventory_logs(variant_id);
CREATE INDEX IF NOT EXISTS idx_inventory_logs_created_at ON inventory_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_variant_id ON order_items(variant_id);

-- 6. Enable Row Level Security
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_logs ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies for product_variants (public read, admin write)
CREATE POLICY "Anyone can view active variants"
  ON product_variants FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage variants"
  ON product_variants FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );

-- 8. RLS Policies for inventory_logs (admin only)
CREATE POLICY "Admins can view inventory logs"
  ON inventory_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can create inventory logs"
  ON inventory_logs FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );

-- 9. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 10. Create trigger for product_variants
DROP TRIGGER IF EXISTS update_product_variants_updated_at ON product_variants;
CREATE TRIGGER update_product_variants_updated_at
  BEFORE UPDATE ON product_variants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 11. Create function to automatically log stock changes
CREATE OR REPLACE FUNCTION log_stock_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.stock != NEW.stock THEN
    INSERT INTO inventory_logs (
      product_id,
      type,
      quantity,
      previous_stock,
      new_stock,
      reason
    ) VALUES (
      NEW.id,
      CASE 
        WHEN NEW.stock > OLD.stock THEN 'adjustment'
        ELSE 'sale'
      END,
      NEW.stock - OLD.stock,
      OLD.stock,
      NEW.stock,
      'Automatic log from stock update'
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 12. Create trigger for automatic stock logging (optional)
-- Uncomment if you want automatic logging
-- DROP TRIGGER IF EXISTS log_product_stock_change ON products;
-- CREATE TRIGGER log_product_stock_change
--   AFTER UPDATE ON products
--   FOR EACH ROW
--   WHEN (OLD.stock IS DISTINCT FROM NEW.stock)
--   EXECUTE FUNCTION log_stock_change();

-- ============================================
-- VERIFICATION QUERIES
-- Run these to verify the setup
-- ============================================

-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('product_variants', 'inventory_logs');

-- Check if columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name = 'has_variants';

SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'order_items' 
AND column_name = 'variant_id';

-- Check indexes
SELECT indexname 
FROM pg_indexes 
WHERE tablename IN ('product_variants', 'inventory_logs');

-- Check RLS policies
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE tablename IN ('product_variants', 'inventory_logs');

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Example: Add variant to a product
-- First, update product to have variants
-- UPDATE products SET has_variants = TRUE WHERE id = 'your-product-id';

-- Then add variants
-- INSERT INTO product_variants (product_id, name, sku, price, stock, attributes) VALUES
-- ('your-product-id', 'Small - Red', 'PROD-001-S-RED', 29.99, 50, '{"size": "S", "color": "Red"}'),
-- ('your-product-id', 'Medium - Red', 'PROD-001-M-RED', 29.99, 75, '{"size": "M", "color": "Red"}'),
-- ('your-product-id', 'Large - Blue', 'PROD-001-L-BLUE', 34.99, 30, '{"size": "L", "color": "Blue"}');

-- ============================================
-- CLEANUP (if needed)
-- ============================================

-- To remove everything (use with caution!)
-- DROP TABLE IF EXISTS inventory_logs CASCADE;
-- DROP TABLE IF EXISTS product_variants CASCADE;
-- ALTER TABLE products DROP COLUMN IF EXISTS has_variants;
-- ALTER TABLE order_items DROP COLUMN IF EXISTS variant_id;
