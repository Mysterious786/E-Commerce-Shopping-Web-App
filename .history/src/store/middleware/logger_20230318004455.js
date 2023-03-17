export const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type) {return next(action) ;}// we simply returns from this  middleware
    //But if there is an action then 
    console.log('type ',action.type);
    console.log('payload ',action.payload);
    console.log('currentState', store.getState());//getState() will give us the value of state now
    next(action);
    console.log('next state: ',store.getState() ); // NEW STATE
}
