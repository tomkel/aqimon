'use client'
import { useState, useEffect } from 'react'
import Geolocation, { type GeolocationError, type GeolocationOptions, type GeolocationResponse } from '@react-native-community/geolocation'
import MapLibreGL, { Annotation, UserLocation } from '@maplibre/maplibre-react-native'

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  // authorizationLevel: 'always', // ios
  // enableBackgroundLocationUpdates: true, // ios
  locationProvider: 'android',
})

export default function BrowserLoc() {
  const [location, setLocation] = useState<GeolocationResponse>()
  // const [location, setLocation] = useState<MapLibreGL.Location | Location.LocationObject | null>(null)
  // const [location, setLocation] = useState<MapLibreGL.Location>()
  const [errorMsg, setErrorMsg] = useState<string>()
  // const [intervalId, setIntervalId] = useState(-1)

  useEffect(() => {
    const success = (pos: GeolocationResponse) => {
      console.log('got pos', pos)
      setLocation(pos)
    }
    const error = (err: GeolocationError) => {
      console.error('err', err)
      setErrorMsg(err.toString())
    }
    const opts = {
      interval: 1000,
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: Number.POSITIVE_INFINITY,
      distanceFilter: 5,
    } satisfies GeolocationOptions

    // https://github.com/michalchudziak/react-native-geolocation?#watchposition
    const watchID = Geolocation.watchPosition(success, error, opts)

    return () => Geolocation.clearWatch(watchID)
  }, [])

  let text = 'Waiting...'
  if (errorMsg) {
    text = errorMsg
  } else if (location) {
    text = JSON.stringify(location)
  }
  console.log('loc', text)

  return (
    <>
      {location && (
        <Annotation
          id="gps"
          coordinates={[location.coords.longitude, location.coords.latitude]}
          animated={false}
        />
      )}
    </>
  )
}
