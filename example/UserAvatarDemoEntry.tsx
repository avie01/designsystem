import React from 'react';
import ReactDOM from 'react-dom/client';
import UserAvatarDemo from '../src/pages/UserAvatarDemo';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<UserAvatarDemo />);
}