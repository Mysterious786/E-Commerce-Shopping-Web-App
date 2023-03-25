//Motto to list out all of the diiferent products
import { Fragment } from "react";
import {useSelector} from 'react-redux';
// import './categories-preview.styles.scss'
//Generating preview for each of these hts,jeans .... from category-preview folder
//preview <4 in preview means it will only show less than 4 components but on clicking we will go to different routes
import { selectCategoriesMap,selectCategoriesIsLoading } from "../../store/categories/category.selector";
import Spinner from "../../components/spinner/spinner.component";
// import ProductCard from "../../components/product-card/product-card.component";
import CategoriesPreview from "../../components/category-preview/category-preview.component";
// import { CategoriesContext } from "../../contexts/categories.context";
const CategoryPreview=()=>{
    // const {categoriesMap}=useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap);
   const isLoading = useSelector(selectCategoriesIsLoading)
    return (
        // mapping through category context
        <Fragment> 
        {/* ///first it was name and price now we only need the products */}
        {
            Object.keys(categoriesMap).map(title => {
            const products=categoriesMap[title];
              return (<CategoryPreview key={title} title={title} products={products}/>
      )  })}
              </Fragment>
       //its showing only in one page now we wan to change andhave route for each and every hats,men,women,jackets

    );

};
//  {/* <div className="products-container">
         
//             {products.map((product)=>(
//               //product={product} -->passing down the product as a whole...

//                <ProductCard key={product.id} product={product}/>
//             ))}
//         </div> */}

export default CategoriesPreview;
       
  