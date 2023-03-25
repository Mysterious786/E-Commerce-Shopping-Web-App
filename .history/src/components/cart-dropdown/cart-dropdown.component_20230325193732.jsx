import { useNavigate } from 'react-router-dom';
import { CartDropdownContainer,EmptyMessage,CartItems } from './cart-dropdown.styles';
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

const CartDropdown=()=>{
  
    const cartItems = useSelector(selectCartItems);
    const navigate=useNavigate();
    const goToCheckoutHandler=()=>{
        navigate('/checkout');
    };
    return(
        <CartDropdownContainer>
            <CartItems>
            {
                cartItems.length ?(cartItems.map((item)=><CartItem key={item.id} cartItem={item}/>)):
             (  <EmptyMessage>Your Cart is Empty</EmptyMessage> )
            } 
            
             </CartItems>
           
<Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
          
        </CartDropdownContainer>
    );
};
export default CartDropdown;