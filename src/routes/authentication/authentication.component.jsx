//for redirect issues we are going to import some methods they are below....




import './authentication.styles.scss'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
const Authentication=()=>{





    // const logGoogleUser= async()=>{
    //     const {user}=await signInWithGooglePopup();
    
    //     //await as its an asynchronous step,now we know no matter what happens we are going to get back doc referrence
    //  //since if its present exist() function will return true else if not present
    //  //it will be get created in data base using snapshot and will be returning here....

    //     const userDocRef = await createUserDocumentFromAuth(user);
    // };
   
    
    return(
        <div className='authentication-conatiner'>
          

            <SignInForm/>
            <SignUpForm/>
          
        </div>
    );
};
export default Authentication;