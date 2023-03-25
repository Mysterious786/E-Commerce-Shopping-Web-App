import { CATEGORIES_ACTION_TYPES } from "./category.selector";

export const CATEGORIES_INITIAL_STATE = {
    categories : [],
    isLoading
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE,action = {})=>{
    const {type,payload} = action;
    switch(type){
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
                return {...state,categories:payload};
        default:
            return state;
            }
}