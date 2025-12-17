import React from 'react';
import { createRoot } from 'react-dom/client';
import HeaderDemo from '../src/pages/HeaderDemo';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<HeaderDemo />);