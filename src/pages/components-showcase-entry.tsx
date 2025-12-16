import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ComponentsShowcase from './ComponentsShowcase';
import TableDemo from './TableDemo';
import '../styles/globals.css';
import '../styles/variables.css';
import '../styles/component-utilities.css';

// Import demo pages for other components as they're created
// import ButtonDemo from './ButtonDemo';
// import InputDemo from './InputDemo';
// import ModalDemo from './ModalDemo';
// etc...

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ComponentsShowcase />} />
        <Route path="/table-demo" element={<TableDemo />} />
        {/* Add more routes as demo pages are created */}
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);