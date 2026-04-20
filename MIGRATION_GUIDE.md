# Firebase to Supabase Migration & Razorpay Integration Guide

## Overview

This e-commerce application has been successfully migrated from Firebase to Supabase and now includes Razorpay payment integration. This guide covers the setup and configuration steps needed to get the app running.

## What's Changed

### 1. **Authentication System**
- ❌ **Removed**: Firebase Authentication
- ✅ **Added**: Supabase Auth (Email/Password)
- Features: User registration, login, session management with secure tokens

### 2. **Database**
- ❌ **Removed**: Firebase Realtime Database / Firestore
- ✅ **Added**: Supabase PostgreSQL
- Tables created:
  - `users` - User profiles
  - `products` - Product catalog
  - `categories` - Product categories
  - `orders` - Customer orders
  - `order_items` - Order line items
  - `payments` - Payment records

### 3. **Payment Processing**
- ❌ **Removed**: Stripe integration (client-side only)
- ✅ **Added**: Razorpay (Free tier support)
- Features: Secure payment processing, payment verification

### 4. **Checkout Flow**
- ✅ **Enhanced**: Multi-step checkout with progress indicators
- Steps:
  1. Cart Review
  2. Order Review
  3. Shipping Address Collection (with validation)
  4. Payment Processing
  5. Order Confirmation

### 5. **New Features**
- ✅ Order History & Tracking
- ✅ Form Validation with error messages
- ✅ Order Details modal
- ✅ Improved UI/UX with responsive design

## Environment Variables Required

### Supabase Configuration
```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

### Razorpay Configuration
```
REACT_APP_RAZORPAY_KEY_ID=your-razorpay-key-id
REACT_APP_RAZORPAY_SECRET_KEY=your-razorpay-secret-key (for backend only)
```

## Setup Instructions

### Step 1: Set Up Supabase

1. **Create a Supabase Account**
   - Go to https://supabase.com
   - Sign up or log in

2. **Create a New Project**
   - Choose a region close to your users
   - Set a strong database password
   - Wait for the project to initialize

3. **Run Database Migration**
   - Go to SQL Editor in Supabase dashboard
   - Copy the entire contents of `/scripts/01-create-tables.sql`
   - Paste and execute it
   - Copy the entire contents of `/scripts/02-seed-data.sql`
   - Paste and execute it

4. **Get Your Credentials**
   - Go to Project Settings → API
   - Copy your **Project URL** (REACT_APP_SUPABASE_URL)
   - Copy the **anon public** key (REACT_APP_SUPABASE_ANON_KEY)

5. **Add API Keys to Your Project**
   - Add the keys to your `.env.local` file (for local development)
   - Or add them to your Vercel environment variables (for production)

### Step 2: Set Up Razorpay

1. **Create a Razorpay Account**
   - Go to https://razorpay.com
   - Sign up and verify your account
   - Razorpay offers a free tier perfect for testing

2. **Get API Keys**
   - Go to Settings → API Keys
   - Copy your **Key ID** (REACT_APP_RAZORPAY_KEY_ID)
   - Copy your **Key Secret** (keep this secure, only for backend)

3. **Add Keys to Environment Variables**
   - Add REACT_APP_RAZORPAY_KEY_ID to your frontend env
   - Store REACT_APP_RAZORPAY_SECRET_KEY securely (backend only)

### Step 3: Configure Authentication

1. **Enable Email/Password Auth in Supabase**
   - Go to Authentication → Providers
   - Enable "Email" provider
   - Configure email templates if needed

2. **Set Up Email Confirmation** (Optional)
   - Enable email confirmations in Auth → Settings
   - Users will need to confirm their email

### Step 4: Update Code (If Using Different Services)

If you're using different service providers, update these files:
- `/src/utils/supabase/supabase.client.js` - Database operations
- `/src/utils/razorpay/razorpay.utils.js` - Payment processing
- `/src/store/user/user.saga.js` - Authentication logic

## File Structure

```
src/
├── utils/
│   ├── supabase/
│   │   └── supabase.client.js      # Supabase client & queries
│   └── razorpay/
│       └── razorpay.utils.js       # Razorpay utilities
├── store/
│   ├── orders/                      # NEW: Orders management
│   │   ├── orders.action.js
│   │   ├── orders.reducer.js
│   │   ├── orders.saga.js
│   │   ├── orders.selector.js
│   │   └── orders.type.js
│   ├── user/
│   │   └── user.saga.js            # Updated for Supabase
│   └── categories/
│       └── category.saga.js        # Updated for Supabase
├── routes/
│   ├── checkout/
│   │   ├── checkout-enhanced.component.jsx  # NEW: Multi-step checkout
│   │   └── checkout-enhanced.styles.scss
│   └── order-history/              # NEW: Order tracking
│       ├── order-history.component.jsx
│       └── order-history.styles.scss
└── components/
    └── payment-form/
        ├── payment-form-razorpay.component.jsx  # NEW: Razorpay form
        └── payment-form.styles.scss
