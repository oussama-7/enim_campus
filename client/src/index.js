import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { StoreProvider } from './pages/shop/Store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
        <StoreProvider>
          <HelmetProvider>
            <PayPalScriptProvider deferLoading={true}>
              <App />
            </PayPalScriptProvider>
          </HelmetProvider>
        </StoreProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
