"use client"

import React, { useMemo, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import CustomMarker from './CustomMarker/CustomMarker';
import { PaintBallType } from "@/data/paintball.types"
import { CSSProperties } from 'react';


interface MapFromGoogleProps {
  paintballPlaces: PaintBallType[];
  className?: string;
}

const containerStyle: CSSProperties = {
  width: '46vw',
  height: '78vh',
  borderRadius: "1rem",
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
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
        { "color": "#c8e8d1" } // Zmieniono główny kolor tła
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry",
      "stylers": [
        { "color": "#f8f4f1" } // Przykładowy kolor dla terenów miejskich
      ]
    },
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
        { "visibility": "off" }
      ]
    },
    {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
        { "saturation": -100 },
        { "lightness": 45 }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [
        { "visibility": "simplified" }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [
        { "visibility": "off" }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels",
      "stylers": [
        { "visibility": "on" } // Włącza etykiety miejscowości
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "elementType": "labels",
      "stylers": [
        { "visibility": "off" }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
        { "visibility": "off" }
      ]
    },
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
        { "color": "#C6E2FF" },
        { "visibility": "on" }
      ]
    }

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
          // imageSrc='/paintball'
          imageSrc={`/${place.category.name}`}
          dataOfVenue={place}
        />
      ))}
      <></>
    </GoogleMap>
  ) : <></>
}

export default React.memo(MapFromGoogle)