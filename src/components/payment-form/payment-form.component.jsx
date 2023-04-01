import { useState } from 'react';
import { CardElement, useStripe,useElements } from '@stripe/react-stripe-js';
import {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { PaymentFormContainer,FormContainer,PaymentButton } from './payment-form.styles.component';
const PaymentForm = () =>{
const stripe = useStripe();
const elements = useElements();
const amount = useSelector(selectCartTotal);
const currentUser = useSelector(selectCurrentUser);
const [isProcessingPayment, setIsProcessignPayment]= useState(false);
const paymentHandler = async(e) =>{
    e.preventDefault();
    if(!stripe || !elements) {
        return;
    }
    setIsProcessignPayment(true);
//payment intent
//writting netlify
//passing amount request in our netlify value
//passing fetch object...
const response = await fetch('/.netlify/functions/create-payment-intent',{
method : 'post',
headers:{
   'Content-Type' : 'application/json',
},
body:JSON.stringify({amount : amount*100}),
}).then((res) =>{ res.json()});

// const clientSecret = response.paymentIntent.client_secret

const clientSecret = response.paymentIntent.client_secret;
const paymentResult = await stripe.confirmCardPayment(clientSecret,{
    payment_method: {
        card: elements.getElement(CardElement),
        billing_details:{
            name:currentUser ? currentUser.displayName : 'Guest',
        },
    },
});
setIsProcessignPayment(false);
if(paymentResult.error){
    alert(paymentResult.error.message)
}
else{
    if(paymentResult.paymentIntent.status === 'succeeded'){
        alert('Payment Successful! ');
    }
}
};

//we need the client secret 
    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
            <CardElement/>
            <PaymentButton isLoading={isProcessingPayment} button={BUTTON_TYPE_CLASSES.inverted}>
              Pay now  
            </PaymentButton>
        </FormContainer>

        </PaymentFormContainer>
    );
};
export default PaymentForm;