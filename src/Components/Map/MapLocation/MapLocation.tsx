import { useState, useCallback } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import type { MarkerDragEvent, LngLat } from 'react-map-gl';
import { Box } from '@chakra-ui/react';

import ControlPanel from './ControlPanel';
import Pin from '../Pin';

interface MapLocationProps {
  lat: number;
  lng: number;
  updateLocation: ({ lat, lng }) => void;
  debug?: boolean;
}

export function MapLocation({ lat, lng, updateLocation, debug = false }: MapLocationProps) {
  const viewPort = {
    latitude: lat,
    longitude: lng,
    zoom: 14
  };

  const [marker, setMarker] = useState({
    latitude: lat,
    longitude: lng
  });

  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));

    setMarker({
      latitude: event.lngLat.lat,
      longitude: event.lngLat.lng
    });
  }, []);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));

    updateLocation({ lat: event.lngLat.lat, lng: event.lngLat.lng });
  }, []);

  return (
    <Box w="50%" h="50vh">
      <Map initialViewState={viewPort} mapStyle="mapbox://styles/mapbox/dark-v9">
        <Marker
          latitude={marker.latitude}
          longitude={marker.longitude}
          anchor="bottom"
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        >
          <Pin size={20} />
        </Marker>

        <NavigationControl />
      </Map>
      {debug && <ControlPanel events={events} />}
    </Box>
  );
}
