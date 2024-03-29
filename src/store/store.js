import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/es/storage/session'
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';

const persistConfig = {
  key: 'root',
  storage:storageSession,
  whitelist: ['cart'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);





































// //Adding Redux Thunk library
// //This is a place where we receive actions and dispatch them
// //We will be generating our store object here.
// //Every store to work needs reducers
// //root reducer is the combination of all reducers
// import { compose,applyMiddleware,legacy_createStore as createStore } from "redux";
// // import logger from "redux-logger";
// import {rootReducer} from './root-reducer';
// import { persistStore,persistReducer } from "redux-persist";
// import storageSession from 'redux-persist/es/storage/session'
// //It takes three arguments
// //1.rootReducer --> we need a root reducer inorder to generate the store
// //logger states how the store looks like before dispatch and after action
// //Middlewares are like a little library helper that runs before an action hits the reducer
// //so before an action hits the reducer ,it hits the middleware
// //The middlewares actually enhances our store and they log out the state
// //Removinf logger and creating our own loggerMiddleware.
// //Signature of this creation will be same it takes three functions that return from one another(curryFunc)
// // import { loggerMiddleware } from "./middleware/logger";
// //Debugging with redux logger...
// import logger from "redux-logger";
// // const loggerMiddleware = (store) => (next) => (action) => {
// //     if(!action.type) {return next(action) ;}// we simply returns from this  middleware
// //     //But if there is an action then 
// //     console.log('type ',action.type);
// //     console.log('payload ',action.payload);
// //     console.log('currentState', store.getState());//getState() will give us the value of state now
// //     next(action);
// //     console.log('next state: ',store.getState() ); // NEW STATE
// // }
// import createSagaMiddleware from 'redux-saga'
// // import thunk from "redux-thunk";
// import { rootSaga } from "./root-saga";




// const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)|| compose;



// const persistConfig = {
//     key :'root',
//     storage:storageSession,
//     //blacklisting the user...
//     //  blacklist: ['user']
//     whitelist:['cart'],
// }
// const sagaMiddleware = createSagaMiddleware();
// const middlewares = [process.env.NODE_ENV === 'development' && logger,sagaMiddleware].filter(
//     Boolean

//     );



// const persistedReducer = persistReducer(persistConfig,rootReducer);
// //NODE ENVIRONMENT VARIABLE THAT TELLS US WHETHER WE ARE IN DEVELOPMENT OR IN PRODUCTION BASED ON STRING 'DEVELOPMENT

//     //combination of dev and compose
//     //Application state change 
//     //We can see how our apploication reflex accordingly...
//     //Directly modyfying the reducers
// // wE ARE SAYING HERE THAT IF we are not in production and we are in window object and this dev tools exist so devtools as a chrome extension is going to attach in the window object. 

// //This all happen in a milli seconds
// //Timeline to check how the redux state is being modified...

// //Passing undefined because it is an optional passed parameter
// const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));
// export const store = createStore(persistedReducer,undefined,composedEnhancers);


// sagaMiddleware.run(rootSaga);
// //This is using the modified value of redux
// //Going to our index.js to persist the store
// export const persistor = persistStore(store);
// //Now after adding thunk we need to figure out where in our propject there is an asyncronous behaviour present..


