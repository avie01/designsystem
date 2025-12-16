import React from 'react';
import ReactDOM from 'react-dom/client';
import CityPlanHomepage from '../src/pages/CityPlanHomepage';
import '../src/styles/globals.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <CityPlanHomepage />
  </React.StrictMode>
);