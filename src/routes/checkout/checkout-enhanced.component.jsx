import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { createOrderStart } from '../../store/orders/orders.action';
import PaymentForm from '../../components/payment-form/payment-form.component';
import CheckOutItem from '../../components/checkout-item/checkout-item.component';
import './checkout-enhanced.styles.scss';

const CheckoutEnhanced = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const [step, setStep] = useState('cart'); // cart, review, shipping, payment, confirmation
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [createdOrderId, setCreatedOrderId] = useState(null);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateShippingForm = () => {
    const errors = {};
    
    if (!shippingAddress.fullName.trim()) errors.fullName = 'Full name is required';
    if (!shippingAddress.email.trim()) errors.email = 'Email is required';
    if (!shippingAddress.phone.trim()) errors.phone = 'Phone is required';
    if (!shippingAddress.address.trim()) errors.address = 'Address is required';
    if (!shippingAddress.city.trim()) errors.city = 'City is required';
    if (!shippingAddress.state.trim()) errors.state = 'State is required';
    if (!shippingAddress.zipCode.trim()) errors.zipCode = 'Zip code is required';
    if (!shippingAddress.country.trim()) errors.country = 'Country is required';

    if (!/^\d{10}$/.test(shippingAddress.phone.replace(/\D/g, ''))) {
      errors.phone = 'Phone must be 10 digits';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingAddress.email)) {
      errors.email = 'Invalid email address';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinueToReview = () => {
    setStep('review');
  };

  const handleContinueToShipping = () => {
    setStep('shipping');
  };

  const handleContinueToPayment = () => {
    if (validateShippingForm()) {
      setStep('payment');
    }
  };

  const handleOrderCreated = (orderId) => {
    setCreatedOrderId(orderId);
    setStep('confirmation');
  };

  const handleBackToCart = () => {
    setStep('cart');
  };

  const handleBackToReview = () => {
    setStep('review');
  };

  const handleBackToShipping = () => {
    setStep('shipping');
  };

  if (cartItems.length === 0) {
    return (
      <div className='checkout-container'>
        <div className='empty-cart'>
          <h2>Your cart is empty</h2>
          <p>Add items to proceed with checkout</p>
        </div>
      </div>
    );
  }

  return (
    <div className='checkout-container'>
      {/* Progress Steps */}
      <div className='progress-steps'>
        <div className={`step ${step === 'cart' ? 'active' : step === 'review' || step === 'shipping' || step === 'payment' || step === 'confirmation' ? 'completed' : ''}`}>
          <span className='step-number'>1</span>
          <span className='step-label'>Cart</span>
        </div>
        <div className={`step ${step === 'review' ? 'active' : step === 'shipping' || step === 'payment' || step === 'confirmation' ? 'completed' : ''}`}>
          <span className='step-number'>2</span>
          <span className='step-label'>Review</span>
        </div>
        <div className={`step ${step === 'shipping' ? 'active' : step === 'payment' || step === 'confirmation' ? 'completed' : ''}`}>
          <span className='step-number'>3</span>
          <span className='step-label'>Shipping</span>
        </div>
        <div className={`step ${step === 'payment' ? 'active' : step === 'confirmation' ? 'completed' : ''}`}>
          <span className='step-number'>4</span>
          <span className='step-label'>Payment</span>
        </div>
        <div className={`step ${step === 'confirmation' ? 'active' : ''}`}>
          <span className='step-number'>5</span>
          <span className='step-label'>Confirmation</span>
        </div>
      </div>

      {/* Cart Review Step */}
      {step === 'cart' && (
        <div className='checkout-step'>
          <h2>Your Cart</h2>
          <div className='checkout-header'>
            <div className='header-block'>
              <span>Product</span>
            </div>
            <div className='header-block'>
              <span>Description</span>
            </div>
            <div className='header-block'>
              <span>Quantity</span>
            </div>
            <div className='header-block'>
              <span>Price</span>
            </div>
            <div className='header-block'>
              <span>Remove</span>
            </div>
          </div>

          {cartItems.map((cartItem) => (
            <CheckOutItem key={cartItem.id} cartItem={cartItem} />
          ))}

          <div className='summary-section'>
            <div className='total'>
              <span>Subtotal:</span>
              <span>${cartTotal}</span>
            </div>
            <div className='shipping-estimate'>
              <span>Estimated Shipping:</span>
              <span>Free</span>
            </div>
            <div className='total-final'>
              <span>Total:</span>
              <span>${cartTotal}</span>
            </div>
          </div>

          <div className='step-actions'>
            <button className='btn-primary' onClick={handleContinueToReview}>
              Continue to Review
            </button>
          </div>
        </div>
      )}

      {/* Order Review Step */}
      {step === 'review' && (
        <div className='checkout-step'>
          <h2>Order Review</h2>
          <div className='review-section'>
            <h3>Items in Your Order</h3>
            <div className='review-items'>
              {cartItems.map((item) => (
                <div key={item.id} className='review-item'>
                  {item.imageUrl && <img src={item.imageUrl} alt={item.name} />}
                  <div className='item-details'>
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className='review-summary'>
              <h3>Order Summary</h3>
              <div className='summary-row'>
                <span>Subtotal:</span>
                <span>${cartTotal}</span>
              </div>
              <div className='summary-row'>
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className='summary-row total-row'>
                <span>Total:</span>
                <span>${cartTotal}</span>
              </div>
            </div>
          </div>

          <div className='step-actions'>
            <button className='btn-secondary' onClick={handleBackToCart}>
              Back to Cart
            </button>
            <button className='btn-primary' onClick={handleContinueToShipping}>
              Continue to Shipping
            </button>
          </div>
        </div>
      )}

      {/* Shipping Address Step */}
      {step === 'shipping' && (
        <div className='checkout-step'>
          <h2>Shipping Address</h2>
          <form className='shipping-form'>
            <div className='form-group'>
              <label>Full Name *</label>
              <input
                type='text'
                name='fullName'
                value={shippingAddress.fullName}
                onChange={handleAddressChange}
                placeholder='Enter your full name'
                className={validationErrors.fullName ? 'error' : ''}
              />
              {validationErrors.fullName && (
                <span className='error-message'>{validationErrors.fullName}</span>
              )}
            </div>

            <div className='form-row'>
              <div className='form-group'>
                <label>Email *</label>
                <input
                  type='email'
                  name='email'
                  value={shippingAddress.email}
                  onChange={handleAddressChange}
                  placeholder='your@email.com'
                  className={validationErrors.email ? 'error' : ''}
                />
                {validationErrors.email && (
                  <span className='error-message'>{validationErrors.email}</span>
                )}
              </div>

              <div className='form-group'>
                <label>Phone *</label>
                <input
                  type='tel'
                  name='phone'
                  value={shippingAddress.phone}
                  onChange={handleAddressChange}
                  placeholder='10-digit phone number'
                  className={validationErrors.phone ? 'error' : ''}
                />
                {validationErrors.phone && (
                  <span className='error-message'>{validationErrors.phone}</span>
                )}
              </div>
            </div>

            <div className='form-group'>
              <label>Street Address *</label>
              <input
                type='text'
                name='address'
                value={shippingAddress.address}
                onChange={handleAddressChange}
                placeholder='123 Main St'
                className={validationErrors.address ? 'error' : ''}
              />
              {validationErrors.address && (
                <span className='error-message'>{validationErrors.address}</span>
              )}
            </div>

            <div className='form-row'>
              <div className='form-group'>
                <label>City *</label>
                <input
                  type='text'
                  name='city'
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                  placeholder='City'
                  className={validationErrors.city ? 'error' : ''}
                />
                {validationErrors.city && (
                  <span className='error-message'>{validationErrors.city}</span>
                )}
              </div>

              <div className='form-group'>
                <label>State *</label>
                <input
                  type='text'
                  name='state'
                  value={shippingAddress.state}
                  onChange={handleAddressChange}
                  placeholder='State'
                  className={validationErrors.state ? 'error' : ''}
                />
                {validationErrors.state && (
                  <span className='error-message'>{validationErrors.state}</span>
                )}
              </div>
            </div>

            <div className='form-row'>
              <div className='form-group'>
                <label>Zip Code *</label>
                <input
                  type='text'
                  name='zipCode'
                  value={shippingAddress.zipCode}
                  onChange={handleAddressChange}
                  placeholder='Zip Code'
                  className={validationErrors.zipCode ? 'error' : ''}
                />
                {validationErrors.zipCode && (
                  <span className='error-message'>{validationErrors.zipCode}</span>
                )}
              </div>

              <div className='form-group'>
                <label>Country *</label>
                <input
                  type='text'
                  name='country'
                  value={shippingAddress.country}
                  onChange={handleAddressChange}
                  placeholder='Country'
                  className={validationErrors.country ? 'error' : ''}
                />
                {validationErrors.country && (
                  <span className='error-message'>{validationErrors.country}</span>
                )}
              </div>
            </div>
          </form>

          <div className='step-actions'>
            <button className='btn-secondary' onClick={handleBackToReview}>
              Back to Review
            </button>
            <button className='btn-primary' onClick={handleContinueToPayment}>
              Continue to Payment
            </button>
          </div>
        </div>
      )}

      {/* Payment Step */}
      {step === 'payment' && (
        <div className='checkout-step'>
          <h2>Payment</h2>
          <PaymentForm
            cartTotal={cartTotal}
            cartItems={cartItems}
            shippingAddress={shippingAddress}
            onOrderCreated={handleOrderCreated}
            currentUser={currentUser}
          />

          <div className='step-actions'>
            <button className='btn-secondary' onClick={handleBackToShipping}>
              Back to Shipping
            </button>
          </div>
        </div>
      )}

      {/* Order Confirmation Step */}
      {step === 'confirmation' && (
        <div className='checkout-step confirmation'>
          <div className='success-icon'>✓</div>
          <h2>Order Confirmed!</h2>
          <p>Thank you for your order</p>
          <div className='order-details'>
            <p><strong>Order ID:</strong> #{createdOrderId}</p>
            <p><strong>Total Amount:</strong> ${cartTotal}</p>
            <p><strong>Shipping To:</strong> {shippingAddress.fullName}</p>
            <p><strong>Email:</strong> {shippingAddress.email}</p>
          </div>
          <p className='tracking-info'>You will receive tracking information at your email shortly.</p>
          <div className='step-actions'>
            <button className='btn-primary' onClick={() => window.location.href = '/shop'}>
              Continue Shopping
            </button>
            <button className='btn-secondary' onClick={() => window.location.href = '/order-history'}>
              View Order History
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutEnhanced;
