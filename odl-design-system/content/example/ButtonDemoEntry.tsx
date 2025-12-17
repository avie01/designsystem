import React from 'react';
import ReactDOM from 'react-dom/client';
import ButtonDemo from '../src/pages/ButtonDemo';
import '../src/styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ButtonDemo />
  </React.StrictMode>
);