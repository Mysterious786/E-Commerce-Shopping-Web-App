import { useState } from "react";
import FormInput from "../form-input/form-input.component";
//context is a gloryfying component that just leveraging your state
//for this we need to use this useContext..
//UserContext is going to give us back the value passesd in value...
//and our value is the currentuser of the useState as well as the setter function.
//WHENEVER WE sign in it gonna signs in gets the response destructures
//the user and stores it into our context
//the fact is whewnever we logged in our functional component gonna rerender..
//usecontext as a hook tells this component whenever a value inside of this context updates then render me..


// import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { signInWithGooglePopup ,

  signInAuthUserWithEmailAndPassword} from  "../../utils/firebase/firebase.utils";

//we can make 4 state for this but for a betterment we gonna create an object
import './sign-in-form.styles.scss';
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
const defaultFormField={
  
    email:'',
    password:'',
 
}


const SignInForm= () => {
const [formFields,setFormFields]=useState(defaultFormField);
//destructing four values since it helps in preventing using formfields.name this cases instead we can easily use name and email as it is...

const {email,password}=formFields;
//Figuring what happens when this values changes
//we are going to pass this handlechange to every single FormInput to know when the values changes to render....
//  console.log(formFields);
//going to get a object



const resetFormFields=()=>{
  setFormFields(defaultFormField);
}
const signInWithGoogle= async()=>{
 await signInWithGooglePopup();

  //await as its an asynchronous step,now we know no matter what happens we are going to get back doc referrence
//since if its present exist() function will return true else if not present
//it will be get created in data base using snapshot and will be returning here....


};







const handleSubmit=async (event)=>{
    //we dont want any default behaviour of form everything will be handled by us..
event.preventDefault();

  //calling method createAuthWithUserEmailAndPassword

  try{
    //we want to take this user object to store it inside the context

    // const response=await signInAuthUserWithEmailAndPassword(email,password);
   await signInAuthUserWithEmailAndPassword(email,password);
//runs the value whenever this user value comes back from try.
//then acces it inside my navigation component
   
  //  console.log(response);
    resetFormFields();
  //list of error codes for firebase

} catch(error){

console.log('user sign in failed',error)


//   switch(error.code){
// case 'auth/wrong-password':
//   alert('incorrect password for email');
//   break;
//   case 'auth/user-not-found':
//     alert('no user associated with this email');
// break
// default:
//   console.log(error);
//   }
  //do console to see what shows when erro code and take it to write if else
    // if(error.code==="auth/wrong-password"){
    //   alert('incorrect password for email');
    // } else if(auth/user-not-found)
   

  }




};









const handleChange=(event)=>{
    //target will give us the thing that is emitting the event and that is event and target will give all of the things attached to FormInputs
const {name,value}=event.target;
//by using square bracket it saying oh take this value from heere and apply to variable name
//spread in one object and modify that object
setFormFields({ ...formFields,[name]:value})
}
//input->FormInput
    return(
      <div className="sign-up-container">
       <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
     <form onSubmit={handleSubmit}>
{/*   Name and all will come through the event  and through name we will be telling our set state which of the namee to update inside the object
    */}
    

       
        

        
        <FormInput  label="Email" type='email' required onChange={handleChange} name="email" value={email}/>

        
        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>

       <div className="buttons-container">
        <Button  type="submit" >Sign In</Button>
      <Button buttonType={BUTTON_TYPE_CLASSES.google} type="button"
      onClick={signInWithGoogle}
      >Google Sign In</Button>
       </div>
        
        
     </form>

     
     
      </div>  
    )
}
export default SignInForm;