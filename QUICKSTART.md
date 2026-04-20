# Quick Start Guide

## 5-Minute Setup

### 1. Get Your Credentials

**Supabase:**
1. Visit https://supabase.com → Sign up
2. Create new project, wait for initialization
3. Go to Settings → API
4. Copy `Project URL` and `anon public` key

**Razorpay:**
1. Visit https://razorpay.com → Sign up
2. Go to Settings → API Keys
3. Copy your Key ID

### 2. Setup Environment

Create `.env.local` in project root:
```env
REACT_APP_SUPABASE_URL=your-url-here
REACT_APP_SUPABASE_ANON_KEY=your-key-here
REACT_APP_RAZORPAY_KEY_ID=rzp_live_xxxxx
```

### 3. Initialize Database

1. In Supabase dashboard → SQL Editor
2. Copy-paste entire contents of `scripts/01-create-tables.sql` → Execute
3. Copy-paste entire contents of `scripts/02-seed-data.sql` → Execute

### 4. Start App

```bash
npm install
npm start
```

### 5. Test It Out

1. Sign up with email: `test@example.com` / password: `Test123!`
2. Browse products (seeded data loads automatically)
3. Add items to cart
4. Click Checkout
5. Follow 5-step checkout process
6. Use Razorpay's test card: `4111 1111 1111 1111`
7. View order in Order History

---

## Key Features

✅ **Multi-Step Checkout**
- Cart review
- Order summary  
- Shipping address with validation
- Razorpay payment
- Order confirmation

✅ **Order Management**
- Full order history
- Order details modal
- Order status tracking
- Print order functionality

✅ **Authentication**
- Email/password registration
- Secure login
- Session persistence
- User profiles

✅ **Payment**
- Razorpay integration
- Secure payment processing
- Payment verification
- INR currency support

---

## Important Files

| File | Purpose |
|------|---------|
| `MIGRATION_GUIDE.md` | Complete setup & configuration |
| `REFACTOR_SUMMARY.md` | Detailed changes summary |
| `scripts/01-create-tables.sql` | Run this first - creates database |
| `scripts/02-seed-data.sql` | Run this second - adds sample data |
| `src/utils/supabase/supabase.client.js` | Database operations |
| `src/utils/razorpay/razorpay.utils.js` | Payment processing |
| `src/routes/checkout/checkout-enhanced.component.jsx` | Multi-step checkout |
| `src/routes/order-history/order-history.component.jsx` | Order tracking |

---

## Troubleshooting

**Products not loading?**
- Check Supabase connection
- Verify SQL scripts were executed
- Check console for errors

**Payment fails?**
- Verify Razorpay Key ID is correct
- Check it starts with `rzp_`

**Can't log in?**
- Make sure you signed up first
- Check email and password
- Verify Supabase Auth is enabled

**Orders not saving?**
- Check backend API endpoints are implemented
- Verify `/api/create-order` is working
- Check Supabase tables have data

---

## Next Steps

1. **Implement Backend** - Create `/api/create-order` and `/api/verify-payment`
2. **Email Notifications** - Send order confirmations
3. **Admin Dashboard** - Manage orders and inventory
4. **Analytics** - Track sales and user behavior

---

## Database Quick Check

Verify setup by running in Supabase SQL Editor:

```sql
SELECT COUNT(*) as categories FROM categories;
SELECT COUNT(*) as products FROM products;
SELECT COUNT(*) as users FROM users;
```

Should see sample data for categories and products.

---

## Razorpay Test Cards

Use these for testing payments (in test mode):
- Visa: `4111 1111 1111 1111`
- MasterCard: `5555 5555 5555 4444`
- Any expiry date in future
- Any 3-digit CVV

---

## Files Changed Overview

**New Files (15+):**
- Supabase utilities
- Razorpay integration
- Enhanced checkout (2 files)
- Order management (5 files)
- Order history (2 files)
- Configuration guides

**Modified Files (10+):**
- User saga (Supabase auth)
- Category saga (Supabase data)
- Redux root reducer & saga
- Navigation component
- Checkout component
- App.js routes

**Removed Files:**
- Firebase utilities (no longer needed)
- Old Stripe payment form

---

## Support

1. Read `MIGRATION_GUIDE.md` for detailed setup
2. Check `REFACTOR_SUMMARY.md` for all changes
3. Review error messages in browser console
4. Check `.env.example` for required variables
5. See comments in code files for implementation details

---

## You're All Set!

Your e-commerce app is now powered by Supabase & Razorpay with a modern checkout experience. Happy coding! 🚀
