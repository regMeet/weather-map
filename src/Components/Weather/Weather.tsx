import { useEffect, useState } from 'react';
import moment from 'moment';
import { Flex, Image, Text } from '@chakra-ui/react';

import { GeoLocation } from 'api/types';
import { searchWeather } from 'api/WeatherService';

interface WeatherProps {
  location: GeoLocation;
}

interface LocationWeather {
  city: string;
  temperatureC: number;
  minTemp: number;
  maxTemp: number;
  icon: string;
  sunrise: string;
  sunset: string;
}

export function Weather({ location: { lat, lng } }: WeatherProps) {
  const [weather, setWeather] = useState<LocationWeather>();

  useEffect(() => {
    async function getLocation() {
      const fetchedWeather = await searchWeather({ lat, lng });

      setWeather({
        city: fetchedWeather.name,
        temperatureC: Math.round(fetchedWeather.main.temp),
        minTemp: Math.round(fetchedWeather.main.temp_min),
        maxTemp: Math.round(fetchedWeather.main.temp_max),
        icon: fetchedWeather.weather[0].icon,
        sunrise: moment.unix(fetchedWeather.sys.sunrise).format('hh:mm a'),
        sunset: moment.unix(fetchedWeather.sys.sunset).format('hh:mm a')
      });
    }

    getLocation();
  }, [lat, lng]);

  if (!weather) {
    // TODO: add localization
    return <Text>Loading weather</Text>;
  }

  return (
    <Flex h="70%" justifyContent="space-around" alignItems="center" direction="column">
      <Text fontSize={['md', 'lg', '2xl']} color="primary">
        {weather.city}
      </Text>
      <Text fontSize={['xs', 'xs', 'xs', 'sm', 'lg']}>
        {weather.temperatureC}°C ({weather.minTemp}°c - {weather.maxTemp}°c)
      </Text>
      <Image src={`http://openweathermap.org/img/w/${weather.icon}.png`} alt="weather icon" />
      <Text fontSize={['xs', 'xs', 'sm', 'md', 'lg']}>Sunrise: {weather.sunrise}</Text>
      <Text fontSize={['xs', 'xs', 'sm', 'md', 'lg']}>Sunset: {weather.sunset}</Text>
    </Flex>
  );
}
