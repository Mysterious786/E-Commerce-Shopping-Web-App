-- Create users table (Supabase auth_users are managed by auth, but we create a public users profile table)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id SERIAL PRIMARY KEY,
  title TEXT UNIQUE NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category_id INTEGER REFERENCES public.categories(id) ON DELETE CASCADE,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending', -- pending, confirmed, shipped, delivered, cancelled
  payment_id TEXT, -- Razorpay payment ID
  shipping_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create order items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create payment methods table
CREATE TABLE IF NOT EXISTS public.payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  payment_provider TEXT NOT NULL, -- razorpay, stripe, etc
  provider_id TEXT, -- ID from payment provider
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Authenticated users can insert their profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for categories table (public read)
CREATE POLICY "Anyone can read categories" ON public.categories
  FOR SELECT USING (TRUE);

-- RLS Policies for products table (public read)
CREATE POLICY "Anyone can read products" ON public.products
  FOR SELECT USING (TRUE);

-- RLS Policies for orders table
CREATE POLICY "Users can read their own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" ON public.orders
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for order_items table
CREATE POLICY "Users can read their order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- RLS Policies for payment_methods table
CREATE POLICY "Users can read their own payment methods" ON public.payment_methods
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payment methods" ON public.payment_methods
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own payment methods" ON public.payment_methods
  FOR UPDATE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_payment_methods_user_id ON public.payment_methods(user_id);
-- Seed categories
INSERT INTO public.categories (title, image_url) VALUES
  ('Hats', 'https://images.unsplash.com/photo-1529260830889-9217ae39b7d6?w=500'),
  ('Jackets', 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500'),
  ('Sneakers', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500'),
  ('Womens', 'https://images.unsplash.com/photo-1552066067-41ff520b0406?w=500'),
  ('Mens', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500')
ON CONFLICT (title) DO NOTHING;

-- Seed products for Hats category
INSERT INTO public.products (name, description, price, image_url, category_id, stock) VALUES
  ('Baseball Cap', 'Classic cotton baseball cap in multiple colors', 29.99, 
   'https://images.unsplash.com/photo-1529260830889-9217ae39b7d6?w=300', 
   (SELECT id FROM public.categories WHERE title = 'Hats'), 50),
  ('Beanie', 'Warm wool blend beanie perfect for winter', 34.99,
   'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=300',
   (SELECT id FROM public.categories WHERE title = 'Hats'), 40)
ON CONFLICT DO NOTHING;

-- Seed products for Jackets category
INSERT INTO public.products (name, description, price, image_url, category_id, stock) VALUES
  ('Denim Jacket', 'Classic blue denim jacket', 79.99,
   'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=300',
   (SELECT id FROM public.categories WHERE title = 'Jackets'), 30),
  ('Leather Jacket', 'Premium black leather jacket', 199.99,
   'https://images.unsplash.com/photo-1557183760-b7746e91616f?w=300',
   (SELECT id FROM public.categories WHERE title = 'Jackets'), 20)
ON CONFLICT DO NOTHING;

-- Seed products for Sneakers category
INSERT INTO public.products (name, description, price, image_url, category_id, stock) VALUES
  ('Running Shoe', 'Lightweight running shoes with great support', 119.99,
   'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
   (SELECT id FROM public.categories WHERE title = 'Sneakers'), 60),
  ('Casual Sneaker', 'Comfortable everyday sneaker', 89.99,
   'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300',
   (SELECT id FROM public.categories WHERE title = 'Sneakers'), 75)
ON CONFLICT DO NOTHING;

-- Seed products for Womens category
INSERT INTO public.products (name, description, price, image_url, category_id, stock) VALUES
  ('Yoga Pants', 'High-waisted yoga pants with pockets', 69.99,
   'https://images.unsplash.com/photo-1541534026-27fd6f7ea3ec?w=300',
   (SELECT id FROM public.categories WHERE title = 'Womens'), 55),
  ('Sports Bra', 'High-support sports bra for all activities', 54.99,
   'https://images.unsplash.com/photo-1608063615265-72e1be5b11c4?w=300',
   (SELECT id FROM public.categories WHERE title = 'Womens'), 45)
ON CONFLICT DO NOTHING;

-- Seed products for Mens category
INSERT INTO public.products (name, description, price, image_url, category_id, stock) VALUES
  ('Polo Shirt', 'Classic cotton polo shirt', 49.99,
   'https://images.unsplash.com/photo-1579542011519-c7bef6d12c15?w=300',
   (SELECT id FROM public.categories WHERE title = 'Mens'), 80),
  ('Cargo Pants', 'Durable cargo pants with multiple pockets', 74.99,
   'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=300',
   (SELECT id FROM public.categories WHERE title = 'Mens'), 65)
ON CONFLICT DO NOTHING;
