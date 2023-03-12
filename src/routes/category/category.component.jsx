import { Fragment, useContext, useEffect ,useState} from 'react';
import './category.styles.scss';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../contexts/categories.context';
//use param will allow us to get this value
import ProductCard from '../../components/product-card/product-card.component';
const Category=()=>{
const {category}=useParams();
const {categoriesMap}=useContext(CategoriesContext);
const [products,setProducts]=useState(categoriesMap[category]);
useEffect(() => {
    setProducts(categoriesMap[category]);

},[category,categoriesMap]);
return(
    <Fragment> 
    <h2 className='category-title'>{category.toUpperCase()}</h2>
    <div className='category-contanier'>
       
            {/* <h2 className='title'>{category}</h2> */}
            {/* //building safeguard */}
           {  products &&
            products.map((product)=> 
            (<ProductCard key={product.id} product={product}/>
            
            
            )
       ) }
    </div>
    </Fragment>
)
}
export default Category;