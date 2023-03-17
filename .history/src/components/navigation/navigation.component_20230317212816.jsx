import { Fragment} from "react";
import {  Outlet } from "react-router-dom"
import {ReactComponent as Crwnlogo} from '../../assests/crown.svg'
// import './navigation.styles.jsx';
//Styled component are used to protect from class name clashes while styling
//useSelector is a hook that helps us to interact with a component to a redux store
import {select}
import { selectCurrentUser } from "../../store/user/user.selector";
import { useSelector } from "react-redux";
import { NavigationContainer,NavLink,NavLinks,LogoContainer } from "./navigation.styles";
// import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
// import { CartContext } from "../../contexts/cart.context";

//our selector updates whenever the state object changes
const Navigation = () => {
  //this time we wan the currentUser value not the setter  
 //its the same way like we done it inside the sign in form while pulling the set function.
//this time we wan the actual value of the current user
  // const { currentUser}=useContext(UserContext);
  //we recive the entire state object in our selector function

 const currentUser= useSelector(selectCurrentUser);
  const {isCartOpen}=useContext(CartContext);
  // console.log(currentUser);
  //creation of signout link
  //signout user gives us back whatever coming from firebase.js signout promise

  //index.scss is the top level deign script...

  
  return(
  <Fragment>
 <NavigationContainer>
  <LogoContainer  to='/'>
  <Crwnlogo className="logo"/>
  </LogoContainer>

   
  <NavLinks>
        <NavLink to='/shop'>

       SHOP

{/*   current user cats as a signin changer to signout changer if we sign in it will show signout and if sign
out then sign in going to firbase utils for it  */}
        </NavLink>

       {
        currentUser ? (
          <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
      ) : ( 
        <NavLink to='/auth'>


SIGN IN


 </NavLink>
)
        } 
        <CartIcon/>
       


        </NavLinks>
   {/* short circuit operator double ampersand tries to evaluate the truthiness of the component. */}
  {/* if true return cartdropdown */}

  {isCartOpen && <CartDropdown/>} 
  </NavigationContainer>
  
  
    <Outlet/>
   </Fragment>
  
    )
  }
  export default Navigation; 