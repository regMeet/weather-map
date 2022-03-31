import { useState, useCallback } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import type { MarkerDragEvent, LngLat } from 'react-map-gl';
import { Box } from '@chakra-ui/react';

import ControlPanel from './ControlPanel';
import Pin from '../Pin';

interface MapLocationProps {
  location: {
    lat: number;
    lng: number;
  };
  updateLocation?: ({ lat, lng }) => void;
  draggable?: boolean;
  debug?: boolean;
}

export function MapLocation({
  location: { lat, lng },
  updateLocation,
  draggable = false,
  debug = false
}: MapLocationProps) {
  const viewPort = {
    latitude: lat,
    longitude: lng,
    zoom: 13
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

    updateLocation?.({ lat: event.lngLat.lat, lng: event.lngLat.lng });
  }, []);

  return (
    <Box w="55%" h="80vh" zIndex={2}>
      <Map
        initialViewState={viewPort}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        latitude={viewPort.latitude}
        longitude={viewPort.longitude}
      >
        <Marker
          latitude={marker.latitude}
          longitude={marker.longitude}
          anchor="bottom"
          draggable={draggable}
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
