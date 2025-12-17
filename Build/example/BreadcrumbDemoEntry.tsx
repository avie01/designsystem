import React from 'react';
import ReactDOM from 'react-dom/client';
import BreadcrumbDemo from '../src/pages/BreadcrumbDemo';
import '../src/styles/globals.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BreadcrumbDemo />
  </React.StrictMode>
);