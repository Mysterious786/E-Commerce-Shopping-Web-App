import { createAction } from "../../utils/reducer/reducer.util"
import { USER_ACTION_TYPES } from "./user.type"
export const setCurrentUser =(user)=>{

       createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user);
       // {type:USER_ACTION_TYPES.SET_CURRENT_USER,payload:user}
       
   
  
  }