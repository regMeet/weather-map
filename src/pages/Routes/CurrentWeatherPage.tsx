import { NavigationHeader } from '../Common/NavigationHeader';
import { ShowWeather } from '../../Components/ShowWeather';

export function CurrentWeatherPage() {
  return (
    <div>
      <NavigationHeader />
      <ShowWeather />
    </div>
  );
}
