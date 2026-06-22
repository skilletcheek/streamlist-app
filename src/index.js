import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register background service worker script securely on window initialization
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('PWA: ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch((error) => {
        console.error('PWA: ServiceWorker registration failed: ', error);
      });
  });
}