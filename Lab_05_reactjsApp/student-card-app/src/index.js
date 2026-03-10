// Entry point for the Student Card App
// React and ReactDOM are imported to render the app in the browser
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Mount the App component into the HTML element with id="root"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
