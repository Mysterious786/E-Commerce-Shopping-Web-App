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
