import React from 'react';
import { createRoot } from 'react-dom/client';
import StepperDemo from '../src/pages/StepperDemo';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<StepperDemo />);