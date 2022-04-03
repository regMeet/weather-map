import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import { LoginPage } from './pages/Routes/LoginPage';
import { SignUpPage } from './pages/Routes/SignUpPage';
import { DashboardPage } from './pages/Routes/DashboardPage';

// FixMe: not working
export const theme = extendTheme({
  components: {
    Link: {
      variants: {
        // you can name it whatever you want
        primary: ({ colorScheme = 'blue' }) => ({
          color: `${colorScheme}.500`,
          _hover: {
            color: `${colorScheme}.400`
          }
        })
      },
      defaultProps: {
        // you can name it whatever you want
        variant: 'primary'
      }
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <div className="main">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signUp" element={<SignUpPage />} />
            <Route path="dashboard/*" element={<DashboardPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
