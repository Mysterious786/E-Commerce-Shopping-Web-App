// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import { useSelector } from 'react-redux';
import './checkout.styles.scss'
//importing things below to export things from cartContext and cartItem the values
import CheckOutItem from '../../components/checkout-item/checkout-item.component';
const Checkout=()=>{
    // const {cartItems,cartTotal}=useContext(CartContext);
const cartItems = useSelector(selectCartItems);
const cartTotal = useSelector()
    return( 
    <div className='checkout-container'>
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
    
    {cartItems.map((cartItem)=> (
    <CheckOutItem key={cartItem.id} cartItem={cartItem}/>
    
    
)
    )}
    <span className='total'>Total : ${cartTotal}</span>
    </div>
    
    );
   
};
export default  Checkout;