//React reselct library
import { createSelector } from "reselect";
//createSelector momoizes the value
export const CATEGORIES_ACTION_TYPES = {
    SET_CATEGORIES : 'category/SET_CATEGORIES_MAP',
    FETCH_CATEGORIES_START :'category/FETCH_CATEGORIES_START'
,    FETCH_CATEGORIES_SUCCESS :'category/FETCH_CATEGORIES_START'

}
//It takes two arguments the first is an array of input selector and second is the output selector

const selectCategoryReducer = (state)  => state.categories;
//Memoize selector it will run only if categorySlice object from this selector is different and if different it determines that yes it has to rerun.

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
)//Creating selector down to memoize 
//As long as the category array doenot change donot rerun this method 
//As long as it doenot chnage dont even bother it to re running it 
//Instead just give me the previously calculated value..

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories)=> categories.reduce((acc,category) => {
    
        //destructing off the data fro the snapshot
        const {title,items}=category;
        acc[title.toLowerCase()]=items;
        return acc;
    },{}))
// )(state) => { return state.categories.categories
// .reduce((acc,category) => {

//     //destructing off the data fro the snapshot
//     const {title,items}=category;
//     acc[title.toLowerCase()]=items;
//     return acc;
// },{});//always return a new object.
// Every time the selector runs the selectCategoriesMap runs
// which results in returning a new object
// Memoization is the process of caching the previous value so that if the input has not changed then we can return back the same output.