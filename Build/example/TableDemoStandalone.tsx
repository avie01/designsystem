import React from 'react';
import ReactDOM from 'react-dom/client';
import TableDemo from '../src/pages/TableDemo';
import '../src/styles/globals.css';

const App = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <TableDemo />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);