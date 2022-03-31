import { useEffect, useState } from 'react';
import moment from 'moment';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { getLocationFromCoords } from '../../api/MapService';
import { searchWeather } from '../../api/WeatherService';
import { getRandomPhotoFromLocation } from '../../api/PhotoService';

interface WeatherProps {
  location: {
    lat: number;
    lng: number;
  };
}

interface LocationWeather {
  city: string;
  temperatureC: number;
  minTemp: number;
  maxTemp: number;
  icon: string;
  sunrise: string;
  sunset: string;
  photo: string;
}

export function Weather({ location: { lat, lng } }: WeatherProps) {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState<LocationWeather>();

  useEffect(() => {
    async function getLocation() {
      const geolocation = await getLocationFromCoords({ lat, lng });
      setLocation(geolocation);

      const fetchedWeather = await searchWeather({ lat, lng });

      const photo = await getRandomPhotoFromLocation(geolocation);

      setWeather({
        city: fetchedWeather.name || location,
        temperatureC: Math.round(fetchedWeather.main.temp),
        minTemp: Math.round(fetchedWeather.main.temp_min),
        maxTemp: Math.round(fetchedWeather.main.temp_max),
        icon: fetchedWeather.weather[0].icon,
        sunrise: moment.unix(fetchedWeather.sys.sunrise).format('hh:mm a'),
        sunset: moment.unix(fetchedWeather.sys.sunset).format('hh:mm a'),
        photo
      });
    }

    getLocation();
  }, [lat, lng]);

  if (!weather) {
    return <Text>Loading weather</Text>;
  }

  // TODO: create carrousel
  return (
    <Flex>
      <Box>
        <Text fontSize="2xl">{weather.city}</Text>
        <Text fontSize="xl">
          {weather.temperatureC}°C ({weather.minTemp}°c - {weather.maxTemp}°c)
        </Text>
        <Text>
          <Image src={`http://openweathermap.org/img/w/${weather.icon}.png`} alt="weather icon" />
        </Text>
        <Text fontSize="xl">Sunrise: {weather.sunrise}</Text>
        <Text fontSize="xl">Sunset: {weather.sunset}</Text>
        <Text>
          <Image src={weather.photo} alt="city photo" boxSize="380px" objectFit="cover" />
        </Text>
      </Box>
    </Flex>
  );
}
