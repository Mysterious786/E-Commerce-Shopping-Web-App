
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
   
};
  
export function*


export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, )//Here we receives actions... and if there are alot of bunch then give him the latest onee

}

export function* categoriesSaga(){
    //It says to provide him the array of different things...

    yield all([]) // It is an effect that says run everything inside and only completes if everything is done...

}