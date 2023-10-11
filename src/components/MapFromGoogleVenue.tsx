"use client"

import React, { useMemo, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import CustomMarker from './CustomMarker/CustomMarker';

interface MapFromGoogleVenueProps {
  latitude: number;
  longitude: number;
}

const containerStyle = {
  width: '100%',
  height: '500px',
  marginTop: '2.5rem',
  borderRadius: "1rem",
  marginBottom: "5rem"
};

const center = {
  lat: 50.5083,
  lng: 21.42584
};



function MapFromGoogleVenue({ latitude, longitude }: MapFromGoogleVenueProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDwherVX1feEHOKQWL5naw63sji9gLU7sY"
  })


  const [map, setMap] = React.useState<google.maps.Map | null>(null);

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

  const [selectedMarker, setSelectedMarker] = useState<{ lat: number; lng: number; } | null>(null);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        styles: mapStyles,
        gestureHandling: 'greedy'
      }}
    >
      {map && (
        <CustomMarker lat={21.21} lng={21.11} map={map} imageSrc='/icons/paintball-gun.svg' />
      )}
      <></>
      {selectedMarker && (
        <InfoWindow
          position={selectedMarker}
          onCloseClick={() => {
            setSelectedMarker(null);
          }}
        >
          <div>
            <h2>Marker Title</h2>
            <p>Small description here</p>
            <div className="image-slider">

            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : <></>
}

export default React.memo(MapFromGoogleVenue)