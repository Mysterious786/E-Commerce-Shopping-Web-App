// import Directory from './components/category-item/categories-menu.components';
import Home from "./routes/home/home.components";
import {Routes,Route } from 'react-router-dom';
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
// import { getCurrentUser } from "./utils/firebase/firebase.utils";
import { checkUserSession } from "./store/user/user.action";
const App= () => {
  //the dispatch coming from userDispatch never updates it going to be the same all the time

  const dispatch = useDispatch();
  useEffect(()=>{
   dispatch(checkUserSession());
   
},[dispatch]);

  return (
    
    <Routes >
    <Route path='/' element={<Navigation />}>
     <Route index  element={<Home />} />
        <Route path ='shop/*' element={<Shop   />} /> 
        <Route path ='auth' element={<Authentication   />} /> 
        <Route path='checkout' element={<Checkout/>}/>
  
    </Route>
  
  </Routes>
  
  
  
  );

};

export default App;
 