'use client'
// expo-location requires google play services 
import { useState, useEffect } from 'react'
import { Platform, Text, View, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import MapLibreGL, { Annotation, UserLocation } from '@maplibre/maplibre-react-native'

export default function ExpoLoc() {
  const [location, setLocation] = useState<Location.LocationObject>()
  // const [location, setLocation] = useState<MapLibreGL.Location | Location.LocationObject | null>(null)
  // const [location, setLocation] = useState<MapLibreGL.Location>()
  const [errorMsg, setErrorMsg] = useState<string>()
  // const [intervalId, setIntervalId] = useState(-1)

  useEffect(() => {
    async function checkLocPerm() {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        throw new Error('Permission to access location was denied')
      }
    }

    checkLocPerm()
      .then(() => {
        console.log('watching..')
        Location.watchPositionAsync(
          {
            accuracy: Location.LocationAccuracy.Highest,
            mayShowUserSettingsDialog: false,
            timeInterval: 1,
            distanceInterval: 1,
          },
          (expoLocation: Location.LocationObject) => {
            console.log('got loc', expoLocation)
            setLocation(expoLocation)
          },
        )
      })
      .catch((e) => setErrorMsg(e))
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
