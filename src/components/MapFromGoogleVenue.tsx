"use client"

import React, { useMemo, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import CustomMarker from './CustomMarker/CustomMarker';

interface MapFromGoogleVenueProps {
  latitude: number;
  longitude: number;
  venueName?: string;
}

const containerStyle = {
  width: '100%',
  height: '500px',
  marginTop: '2.5rem',
  borderRadius: "1rem",
  marginBottom: "5rem"
};



function MapFromGoogleVenue({ latitude, longitude, venueName }: MapFromGoogleVenueProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDwherVX1feEHOKQWL5naw63sji9gLU7sY"
  })


  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const center = {
    lat: 55,
    lng: 23
  }

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback() {
    setMap(null)
  }, [])

  const mapStyles = useMemo(() => [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ], []);

  //const [selectedMarker, setSelectedMarker] = useState<{ lat: number; lng: number; venueName: string } | null>(null);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: latitude, lng: longitude }}
      //center={{ lat: 11, lng: 11 }}
      zoom={11}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        styles: mapStyles,
        gestureHandling: 'greedy'
      }}

    >
      {map && (
        <CustomMarker
          lat={latitude}
          lng={longitude}
          map={map}
          imageSrc={`/${venueName}`}
          dataOfVenue={undefined}
        />
      )}
      <></>
    </GoogleMap>
  ) : <></>
}

export default React.memo(MapFromGoogleVenue)