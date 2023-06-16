import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import { StateContext } from './Context/useStateContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <React.StrictMode>
            <StateContext>
                  <App />
            </StateContext>
      </React.StrictMode>
);