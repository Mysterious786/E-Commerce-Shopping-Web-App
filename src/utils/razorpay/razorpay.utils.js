// Razorpay configuration and utilities
// Razorpay is a free-tier payment provider that supports Indian payments and more

export const RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID;

if (!RAZORPAY_KEY_ID) {
  console.warn('Razorpay Key ID not configured. Payment features will not work.');
}

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const initiateRazorpayPayment = async (options) => {
  const loaded = await loadRazorpayScript();
  
  if (!loaded) {
    throw new Error('Failed to load Razorpay script');
  }

  return new Promise((resolve, reject) => {
    const {
      key,
      amount,
      currency = 'INR',
      orderId,
      customerName,
      customerEmail,
      customerPhone,
      onSuccess,
      onError,
    } = options;

    const razorpayOptions = {
      key,
      amount: amount * 100, // Razorpay accepts amount in paise
      currency,
      name: 'Our E-Commerce Store',
      description: `Order #${orderId}`,
      order_id: orderId,
      prefill: {
        name: customerName,
        email: customerEmail,
        contact: customerPhone,
      },
      handler: function (response) {
        resolve({
          success: true,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
        });
        if (onSuccess) onSuccess(response);
      },
      modal: {
        ondismiss: function () {
          reject(new Error('Payment cancelled by user'));
          if (onError) onError('Payment cancelled');
        },
      },
    };

    const razorpay = new window.Razorpay(razorpayOptions);
    razorpay.open();
  });
};

export const verifyPaymentSignature = async (
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature
) => {
  try {
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      }),
    });

    if (!response.ok) {
      throw new Error('Payment verification failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

// Utility to format amount for display
export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
  }).format(amount);
};
