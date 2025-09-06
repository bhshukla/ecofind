// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Make sure this is imported

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider> {/* This wrapper is the fix */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
);