import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { initiateRazorpayPayment, RAZORPAY_KEY_ID } from '../../utils/razorpay/razorpay.utils';
import { updatePaymentStatus } from '../../utils/supabase/supabase.client';
import './payment-form.styles.scss';

const PaymentFormRazorpay = ({ 
  cartTotal, 
  cartItems, 
  shippingAddress,
  onOrderCreated,
  currentUser 
}) => {
  const user = useSelector(selectCurrentUser) || currentUser;
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!RAZORPAY_KEY_ID) {
      setPaymentError('Razorpay is not configured. Please contact support.');
      return;
    }

    setIsProcessingPayment(true);
    setPaymentError(null);

    try {
      // First, create order in database
      const orderData = {
        userId: user?.id || 'guest-' + Date.now(),
        items: cartItems,
        totalPrice: cartTotal,
        shippingAddress,
      };

      // Call your backend API to create order and get order ID
      const createOrderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!createOrderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const { orderId } = await createOrderResponse.json();

      // Initiate Razorpay payment
      const paymentResult = await initiateRazorpayPayment({
        key: RAZORPAY_KEY_ID,
        amount: cartTotal,
        currency: 'INR',
        orderId,
        customerName: shippingAddress.fullName,
        customerEmail: shippingAddress.email,
        customerPhone: shippingAddress.phone,
        onSuccess: async (response) => {
          console.log('[v0] Payment successful:', response);
          setPaymentSuccess(true);
          
          // Verify payment signature on backend
          try {
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            if (verifyResponse.ok) {
              // Update order status to confirmed
              await updatePaymentStatus(orderId, 'confirmed', response.razorpay_payment_id);
              onOrderCreated(orderId);
            }
          } catch (error) {
            console.error('[v0] Verification error:', error);
            setPaymentError('Payment verified but there was an issue updating your order. Please contact support.');
          }
        },
        onError: (error) => {
          console.error('[v0] Payment failed:', error);
          setPaymentError(error || 'Payment failed. Please try again.');
        },
      });
    } catch (error) {
      console.error('[v0] Payment error:', error);
      setPaymentError(error.message || 'An error occurred while processing payment');
      setIsProcessingPayment(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className='payment-form-container success'>
        <div className='success-message'>
          <h3>Payment Processing</h3>
          <p>Your payment is being processed. You will be redirected shortly...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='payment-form-container'>
      <form onSubmit={handlePayment}>
        <h3>Complete Your Payment</h3>

        {paymentError && (
          <div className='error-message'>
            <span className='error-icon'>✕</span>
            {paymentError}
          </div>
        )}

        <div className='payment-summary'>
          <div className='summary-row'>
            <span>Subtotal:</span>
            <span>₹{cartTotal}</span>
          </div>
          <div className='summary-row'>
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className='summary-row total'>
            <span>Total Amount:</span>
            <span>₹{cartTotal}</span>
          </div>
        </div>

        <div className='shipping-info'>
          <h4>Shipping to</h4>
          <p>{shippingAddress.fullName}</p>
          <p>{shippingAddress.address}</p>
          <p>
            {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
          </p>
          <p>{shippingAddress.country}</p>
        </div>

        <div className='payment-info'>
          <p className='info-text'>
            Click below to securely process your payment with Razorpay
          </p>
          <button 
            type='submit' 
            className='payment-button'
            disabled={isProcessingPayment}
          >
            {isProcessingPayment ? (
              <>
                <span className='spinner'></span>
                Processing Payment...
              </>
            ) : (
              `Pay ₹${cartTotal} with Razorpay`
            )}
          </button>
          <p className='security-notice'>
            Your payment information is secure and encrypted
          </p>
        </div>
      </form>
    </div>
  );
};

export default PaymentFormRazorpay;
