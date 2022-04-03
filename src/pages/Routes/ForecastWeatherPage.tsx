import moment from 'moment';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { GeoLocation } from '../../api/types';
import { searchForecast } from '../../api/WeatherService';
import { GetGeoLocation } from '../../Components/Map/GetGeoLocation';

interface ForecastWeather {
  date: number;
  temp: number;
  icon: string;
}

export function ForecastWeatherPage() {
  const [currentLocation, setCurrentLocation] = useState<GeoLocation | null>(null);
  const [forecast, setForecast] = useState<ForecastWeather[]>([]);

  useEffect(() => {
    async function fetchForecast() {
      if (currentLocation) {
        const fetchedForecast = await searchForecast(currentLocation);
        setForecast(fetchedForecast);
      }
    }

    fetchForecast();
  }, [currentLocation]);

  return (
    <>
      <GetGeoLocation setCurrentLocation={setCurrentLocation} />
      {!currentLocation && (
        <Box ml={5} mt={5}>
          <Text fontSize="lg">Loading forecast...</Text>
        </Box>
      )}
      {currentLocation && (
        <Box ml={5} mt={5}>
          <Flex as={Text} fontSize="lg" justify="center">
            Forecast for Current location
          </Flex>
          <Box mt={5}>
            {forecast.map((t) => {
              const day = moment.unix(t.date).format('MMMM Do, HH:mm');

              return (
                <Flex key={t.date}>
                  <Text mr={20}>{day}</Text>
                  <Text mr={5} w="100px">
                    Temp: {t.temp}
                  </Text>
                  <Text>
                    <Image
                      src={`http://openweathermap.org/img/w/${t.icon}.png`}
                      alt="weather icon"
                    />
                  </Text>
                </Flex>
              );
            })}
          </Box>
        </Box>
      )}
    </>
  );
}
