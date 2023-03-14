// export const USER_ACTION_TYPES ={
//     SET_CURRENT_USER :'SET_CURRENT_USER'
// };
import { USER_ACTION_TYPES } from "./user.type";
const INITIAL_STATE = {
    currentUser : null
};
//First time only initial state will not pass its the first time
//exporting this to use in root reducer
export const userReducer = (state = INITIAL_STATE,action) =>{
    //destructuirng
const {type,payload} = action;

switch(type) { 
    case USER_ACTION_TYPES.SET_CURRENT_USER :
    return{
         ...state,
         currentUser:payload
    };
    //Thing i can perform using state

    // case 'increment':
    //      return {
    //           value : state.value +1
    //      }
    default:
         return state;
}
};