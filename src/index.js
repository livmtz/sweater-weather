// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// A linha que importava 'reportWebVitals' foi removida daqui.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// A chamada para a função reportWebVitals() também foi removida do final do arquivo.