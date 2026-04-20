import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Auth utilities
export const signUpWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signInWithEmail = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const onAuthStateChange = (callback) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      callback(session?.user || null);
    }
  );
  return subscription;
};

// User profile utilities
export const createUserProfile = async (userId, displayName, email) => {
  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        id: userId,
        display_name: displayName,
        email,
        created_at: new Date(),
      },
    ])
    .select();
  return { data, error };
};

export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

// Products utilities
export const getProducts = async (categoryId = null) => {
  let query = supabase.from('products').select('*');
  
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }
  
  const { data, error } = await query;
  return { data, error };
};

export const getProductById = async (productId) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();
  return { data, error };
};

// Categories utilities
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  return { data, error };
};

// Orders utilities
export const createOrder = async (userId, items, totalPrice, shippingAddress) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        user_id: userId,
        total_price: totalPrice,
        status: 'pending',
        shipping_address: shippingAddress,
        created_at: new Date(),
      },
    ])
    .select();
  
  if (error) return { data: null, error };

  const orderId = data[0].id;

  // Insert order items
  const orderItems = items.map((item) => ({
    order_id: orderId,
    product_id: item.id,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  return { data: data[0], error: itemsError };
};

export const updateOrderStatus = async (orderId, status) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select();
  return { data, error };
};

export const getOrders = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select(
      `
      *,
      order_items (
        id,
        quantity,
        price,
        products (
          id,
          name,
          image_url
        )
      )
    `
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data, error };
};

export const getOrderById = async (orderId) => {
  const { data, error } = await supabase
    .from('orders')
    .select(
      `
      *,
      order_items (
        id,
        quantity,
        price,
        products (
          id,
          name,
          price,
          image_url
        )
      )
    `
    )
    .eq('id', orderId)
    .single();
  return { data, error };
};

// Payment utilities
export const createPaymentIntent = async (orderId, amount) => {
  const { data, error } = await supabase
    .from('payments')
    .insert([
      {
        order_id: orderId,
        amount,
        status: 'pending',
        created_at: new Date(),
      },
    ])
    .select();
  return { data, error };
};

export const updatePaymentStatus = async (paymentId, status, razorpayPaymentId) => {
  const { data, error } = await supabase
    .from('payments')
    .update({ 
      status, 
      razorpay_payment_id: razorpayPaymentId 
    })
    .eq('id', paymentId)
    .select();
  return { data, error };
};
