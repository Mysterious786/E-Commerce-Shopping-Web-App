// import { createContext,useEffect,useReducer } from "react";
// import { onAuthStateChangedListener,createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
// import { createAction } from "../utils/reducer/reducer.util";
// //when current user value null there is no value.
// //as the actual value you want too ACCESS
// export const UserContext=createContext({
// currentUser:null,
// //blank function
// //move to index.js at last to wrap the entire app component inside this 
// setCurrentUser:()=>null,

// });

// //...state means give me the previous value of the thing and after that anything happens just ovveride it

// //Sometime we can use the state object to derive the next value

// export const USER_ACTION_TYPES ={
//      SET_CURRENT_USER :'SET_CURRENT_USER'
// }
// const INITIAL_STATE = {
//      currentUser : null
// }

// const userReducer = (state,action) =>{
//      //destructuirng
// const {type,payload} = action;

// switch(type) { 
//      case USER_ACTION_TYPES.SET_CURRENT_USER :
//      return{
//           ...state,
//           currentUser:payload
//      }
//      //Thing i can perform using state

//      // case 'increment':
//      //      return {
//      //           value : state.value +1
//      //      }
//      default:
//           throw new Error(`Unhandled type ${type}`);

// }
// }

// // const INITIAL_STATE = {
// //      currentUser : null
// // }




// //provider here is the actual component and its a functional component
// //receive children...
// export const UserProvider=({children})=>{
//      //Provider is the component that will wrap around any other component where accesed to thhe value inside...
//      //in here we will be rendering the children
// //it will be receiving a value that will hold the actual context value.
// //now our motto is to store a user object
// //This provider is actually allowing any of his child component to access the value inside the value
// //inside of its useState
// // const [currentUser,setCurrentUser]=useState(null);
// //now we will be generating the value that we gonna pass here...
// //UseReducer takes two arguument and gives back two thing 
// //one is state and other is dispatch function

// const [{currentUser},dispatch] = useReducer(userReducer,INITIAL_STATE);

// // const {currentUser}= state
// const setCurrentUser =(user)=>{
//   dispatch(
//      createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user)
//      // {type:USER_ACTION_TYPES.SET_CURRENT_USER,payload:user}
     
//      );

// }
// const value={currentUser,setCurrentUser};
// //the moment userProvider mounts i wanna signsout

// //the below means i want to run this component only once when this component mounts...
// //user provider will instantiate this first callback
// useEffect(()=>{
//      //user can be userauth object or null..... if signout null and viceversa
// const unsubscribe=onAuthStateChangedListener((user)=>{
// if(user){
//       createUserDocumentFromAuth(user);
// }
// //otherwise

//      setCurrentUser(user);
// });
// //means unsubscribe whenever you unmounts...
// //snapshot will help in finding from our databse whether it exist or not.
// return unsubscribe
// },[])





// return <UserContext.Provider value={value}>
// {children}
// </UserContext.Provider>
// }

// //   Reducers are pretty much like a function that returns back an object
// //Usereducer hook is very similar to state
//





//Deleting this since we fully Migrated
