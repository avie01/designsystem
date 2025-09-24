import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import CSS directly from source
import './styles.css';
// Temporarily disable focus indicators
import '../src/styles/disable-focus.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
); 