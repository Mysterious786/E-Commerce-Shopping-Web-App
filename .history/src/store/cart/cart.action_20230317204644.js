import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.util";

import { createContext ,useReducer } from "react";


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
 
  return cartItems.filter(cartItem=>cartItem.id!==cartItemToRemove.id);

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


const addItemToCart=(productToAdd)=>{
    const newCartItems = addCartItem(cartItems,productToAdd);
    updateCartItemsReducer(newCartItems);
  }
    
    const removeItemFromCart=(cartItemToRemove)=>{
      const newCartItems = removeCartItem(cartItems,cartItemToRemove);
      updateCartItemsReducer(newCartItems);  
    }
    
    
    
      const clearItemFromCart=(cartItemToClear)=>{
        const newCartItems = clearCartItem(cartItems,cartItemToClear);
        updateCartItemsReducer(newCartItems);  
      }
  