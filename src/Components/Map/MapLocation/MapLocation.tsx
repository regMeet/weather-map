import { useState, useCallback, useEffect } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import type { MarkerDragEvent, LngLat } from 'react-map-gl';
import { Box } from '@chakra-ui/react';

import ControlPanel from './ControlPanel';
import Pin from '../Pin';
import { GeoLocation } from '../../../api/types';

interface MapLocationProps {
  location: GeoLocation;
  updateLocation?: (GeoLocation) => void;
  draggable?: boolean;
  debug?: boolean;
}

export function MapLocation({
  location: { lat, lng },
  updateLocation,
  draggable = false,
  debug = false
}: MapLocationProps) {
  const [marker, setMarker] = useState({
    latitude: lat,
    longitude: lng
  });

  useEffect(() => {
    setMarker({
      latitude: lat,
      longitude: lng
    });
  }, [lat, lng]);

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

  // TODO: useMemo
  const viewPort = {
    latitude: lat,
    longitude: lng,
    zoom: 13
  };

  return (
    <Box w="100%" h="50vh">
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
