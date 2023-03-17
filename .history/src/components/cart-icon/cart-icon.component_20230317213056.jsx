// import{ReactComponent as ShoppingIcon} from '../../assests/shopping-bag (1).svg';
import { useDispatch,useSele } from 'react-redux';
import { ShoppingIcon,ItemCount,CartIconContainer } from './cart-icon.styles';
// import { CartContext } from '../../contexts/cart.context';

import { useContext } from 'react';
const CartIcon=()=>{
    const {isCartOpen,setIsCartOpen,cartCount}=useContext(CartContext )
const toggleIsCartOpen=()=>setIsCartOpen(!isCartOpen);



    return(
        //functionality of drop down.... important
    <CartIconContainer onClick={toggleIsCartOpen}>

        <ShoppingIcon className='shopping-icon'/>
        {/* now we want a span to get the number of icon added to the cart..
         */}
         <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
)
}
export default CartIcon;