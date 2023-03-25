// import{ReactComponent as ShoppingIcon} from '../../assests/shopping-bag (1).svg';
import { useDispatch,useSelector } from 'react-redux';
import { ShoppingIcon,ItemCount,CartIconContainer } from './cart-icon.styles';

import { selectCartCount,selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartIcon=()=>{

    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);



    const isCartOpen = useSelector(selectIsCartOpen);

const toggleIsCartOpen=()=>dispatch(setIsCartOpen(!isCartOpen));



    return(

    <CartIconContainer onClick={toggleIsCartOpen}>

        <ShoppingIcon className='shopping-icon'/>

         <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
);
};
export default CartIcon;