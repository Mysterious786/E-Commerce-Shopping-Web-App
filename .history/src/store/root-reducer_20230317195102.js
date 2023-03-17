import { combineReducers } from "redux";
//combine reducer is a method that helps in creating a final big reducer
//our reducer will get every single action that get dispatched
 import { categoriesReducer } from "./categories/category.reducer";
import { userReducer } from "./user/user.reducer"; 
import { cartReducer } from "./cart/cart.reducer";
export const rootReducer = combineReducers({
    user:userReducer,
    categories : categoriesReducer,
    cart: cartReducer
 })
 //Now we got our category reducer now we want to create an action
 //Action will update the category
 //just like we did it with user
 //Whenever root reducer updates any of these value the entire store object is going to be a new store object.
 //categoriesReducer one is the same one in the memory whereas the category reducer one is the new one
 //Root Reducer gets updated depending on the value whivh each reducer gives
 //Middleware gets done with the action calls next() middleware 2 if it exists 