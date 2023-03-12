import { createContext , useState,useEffect,useReducer } from "react";
const addCartItem=(cartItems,productToAdd)=>{
  //find if cartItms contains product to add.
  //if found increment quantity
  //return new array with modified cartItems /new CartItem
 //case1 :existing product :
 //use .find method to find .... this will return a boolean value 

 const existingCartItem=cartItems.find((cartItem)=>cartItem.id===productToAdd.id);
 
 //now if it existing item is found..
 if(existingCartItem){
  return cartItems.map((cartItem)=>cartItem.id===productToAdd.id
  ?{ ...cartItem,quantity:cartItem.quantity+1}:cartItem);

 }
 
 
  //if the product is new we will make it to new including all the past cartItems that were already present in the cart
//to do this we will make a new array and spread
//all the existing cartItem using... <-
//making new cartItem having all the fields of product to add using...

  return [...cartItems,{ ...productToAdd,quantity:1}];

};
const removeCartItem=(cartItems,cartItemToRemove)=>{
  //find the cart item to remove
  //check if the quantity is equal to 1 and if it is remove that item from the cart
  //return back cartItem with matching cart Item with reduced quantity
  const existingCartItem=cartItems.find(
    (cartItem)=>cartItem.id===cartItemToRemove.id);
if(existingCartItem.quantity===1){
  //we will removing the item whose value equal to
  //the cartitem id and the product or item that to be removed id.
  //so we will be filtering those items...
//if quantity matched with one then we filter it
  return cartItems.filter(cartItem=>cartItem.id!==cartItemToRemove.id);

}
//return back cartItem with matching item with reduced quantity

return cartItems.map((cartItem)=>
cartItem.id===cartItemToRemove.id?
{ ...cartItem,quantity:cartItem.quantity-1}
:cartItem
);

};
//it will take cartItem since we have to utilize this cart item to give us back
//new cart item
//if the cart item that we are going to clear is eqaul 
//the item that already there then just filter out completely

const clearCartItem=(cartItems,cartItemToClear)=>cartItems.filter(cartItem=>cartItem.id!==cartItemToClear.id);





export const CartContext=createContext({ 
    isCartOpen:false,
    setIsCartOpen:()=>{},
    cartItems:[],
    addItemToCart:()=>{},
    removeItemFromCart:()=>{},
    clearItemFromCart:()=>{},
    cartCount:0,
    cartTotal:0
});
//Firstly always create an initial state object

const INITIAL_STATE ={
  cartCount:0,
  cartTotal:0,
  cartItems:[],
  isCartOpen:false,
};

const cartReducer = (state,action) =>{
  //always destructure two properties that is type and payload

  const {type,payload} = action;

  switch(type){
     case 'SET_CART_ITEMS' :
      return {
        ...state,
        ...payload
      }
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`)
  }
}

// export const CartProvider=({children})=>{
//     const [isCartOpen,setIsCartOpen]=useState(false);
//    const [cartItems,setCartItems]=useState([]);
//    const [cartCount,setCartCount]=useState(0);
//    const [cartTotal,setCartTotal]=useState(0);
//    //useeffect always run whenver something in ur dependency array changes
//    //consits of a callback
//    //whenever the carItem changes we have to recalculate the cart count

const {state,dispatch} =

//    useEffect(()=>{
// const newCartCount=cartItems.reduce((total,cartItem)=>total+cartItem.quantity,0)
//   setCartCount(newCartCount) },[cartItems]);

//   useEffect(()=>{
//   const newCartTotal=cartItems.reduce((total,cartItem)=>total+cartItem.quantity*cartItem.price,0);
//   setCartTotal(newCartTotal) },[cartItems]);

const updateCartItemsReducer = (newCartItems) =>{
  const newCartCount=cartItems.reduce(
    (total,cartItem)=>total+cartItem.quantity,0)
  const newCartTotal=cartItems.reduce(
    (total,cartItem)=>total+cartItem.quantity*cartItem.price,0);


}

const addItemToCart=(productToAdd)=>{
  const newCartItems = (addCartItem(cartItems,productToAdd));
  updateCartItemsReducer(newCartItems);
}
  
  const removeItemFromCart=(cartItemToRemove)=>{
    const newCartItems = (removeCartItem(cartItems,cartItemToRemove));
    updateCartItemsReducer(newCartItems);  
  }
  
  
  
    const clearItemFromCart=(cartItemToClear)=>{
      const newCartItems = (clearCartItem(cartItems,cartItemToClear));
      updateCartItemsReducer(newCartItems);  
    }


  














//add item to cart always gets triggers whenever a user click on add to cart.
// const addItemToCart=(productToAdd)=>{
// setCartItems(addCartItem(cartItems,productToAdd));
// }

// const removeItemFromCart=(cartItemToRemove)=>{
//   setCartItems(removeCartItem(cartItems,cartItemToRemove));
//   }



//   const clearItemFromCart=(cartItemToClear)=>{
//     setCartItems(clearCartItem(cartItems,cartItemToClear));
//     }



 const value={isCartOpen , setIsCartOpen,addItemToCart,removeItemFromCart,clearItemFromCart,cartItems,cartCount,cartTotal};
    return(
      <CartContext.Provider value={value}>{children} </CartContext.Provider>  
    )
}
// product:
// IdleDeadline,
// name,
// price,
// imageUrl
//Reducers only stores readable values.