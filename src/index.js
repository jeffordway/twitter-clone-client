import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MessageProvider } from './context/messageContext';
import { UserProvider } from './context/userContext';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <MessageProvider>
        <App />
      </MessageProvider>
    </UserProvider>
  </React.StrictMode>
);