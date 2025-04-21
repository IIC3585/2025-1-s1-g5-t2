import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Registrar el service worker

const swPath = import.meta.env.PROD ? '/2025-1-s1-g5-t2/service-worker.js' : '/service-worker.js';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(swPath)
    .then(() => {
      console.log('Service Worker registrado con éxito.');
    }).catch((error) => {
      console.error('Error al registrar el Service Worker:', error);
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)