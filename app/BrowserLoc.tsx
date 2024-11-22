'use client'
import { useState, useCallback } from 'react'
import { Text } from 'react-native'
import Geolocation, { type GeolocationError, type GeolocationOptions, type GeolocationResponse } from '@react-native-community/geolocation'
import MapLibreGL, { Annotation, CircleLayer, MarkerView, PointAnnotation, ShapeSource } from '@maplibre/maplibre-react-native'
import useWatchGeoloc from './hooks/useWatchGeoloc.ts'
import { normalIcon } from '@maplibre/maplibre-react-native/javascript/components/UserLocation.tsx'

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  // authorizationLevel: 'always', // ios
  // enableBackgroundLocationUpdates: true, // ios
  locationProvider: 'android',
})

const geojson: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
  ]
};

const layerStyle: CircleLayer = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
};

export default function BrowserLoc() {
  const [location, setLocation] = useState<GeolocationResponse>()
  const [errorMsg, setErrorMsg] = useState<string>()

  const success = useCallback((pos: GeolocationResponse) => {
    console.log('got pos', pos)
    setLocation(pos)
  }, [])
  const error = useCallback((err: GeolocationError) => {
    console.error('err', err)
    setErrorMsg(err.toString())
  }, [])
  useWatchGeoloc(success, error)

  let text = 'Waiting...'
  if (errorMsg) {
    text = errorMsg
  } else if (location) {
    text = JSON.stringify(location)
  }
  console.log('loc', text)

  if (!location) return <></>

  const coordinates = [location.coords.longitude, location.coords.latitude]

  const annotation = (
    <Annotation
      id="gps"
      // id="mapboxUserLocation"
      coordinates={coordinates}
      animated={false}
      style={{ iconRotate: 1 }}
    >
      {normalIcon()}
    </Annotation>
  )
  
  const point: GeoJSON.Point = { type: 'Point', coordinates } satisfies GeoJSON.Point
  const feature: GeoJSON.Feature = { type: 'Feature', geometry: point, properties: null } satisfies GeoJSON.Feature
  const shapeSource = (
    <ShapeSource id="gps" shape={feature}>
      <CircleLayer
        id="gpscircles"
        style={{
          visibility: 'visible',
          circleRadius: 10000,
          circleColor: 'red',
          circleOpacity: 1.0,
          circleStrokeWidth: 5,
          circleStrokeColor: 'green',
          circleStrokeOpacity: 1.0,
        }}
      />

      {/* {normalIcon()} */}
    </ShapeSource>
  )
  const markerView = (
    <MarkerView coordinate={coordinates} allowOverlap={true}>
      <Text>What</Text>
    </MarkerView>
  )
  
  const pointAnnotation = (
    <PointAnnotation id="gpspoint" coordinate={coordinates}>
      <Text>What</Text>
    </PointAnnotation>
  )

  return (
    <>
      {markerView}
    </>
  )
}
