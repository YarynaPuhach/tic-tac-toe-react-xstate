import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import path
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); // Create root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);