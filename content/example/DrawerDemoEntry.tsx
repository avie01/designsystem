import React from 'react';
import { createRoot } from 'react-dom/client';
import DrawerDemo from '../src/pages/DrawerDemo';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<DrawerDemo />);