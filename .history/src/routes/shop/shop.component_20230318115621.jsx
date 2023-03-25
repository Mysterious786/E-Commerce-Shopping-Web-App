//Motto to list out all of the diiferent products
// import { useContext } from "react";
import './shop.style.scss'
//Generating preview for each of these hts,jeans .... from category-preview folder
//preview <4 in preview means it will only show less than 4 components but on clicking we will go to different routes
import { useEffect } from 'react';
// import ProductCard from "../../components/product-card/product-card.component";
 import CategoryPreview from "../../components/category-preview/category-preview.component";
// import { CategoriesContext } from "../../contexts/categories.context";
import { useDispatch } from 'react-redux';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import {Routes,Route} from 'react-router-dom';
import Category from '../category/category.component';
import {fetchCategoriesAsync} from '../../store/categories/category.action'
const Shop=()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const getCategoriesMap=async () => { 
          // const categoriesArray = await   getCategoriesAndDocuments('categories');
          //Storing new Categories Array in our reducer.
         
        dispatch(fetchCategoriesAsync());
        };

      //  getCategoriesMap();
    },[]);


    // const {categoriesMap}=useContext(CategoriesContext);
    return (
    //     // mapping through category context
    //     <div className="shop-container"> 
    //     {/* ///first it was name and price now we only need the products */}
    //     {
    //         Object.keys(categoriesMap).map(title => {
    //         const products=categoriesMap[title];
    //           return (<CategoryPreview key={title} title={title} products={products}/>
    //   )  })}
    //           </div>
       //its showing only in one page now we wan to change andhave route for each and every hats,men,women,jackets

       <Routes>
        <Route index element={<CategoryPreview/> }/>
       <Route path=":category" element={<Category/>}/>
       </Routes>
    );

};
//  {/* <div className="products-container">
         
//             {products.map((product)=>(
//               //product={product} -->passing down the product as a whole...

//                <ProductCard key={product.id} product={product}/>
//             ))}
//         </div> */}

export default Shop;
       
  