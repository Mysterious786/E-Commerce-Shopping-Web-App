import { createSelector } from "reselect";
 
//making cart slice
const selectCartReducer = state => state.cart;

export const selectCartItems = createSelector(
[selectCartReducer],
(cart)=> cart.cartItems

)

export const selectIsCartOpen = createSelector(
[selectCartReducer],
(cart) => cart.isCartOpen

);
export const selectCartCount = create


const newCartCount=cartItems.reduce(
    (total,cartItem)=>total+cartItem.quantity,
    0
    );



   const newCartTotal=cartItems.reduce(
    (total,cartItem)=>total+cartItem.quantity*cartItem.price,
    0
    );
