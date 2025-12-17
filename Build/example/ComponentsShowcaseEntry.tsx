import React from 'react';
import ReactDOM from 'react-dom/client';
import ComponentsShowcase from './ComponentsShowcaseSimple';
import '../src/styles/globals.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ComponentsShowcase />
  </React.StrictMode>
);