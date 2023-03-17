export const CART_INITIAL_STATE ={
    cartCount:0,
    cartTotal:0,
    cartItems:[],
    isCartOpen:false,
  };
  
  const cartReducer = (state,action) =>{
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
        throw new Error(`unhandled type of ${type} in cartReducer`)
    }
  }