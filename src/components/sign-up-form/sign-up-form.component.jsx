import { useState } from "react";
import FormInput from "../form-input/form-input.component";
//last part of context sign out ..
//using context we have to store user object created via createAthUserWithEmail...passs..

// import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { createAuthUserWithEmailAndPassword ,createUserDocumentFromAuth} from  "../../utils/firebase/firebase.utils";

//we can make 4 state for this but for a betterment we gonna create an object
import './sign-up-form.styles.scss'
import Button from "../button/button.component";
const defaultFormField={
   displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}


const SignUpForm= () => {
const [formFields,setFormFields]=useState(defaultFormField);





//destructing four values since it helps in preventing using formfields.name this cases instead we can easily use name and email as it is...

const {displayName,email,password,confirmPassword}=formFields;
//Figuring what happens when this values changes
//we are going to pass this handlechange to every single FormInput to know when the values changes to render....
//  console.log(formFields);
//now below val one whenever userContext gonna  change it gonns rerun
//same work again see below and check signin



const resetFormFields=()=>{
  setFormFields(defaultFormField);
}

const handleSubmit=async (event)=>{
    //we dont want any default behaviour of form everything will be handled by us..
event.preventDefault();
if(password!==confirmPassword){
alert('Password do not match');
 return;
  } 
  //calling method createAuthWithUserEmailAndPassword

  try{
    //email and password are the values thata we destructured from our form values

    const {user}=await createAuthUserWithEmailAndPassword(email,password);
   //same as signin check above
 
await createUserDocumentFromAuth(user,{displayName})
  resetFormFields();

} catch(error){
    if(error.code==='auth/email-already-in-use'){
      alert('Cannot create user, since email is already in use');

    }
    else{
      console.log('userr creation encountered ann error',error);
    }

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
       <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
     <form onSubmit={handleSubmit}>
{/*   Name and all will come through the event  and through name we will be telling our set state which of the namee to update inside the object
    */}
    

       
        <FormInput label="Display Name" type='text' required onChange={handleChange} name="displayName" value={displayName}/>

        
        <FormInput  label="Email" type='email' required onChange={handleChange} name="email" value={email}/>

        
        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>

       
        <FormInput  label="Confirm Password" type='password' required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
        <Button  type="submit" >Sign Up</Button>
     </form>

     
     
      </div>  
    )
}
export default SignUpForm;