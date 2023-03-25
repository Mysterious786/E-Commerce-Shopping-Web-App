
import { takeLatest,all,put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesSuccess,fetchCategoriesFailure } from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.selector";



export const fetchCategoriesAsync = () => async(dispatch)=>{
    dispatch(fetchCategoriesStart());
    
    try{
 const categoriesArray = await getCategoriesAndDocuments('categories');
    //If it success then we are gonna pass he actual category array..

 dispatch(fetchCategoriesSuccess(categoriesArray));
}catch(error){
//If there will be an error then we will run our fetchCategories failed
//And pass the error
dispatch(fetchCategoriesFailure(error));
    }
   
}
export function* categoriesSaga(){
    //
    yield all([]) // It is an effect that says run everything inside and only completes if everything is done...

}