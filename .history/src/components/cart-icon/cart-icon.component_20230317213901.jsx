// import{ReactComponent as ShoppingIcon} from '../../assests/shopping-bag (1).svg';
import { useDispatch,useSelector } from 'react-redux';
import { ShoppingIcon,ItemCount,CartIconContainer } from './cart-icon.styles';
// import { CartContext } from '../../contexts/cart.context';
import { selectCartCount,selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { useContext } from 'react';
const CartIcon=()=>{
    // const {isCartOpen,setIsCartOpen,cartCount}=useContext(CartContext )
    //Now getting cartcount value...
    const cartCount = useSelector(selectCartCount);
//Now we also need our dispatch since we will be dispatching our action creator
const dispatch = useDispatch9
;    const toggleIsCartOpen=()=>setIsCartOpen(!isCartOpen);



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