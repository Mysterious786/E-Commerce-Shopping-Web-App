// import { useContext } from 'react';
import './product-card.styles.scss';
import Button,{BUTTON_TYPE_CLASSES} from '../button/button.component';
import { CartContext } from '../../contexts/cart.context';
const ProductCard=({product})=>{
    //once we got the product from argument now we goona destructure the stuffs present in the product.json
    const {name,price,imageUrl}=product;
const {addItemToCart}=useContext(CartContext);
const addProductToCart=()=>addItemToCart(product);

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