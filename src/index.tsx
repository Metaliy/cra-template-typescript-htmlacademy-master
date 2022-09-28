import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { store } from './store';
import { fetchCamerasAction } from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(fetchCamerasAction());

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
