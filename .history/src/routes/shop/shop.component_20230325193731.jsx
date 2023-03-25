
import './shop.style.scss'

import { useEffect } from 'react';

 import CategoriesPreview from '../categories-preview/categories-preview.component';

import { useDispatch } from 'react-redux';

import {Routes,Route} from 'react-router-dom';
import Category from '../category/category.component';
import {fetchCategoriesStart} from '../../store/categories/category.action'


const Shop=()=>{
    const dispatch = useDispatch();
   
        
          useEffect(()=>{
        dispatch(fetchCategoriesStart());//A normal component that triggers when the moment this component mounts
 },[dispatch]);
        
   


   
    return (

       <Routes>
        <Route index element={<CategoriesPreview/> }/>
       <Route path=':category' element={<Category/>}/>
       </Routes>
    );

};


export default Shop;
       
  