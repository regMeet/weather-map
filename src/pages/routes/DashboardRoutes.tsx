import { Routes, Route } from 'react-router-dom';

import { NavigationHeader } from 'pages/common/NavigationHeader';
import { CurrentWeatherPage } from 'pages/app/CurrentWeatherPage';
import { ForecastWeatherPage } from 'pages/app/ForecastWeatherPage';

export function DashboardRoutes() {
  return (
    <div>
      <NavigationHeader />
      <div className="dashboard">
        <Routes>
          <Route path="/" element={<CurrentWeatherPage />} />
          <Route path="showCurrentWeather" element={<CurrentWeatherPage />} />
          <Route path="showForecastWeather" element={<ForecastWeatherPage />} />
        </Routes>
      </div>
    </div>
  );
}
