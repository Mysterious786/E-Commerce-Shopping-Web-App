import { combineReducers } from "redux";
//combine reducer is a method that helps in creating a final big reducer
//our reducer will get every single action that get dispatched
 import { categoriesReducer } from "./categories/category.reducer";
import { userReducer } from "./user/user.reducer"; 
export const rootReducer = combineReducers({
    user:userReducer,
    categories : categoriesReducer
 })
 //Now we got our category reducer now we want to create an action
 //Action will update the category
 //just like we did it with user