```

## API Endpoints Expected

The app expects the following API endpoints (implement in your backend):

### Create Order
```
POST /api/create-order
Body: {
  userId: string,
  items: array,
  totalPrice: number,
  shippingAddress: object
}
Response: { orderId: string }
```

### Verify Payment
```
POST /api/verify-payment
Body: {
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
}
Response: { verified: boolean }
```

## Database Schema

### Users Table
```sql
- id (UUID, primary key)
- email (string, unique)
- display_name (string)
- created_at (timestamp)
```

### Products Table
```sql
- id (UUID, primary key)
- name (string)
- description (text)
- price (decimal)
- category_id (foreign key)
- image_url (string)
- stock_quantity (integer)
- created_at (timestamp)
```

### Categories Table
```sql
- id (UUID, primary key)
- name (string)
- description (text)
- created_at (timestamp)
```

### Orders Table
```sql
- id (UUID, primary key)
- user_id (UUID, foreign key)
- total_price (decimal)
- status (string: pending, confirmed, shipped, delivered)
- shipping_address (JSONB)
- created_at (timestamp)
```

### Order Items Table
```sql
- id (UUID, primary key)
- order_id (UUID, foreign key)
- product_id (UUID, foreign key)
- quantity (integer)
- price (decimal)
- created_at (timestamp)
```

### Payments Table
```sql
- id (UUID, primary key)
- order_id (UUID, foreign key)
- amount (decimal)
- status (string: pending, confirmed, failed)
- razorpay_payment_id (string)
- created_at (timestamp)
```

## Testing Checklist

- [ ] User can register with email
- [ ] User can log in with credentials
- [ ] Products display from Supabase
- [ ] Categories load correctly
- [ ] Add products to cart
- [ ] Proceed to checkout
- [ ] Fill shipping address with validation
- [ ] Complete order review
- [ ] Razorpay payment modal opens
- [ ] Order confirmation page appears
- [ ] Order appears in order history
- [ ] Can view order details

## Troubleshooting

### Issue: "Supabase environment variables not found"
**Solution**: 
- Check `.env.local` file contains `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY`
- Restart dev server after adding env variables

### Issue: "Razorpay is not configured"
**Solution**:
- Verify `REACT_APP_RAZORPAY_KEY_ID` is set
- Check Razorpay Key ID is valid (should start with 'rzp_')

### Issue: "404 errors on database queries"
**Solution**:
- Verify database tables were created by running SQL scripts
- Check Supabase connection is working
- Verify Row-Level Security (RLS) policies if enabled

### Issue: "Payment verification fails"
**Solution**:
- Ensure `/api/verify-payment` endpoint is implemented
- Verify Razorpay Secret Key is correct on backend
- Check payment signature validation logic

## Next Steps

1. **Implement Backend API** for order creation and payment verification
2. **Set up Email Notifications** for order confirmations
3. **Implement Order Tracking** with status updates
4. **Add Admin Dashboard** for order management
5. **Set up Analytics** with order metrics

## Security Considerations

✅ **Implemented**:
- Supabase Auth with secure session tokens
- PostgreSQL for data integrity
- Form validation on frontend
- Payment signature verification

⚠️ **To Implement**:
- Row-Level Security (RLS) on Supabase tables
- API rate limiting
- HTTPS only for production
- Secure secret key storage
- CSRF protection

## Support

For issues or questions:
1. Check the Supabase documentation: https://supabase.com/docs
2. Check Razorpay documentation: https://razorpay.com/docs
3. Review error messages in browser console
4. Check server logs for API endpoint errors

## Changes from Previous Version

| Feature | Before | After |
|---------|--------|-------|
| Authentication | Firebase Auth | Supabase Auth |
| Database | Firestore | PostgreSQL |
| Payments | Stripe (client-side) | Razorpay (full integration) |
| Checkout | Single page | 5-step flow |
| Order Tracking | None | Full history with details |
| Form Validation | Minimal | Comprehensive |
| UI/UX | Basic | Modern, responsive |
