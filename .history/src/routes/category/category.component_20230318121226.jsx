import { Fragment, useEffect ,useState} from 'react';
import './category.styles.scss';
import { useParams } from 'react-router-dom';
// import { CategoriesContext } from '../../contexts/categories.context';
import { useSelector } from 'react-redux';
//use param will allow us to get this value
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';
import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';
const Category=()=>{
const {category}=useParams();
// const {categoriesMap}=useContext(CategoriesContext);
const categoriesMap = useSelector(selectCategoriesMap);
const isLoading = useSelector(selectCategoriesIsLoading);

const [products,setProducts]=useState(categoriesMap[category]);
useEffect(() => {
    setProducts(categoriesMap[category]);

},[category,categoriesMap]);
return(
    <Fragment> 
    <h2 className='category-title'>{category.toUpperCase()}</h2>
    {
        isLoading ? Spinner :
    }
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