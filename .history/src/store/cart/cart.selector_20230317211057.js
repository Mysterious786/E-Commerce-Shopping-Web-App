import { createSelector } from "reselect";
 
//making cart slice
const selectCartReducer = state => state.cart;

export const seelect
const newCartCount=cartItems.reduce(
    (total,cartItem)=>total+cartItem.quantity,
    0
    );



   const newCartTotal=cartItems.reduce(
    (total,cartItem)=>total+cartItem.quantity*cartItem.price,
    0
    );
