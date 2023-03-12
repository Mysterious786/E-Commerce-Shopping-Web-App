import './cart-item.styles.scss';
//name will come from the cart item that we are passing..

const CartItem=({cartItem })=>{
      // destructuring the name and quantitity to prevent using . always...
      
    const {name,quantity,price,imageUrl}=cartItem;
return(
    <div className='cart-item-container'>
    
      <img src={imageUrl} alt={`${name}`}/>
      <div className='item-details' >
      <span className='name' >{name}</span>
  <span  className='price' >{quantity} x ${price}</span>
      </div>
    
    </div>
)
}
export default CartItem;