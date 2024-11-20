'use client'
import { useState, useEffect } from 'react'
import { Platform, Text, View, StyleSheet } from 'react-native'
import * as Location from 'expo-location'
import MapLibreGL, { UserLocation } from '@maplibre/maplibre-react-native'

export default function CurrLocation() {
  // const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [location, setLocation] = useState<MapLibreGL.Location | Location.LocationObject | null>(null)
  // const [location, setLocation] = useState<MapLibreGL.Location | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      const expoLocation = await Location.getCurrentPositionAsync({})
      setLocation(expoLocation)
    }

    getCurrentLocation()
  }, [])

  let text = 'Waiting...'
  if (errorMsg) {
    text = errorMsg
  } else if (location) {
    text = JSON.stringify(location)
  }
  console.log('loc', text)

  return <UserLocation onUpdate={(newLocation) => setLocation(newLocation)} />
}
