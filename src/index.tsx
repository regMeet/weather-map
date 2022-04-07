import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from 'pages/routes/AppRoutes';
import reportWebVitals from './reportWebVitals';

// import i18n (needs to be bundled ;))
import 'i18n/config';

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback="Loading...">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
