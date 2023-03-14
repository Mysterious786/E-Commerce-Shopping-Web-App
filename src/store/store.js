//This is a place where we receive actions and dispatch them
//We will be generating our store object here.
//Every store to work needs reducers
//root reducer is the combination of all reducers
import { compose,applyMiddleware,legacy_createStore as createStore } from "redux";
import logger from "redux-logger";
import {rootReducer} from './root-reducer';
//It takes three arguments
//1.rootReducer --> we need a root reducer inorder to generate the store
//logger states how the store looks like before dispatch and after action
//Middlewares are like a little library helper that runs before an action hits the reducer
//so before an action hits the reducer ,it hits the middleware
//The middlewares actually enhances our store and they log out the state

const middlewares = [logger];
//Passing undefined because it is an optional passed parameter
const composedEnhancers = compose(applyMiddleware(...middlewares));
export const store = createStore(rootReducer,undefined,composedEnhancers);
