import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import './checkout-tem.styles.scss'
// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context';
import { selectCartItems,selectCartTotal } from '../../store/cart/cart.selector';
import { useSelector } from 'react-redux';
//inside checkout item we need cartItem


const CheckOutItem=({cartItem})=>{
const {name,imageUrl,price,quantity}=cartItem;
const {clearItemFromCart,addItemToCart,removeItemFromCart}=useContext(CartContext);
//handler function that handles clearItemFromCart
//ancel 'x' made from this
const clearItemHandler=()=>clearItemFromCart(cartItem);
const addItemHandler=()=>addItemToCart(cartItem);
const removeItemHandler=()=>removeItemFromCart(cartItem);

return(
<div className='checkout-item-container'>
    <div className='image-container'>
        <img src={imageUrl} alt={`${name}`}/>
    </div>
    <span className='name'>{name}</span>
    <span className='quantity'>
    <div className='arrow' onClick={removeItemHandler}>
    &#10094;
    </div>
    {quantity}
    <div className='arrow' onClick={addItemHandler}>
    &#10095;
</div>
    </span>
    <span className='price'>{price}</span>
    <div className='remove-button'onClick={clearItemHandler}>&#10005;</div>
</div>
);
}
export default CheckOutItem;