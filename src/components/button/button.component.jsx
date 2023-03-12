//to leverage between diffrent types of button
//we gonna create a variable called button types
//like default,inverted,google sign in
//every button one solution
//it allows us to get more readible type of code
//for interpolation it should be javascript
//other props iside to leverage it over every button its like paste it to all
//google button will be blue
//default: black
//inverted white to black
//google:blue
import { BaseButton,InvertedButton,GoogleSignInButton } from "./button.styles";
export const BUTTON_TYPE_CLASSES={
base:'base',
google:'google-sign-in',
inverted:'inverted'
}

const getButton =(buttonType=BUTTON_TYPE_CLASSES.base) =>(
{
[BUTTON_TYPE_CLASSES.base]:BaseButton,
[BUTTON_TYPE_CLASSES.google]:GoogleSignInButton,
[BUTTON_TYPE_CLASSES.inverted]:InvertedButton

}[buttonType]

)


const Button=({children,buttonType,...otherProps})=>{
        //Below component is pointting to one of the two relevqant component

        const CustomButton = getButton(buttonType)
   
        return(
        <CustomButton 
        // className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
        {...otherProps}
        >
             
{children}
        </CustomButton>
    
    
        )
}
export default Button;