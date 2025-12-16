import React from 'react';
import ReactDOM from 'react-dom/client';
import TableDemo from '../src/pages/TableDemo';
import '../src/styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <TableDemo />
  </React.StrictMode>
);