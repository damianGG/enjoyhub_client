"use client"

import React, { useMemo, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import CustomMarker from './CustomMarker/CustomMarker';
import { PaintBallType } from "@/data/paintball.types"

interface MapFromGoogleProps {
  paintballPlaces: PaintBallType[];
}

const containerStyle = {
  width: '100%',
  height: '80vh',
  borderRadius: "1rem",
  marginBottom: "5rem"
};

const center = {
  lat: 52.106201,
  lng: 19.494417
};



function MapFromGoogle({ paintballPlaces }: MapFromGoogleProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDwherVX1feEHOKQWL5naw63sji9gLU7sY"
  })

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
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

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        styles: mapStyles,
        gestureHandling: 'greedy'
      }}
    >

      {paintballPlaces.map((place, index) => (
        map && <CustomMarker
          key={index}
          lat={place.latitude}
          lng={place.longitude}
          map={map}
          imageSrc='/icons/paintball-gun.svg'
          dataOfVenue={place}
        />
      ))}
      <></>
    </GoogleMap>
  ) : <></>
}

export default React.memo(MapFromGoogle)