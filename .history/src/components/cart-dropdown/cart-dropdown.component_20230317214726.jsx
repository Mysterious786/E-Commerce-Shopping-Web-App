// import { useContext } from 'react';
//hook used to navigate used for check out pages
import { useNavigate } from 'react-router-dom';
// import { CartContext } from '../../contexts/cart.context';
import { CartDropdownContainer,EmptyMessage,CartItems } from './cart-dropdown.styles';
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component';
import { useSelector } from 'react-redux';
//motto how to add the cartItem into the drrop down....
import { selectCartItems } from '../../store/cart/cart.selector';

const CartDropdown=()=>{
    // const {cartItems}=useContext(CartContext);
    const cartItems = useSelector(selectCartItems)
    const navigate=useNavigate();
    const goToCheckoutHandler=()=>{
        navigate('/checkout');
    }
    return(
        <CartDropdownContainer>
            <CartItems>
            {
                cartItems.length ?(cartItems.map((item)=>(<CartItem key={item.id} cartItem={item}/>))):
             (  <EmptyMessage>Your Cart is Empty</EmptyMessage> )
            } 
            
             </CartItems>
            {/* {cartItems.map((item)=>(<CartItem key={item.id} cartItem={item}/>))} */}
<Button onClick={goToCheckoutHandler} >CHECKOUT</Button>
          
        </CartDropdownContainer>
    )
}
export default CartDropdown;