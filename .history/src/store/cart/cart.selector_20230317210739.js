import { createSelector } from "reselect";
 
//making cart slice
const selectCart

const newCartCount=cartItems.reduce(
    (total,cartItem)=>total+cartItem.quantity,
    0
    );



   const newCartTotal=cartItems.reduce(
    (total,cartItem)=>total+cartItem.quantity*cartItem.price,
    0
    );
