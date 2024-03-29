import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.util";



const addCartItem=(cartItems,productToAdd)=>{
 const existingCartItem=cartItems.find((cartItem)=>cartItem.id===productToAdd.id);
 

 if(existingCartItem){
  return cartItems.map((cartItem)=>cartItem.id===productToAdd.id
  ?{ ...cartItem,quantity:cartItem.quantity+1}:cartItem);

 }
 
 
  

  return [...cartItems,{ ...productToAdd,quantity:1}];

};
const removeCartItem=(cartItems,cartItemToRemove)=>{
 
  const existingCartItem=cartItems.find(
    (cartItem)=>cartItem.id===cartItemToRemove.id);
if(existingCartItem.quantity===1){
 
  return cartItems.filter((cartItem)=>cartItem.id!==cartItemToRemove.id);

}


return cartItems.map((cartItem)=>
cartItem.id===cartItemToRemove.id?
{ ...cartItem,quantity:cartItem.quantity-1}
:cartItem
);

};

const clearCartItem=
(cartItems,cartItemToClear)=>
cartItems.filter(cartItem=>cartItem.id!==cartItemToClear.id);




export const setIsCartOpen = (boolean) => 
createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,boolean);

//These below are the action creators that we made in order to replicate our previous behaviour in our context.

export const addItemToCart=(cartItems,productToAdd)=>{
    const newCartItems = addCartItem(cartItems,productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
  };
    
 export  const removeItemFromCart=(cartItems,cartItemToRemove)=>{
      const newCartItems = removeCartItem(cartItems,cartItemToRemove);
      //To generate the action we need the action updateCartItemsReducer(newCartItems);  
      return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
    };
    
    
    //Passing state...
    export  const clearItemFromCart=(cartItems,cartItemToClear)=>{
        const newCartItems = clearCartItem(cartItems,cartItemToClear);
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
      };
  