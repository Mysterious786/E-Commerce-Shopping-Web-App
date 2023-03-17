// import { useContext } from 'react';
import './product-card.styles.scss';
import Button,{BUTTON_TYPE_CLASSES} from '../button/button.component';
// import { CartContext } from '../../contexts/cart.context';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { useSelector } from 'react-redux';
IMPORT {SELECT}


const ProductCard=({product})=>{
    //once we got the product from argument now we goona destructure the stuffs present in the product.json
    const {name,price,imageUrl}=product;
    const dispatch = useDispatch();
// const {addItemToCart}=useContext(CartContext);
const addProductToCart=()=>dispatch(addItemToCart(product));

return(<div className='product-card-container'>
    <img src={imageUrl} alt={`${name}`}/>
    <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
<Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
    </div>
</div>)
}
export default ProductCard;
//Every of our action needs a dispatch