import React from 'react';
import ReactDOM from 'react-dom/client';
import TreeNavigationDemo from '../src/pages/TreeNavigationDemo';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <TreeNavigationDemo />
  </React.StrictMode>
);