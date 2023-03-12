import { FormInputLabel ,Input,Group} from "./form-input.style";
const FormInput=({label, ...otherProps})=>{
    //...otherProps is used to display the functionality of label and forminput all over the code where we gonna apply 
//giving dynamic classname to the input since when we gonna hover it gonna popup, giving sring interpolated value
//where these value gonna depend on otherProps value
//label classname says thst when length will not 0 just append this shrink class
//otherwise do anything and if if label exist do anything i.e label &&


    return(
<Group>
  <Input {...otherProps}/>
{label && (

    <FormInputLabel
    //  className={`${otherProps.value.length ? 'shrink':'' } form-input-label `}
    shrink={otherProps.value.length}
     
     >{label}</FormInputLabel>
)}
   
</Group>
    )
};
export default FormInput;