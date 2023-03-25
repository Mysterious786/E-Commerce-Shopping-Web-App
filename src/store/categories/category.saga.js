
import { takeLatest,all,put,call } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesSuccess,fetchCategoriesFailed } from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.selector";
//Anywhere we have a function and we want to make it a effect use a call

  
export function* fetchCategoriesAsync(){
    try{
        const categoriesArray = yield call(getCategoriesAndDocuments,'categories');
          yield put(fetchCategoriesSuccess(categoriesArray));
       
       }catch(error){
        yield put(fetchCategoriesFailed(error));
     
           }
}


export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,fetchCategoriesAsync );//Here we receives actions... and if there are alot of bunch then give him the latest onee

}

export function* categoriesSaga(){
    

    yield all([call(onFetchCategories)]) // It is an effect that says run everything inside and only completes if everything is done...

}