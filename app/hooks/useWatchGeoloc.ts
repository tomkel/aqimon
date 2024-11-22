import type { GeolocationError, GeolocationOptions, GeolocationResponse } from '@react-native-community/geolocation'
import Geolocation from '@react-native-community/geolocation'
import { useEffect } from 'react'

const opts = {
  interval: 1000,
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: Number.POSITIVE_INFINITY,
  distanceFilter: 5,
} satisfies GeolocationOptions

export default function useWatchGeoloc(
  success: (position: GeolocationResponse) => void,
  error: (error: GeolocationError) => void,
) {
  useEffect(() => {
    // https://github.com/michalchudziak/react-native-geolocation#watchposition
    const watchID = Geolocation.watchPosition(success, error, opts)

    return () => Geolocation.clearWatch(watchID)
  }, [success, error])
}