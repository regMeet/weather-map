import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import { CurrentWeatherPage } from './pages/Routes/CurrentWeatherPage';
import { ForecastWeatherPage } from './pages/Routes/ForecastWeatherPage';
import { HomePage } from './pages/Routes/HomePage';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="showCurrentWeather" element={<CurrentWeatherPage />} />
          <Route path="showForecastWeather" element={<ForecastWeatherPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
