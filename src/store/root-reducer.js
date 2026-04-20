import { combineReducers } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categories/category.reducer";
import { userReducer } from "./user/user.reducer"; 
import { cartReducer } from "./cart/cart.reducer";
import { ordersReducer } from "./orders/orders.reducer";

export const rootReducer = combineReducers({
    user:userReducer,
    categories : categoriesReducer,
    cart: cartReducer,
    orders: ordersReducer,
 });
 
