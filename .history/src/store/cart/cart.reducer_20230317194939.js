import {CART}

export const CART_INITIAL_STATE ={
    cartCount:0,
    cartTotal:0,
    cartItems:[],
    isCartOpen:false,
  };
  //ACTION IS EQUAL TO EMPTY OBJECT SINCE NO ACTION HAS BEEN PASSED TILL NOW...

  const cartReducer = (state = CART_INITIAL_STATE,action = {}) =>{
    //always destructure two properties that is type and payload
  
    const {type,payload} = action;
  
    switch(type){
       case CART_ACTION_TYPES.SET_CART_ITEMS :
        return {
          ...state,
          ...payload,
        }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN :
        return {
          ...state,
          isCartOpen:payload,
        }
      default:
        return state;
    }
  }