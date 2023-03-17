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
  