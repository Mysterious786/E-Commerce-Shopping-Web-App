
import { createAction } from "../../utils/reducer/reducer.util";
import { CATEGORIES_ACTION_TYPES } from "./category.selector";

export const setCategories = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES,categoriesArray);
//This is a function that tells our redux store that we are going to fetch our categories
export const fetchCategoriesStart = () =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

//payload passing hbere is the category array
export const fetchCategoriesSuccess = (categoriesArray) =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,categoriesArray);

export const fetchCategoriesFailed = (error) =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,error);

//THUNK 
//This is an async function tht return a dispatch
