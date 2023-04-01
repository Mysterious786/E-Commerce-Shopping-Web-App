import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
//Importing react-redux own provider
import { Provider } from 'react-redux';
import App from './App';
// import { UserProvider } from './contexts/user.context';
// import {CategoriesProvider } from './contexts/categories.context';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
// import { CartProvider } from './contexts/cart.context';
import { PersistGate } from 'redux-persist/integration/react';
import { store,persistor } from './store/store';
// import { render } from "react-dom";
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './utils/stripe/stripe.utils';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
  <BrowserRouter>
<Elements stripe={stripePromise}>
  <App />
</Elements>
    </BrowserRouter>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

//we want that our signin form could access this context move to signin.

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
