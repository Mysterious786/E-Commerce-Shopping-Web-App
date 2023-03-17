//This is a place where we receive actions and dispatch them
//We will be generating our store object here.
//Every store to work needs reducers
//root reducer is the combination of all reducers
import { compose,applyMiddleware,legacy_createStore as createStore } from "redux";
// import logger from "redux-logger";
import {rootReducer} from './root-reducer';
import { persistStore,persistReducer } from "redux-persist";
import storageSession from 'redux-persist/es/storage/session'
//It takes three arguments
//1.rootReducer --> we need a root reducer inorder to generate the store
//logger states how the store looks like before dispatch and after action
//Middlewares are like a little library helper that runs before an action hits the reducer
//so before an action hits the reducer ,it hits the middleware
//The middlewares actually enhances our store and they log out the state
//Removinf logger and creating our own loggerMiddleware.
//Signature of this creation will be same it takes three functions that return from one another(curryFunc)
// import { loggerMiddleware } from "./middleware/logger";
//Debugging with redux logger...
import logger from "redux-logger";
// const loggerMiddleware = (store) => (next) => (action) => {
//     if(!action.type) {return next(action) ;}// we simply returns from this  middleware
//     //But if there is an action then 
//     console.log('type ',action.type);
//     console.log('payload ',action.payload);
//     console.log('currentState', store.getState());//getState() will give us the value of state now
//     next(action);
//     console.log('next state: ',store.getState() ); // NEW STATE
// }

const persistConfig = {
    key :'root',
    storage:storageSession,
    //blacklisting the user...
    blacklist: ['user']
}
const persistedReducer = persistReducer(persistConfig,rootReducer);
//NODE ENVIRONMENT VARIABLE THAT TELLS US WHETHER WE ARE IN DEVELOPMENT OR IN PRODUCTION BASED ON STRING 'DEVELOPMENT
const middlewares = [process.env.NODE_ENV==='development' && logger].filter(
    Boolean

    );

const composedEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE)

//Passing undefined because it is an optional passed parameter
const composedEnhancers = compose(applyMiddleware(...middlewares));
export const store = createStore(persistedReducer,undefined,composedEnhancers);

//This is using the modified value of redux
//Going to our index.js to persist the store
export const persistor = persistStore(store);