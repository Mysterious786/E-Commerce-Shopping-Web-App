
import {take}








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