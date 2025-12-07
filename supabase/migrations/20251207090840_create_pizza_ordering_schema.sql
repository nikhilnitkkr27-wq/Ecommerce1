/*
  # Pizza Ordering Backend Schema

  1. New Tables
    - products: id, name, category, description, price, inventory, created_at
    - orders: id, order_id, customer_name, customer_email, items, total_amount, created_at

  2. Security
    - Enable RLS on both tables
    - Add policies for service role access

  3. Indexes
    - Index on products.category
    - Index on orders.customer_email
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('pizza', 'drink', 'bread')),
  description text,
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  inventory integer NOT NULL DEFAULT 0 CHECK (inventory >= 0),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  items jsonb NOT NULL,
  total_amount numeric(10,2) NOT NULL CHECK (total_amount >= 0),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage products"
  ON products FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can manage orders"
  ON orders FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);