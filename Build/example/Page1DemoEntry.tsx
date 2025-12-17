import React from 'react';
import ReactDOM from 'react-dom/client';
import Page1Demo from '../src/pages/Page1Demo';
import '../src/styles/globals.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Page1Demo />
  </React.StrictMode>
);