import { Routes, Route } from 'react-router-dom';

import { NavigationHeader } from 'pages/common/NavigationHeader';
import { CurrentWeatherPage } from './CurrentWeatherPage';
import { ForecastWeatherPage } from './ForecastWeatherPage';

export function DashboardPage() {
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
