import React from 'react';
import { createRoot } from 'react-dom/client';
import ComplianceReport from '../src/pages/ComplianceReport';

const ComplianceReportEntry = () => {
  return <ComplianceReport />;
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<ComplianceReportEntry />);
}