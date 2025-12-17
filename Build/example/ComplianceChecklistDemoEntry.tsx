import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ComplianceChecklistPage from '../src/pages/ComplianceChecklistPage';

const ComplianceChecklistDemo: React.FC = () => {
  return (
    <BrowserRouter>
      <ComplianceChecklistPage />
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ComplianceChecklistDemo />
  </React.StrictMode>
);