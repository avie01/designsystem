import React from 'react';
import ReactDOM from 'react-dom/client';
import HierarchyVisualizationsDemo from '../src/pages/HierarchyVisualizationsDemo';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <HierarchyVisualizationsDemo />
  </React.StrictMode>
);