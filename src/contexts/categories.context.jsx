//       Migrated everything to reducer 














// import { createContext,useState ,useEffect} from "react"

// import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";
// //our motto is to store an array of products


// export const CategoriesContext=createContext({
//     categoriesMap:{},

// });
// //For any context we need a value and a contextProvider... thats 
// //we need to export both....
// export const CategoriesProvider=({children})=>{
//     const [categoriesMap,setCategoriesMap]=useState({});
//     //useeffect should be fire only once
//     //both string of categories the name for collection
//     //and the shop data the actual object that we want to pass
// //use to store shop data to databse batch is used for this.
//     // useEffect(()=>{
//     //     addCollectionAndDocuments('categories',SHOP_DATA);
//     // })
//     //whenever we are passing a async function inside use effect
//     //we dont need to use async insted we sholud make a async variabe or instanceinside effect.

//     useEffect(()=>{
//         const getCategoriesMap=async () => { 
//           const categoryMap = await   getCategoriesAndDocuments('categories');
    
//        setCategoriesMap(categoryMap);
//         };

//        getCategoriesMap();
//     },[]);
//     //return a tag
//     const value={categoriesMap};
//     return (
//         <CategoriesContext.Provider value={value}>{children}
//         </CategoriesContext.Provider>
//     )
// }
