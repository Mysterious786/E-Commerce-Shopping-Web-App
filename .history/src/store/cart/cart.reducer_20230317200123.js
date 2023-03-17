import { CART_ACTION_TYPES } from "./cart.ty";

export const CART_INITIAL_STATE ={
    // cartCount:0,
    // cartTotal:0,
    cartItems:[],
    isCartOpen:false,
  };
  //ACTION IS EQUAL TO EMPTY OBJECT SINCE NO ACTION HAS BEEN PASSED TILL NOW...

  export const cartReducer = (state = CART_INITIAL_STATE,action = {}) =>{
    //always destructure two properties that is type and payload
  
    const {type,payload} = action;
  
    switch(type){
       case CART_ACTION_TYPES.SET_CART_ITEMS :
        return {
          ...state,
        //   ...payload, Setting just cartItem
        cartItems:payload,
        }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN :
            return {
              ...state,
            //   ...payload, Setting just cartItem
            isCartOpen:payload, // Payload will be passed as a boolean
            };
        
      default:
        return state;
    }
  }