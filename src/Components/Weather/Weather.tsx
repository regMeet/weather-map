import { useEffect, useState } from 'react';
import moment from 'moment';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { getLocationFromCoords } from '../../api/MapService';
import { searchWeather } from '../../api/WeatherService';
import { getRandomPhotoFromLocation } from '../../api/PhotoService';

interface WeatherProps {
  lat: number;
  lng: number;
}

interface LocationWeather extends WeatherProps {
  city: string;
  temperatureC: number;
  temperatureF: number;
  icon: string;
  sunrise: string;
  sunset: string;
  photo: string;
}

export function Weather({ lat, lng }: WeatherProps) {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState<LocationWeather>();

  useEffect(() => {
    async function getLocation() {
      const geolocation = await getLocationFromCoords({ lat, lng });
      setLocation(geolocation);

      const weather1 = await searchWeather({ lat, lng });

      const photo = await getRandomPhotoFromLocation(geolocation);

      setWeather({
        lat,
        lng,
        city: weather1.name || location,
        temperatureC: Math.round(weather1.main.temp),
        temperatureF: Math.round(weather1.main.temp * 1.8 + 32),
        icon: weather1.weather[0].icon,
        sunrise: moment.unix(weather1.sys.sunrise).format('hh:mm a'),
        sunset: moment.unix(weather1.sys.sunset).format('hh:mm a'),
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
          {weather.temperatureC} / {weather.temperatureF}
        </Text>
        <Text>
          <Image src={`http://openweathermap.org/img/w/${weather.icon}.png`} alt="weather icon" />
        </Text>
        <Text fontSize="xl">Sunrise: {weather.sunrise}</Text>
        <Text fontSize="xl">Sunset: {weather.sunset}</Text>
        <Text>
          <Image src={weather.photo} alt="city photo" boxSize="330px" objectFit="cover" />
        </Text>
      </Box>
    </Flex>
  );
}
