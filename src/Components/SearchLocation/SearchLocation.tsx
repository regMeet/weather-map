import { useState } from 'react';
import { ReactSearchAutocomplete as SearchAutocomplete } from 'react-search-autocomplete';

import { getLocations } from 'api/MapService';

export interface SearchLocationProps {
  updateLocation: ({ lat, lng }) => void;
}

export function SearchLocation({ updateLocation }: SearchLocationProps) {
  const [fetchedLocations, setFetchedLocations] = useState([]);

  // TODO: memo - callback
  const handleOnSearch = async (query) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    const locations = await getLocations(query);
    setFetchedLocations(locations);
  };

  const handleOnSelect = (location) => {
    updateLocation(location);
  };

  const handleOnFocus = async () => {
    // TODO: open autocomplete
  };

  return (
    <SearchAutocomplete
      items={fetchedLocations}
      inputDebounce={200}
      onSearch={handleOnSearch}
      onSelect={handleOnSelect}
      onFocus={handleOnFocus}
      autoFocus
      styling={{ zIndex: 3 }}
    />
  );
}
