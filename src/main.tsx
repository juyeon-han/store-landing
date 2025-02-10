import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/scss/reset.scss';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
