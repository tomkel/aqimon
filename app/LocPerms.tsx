'use client'
import MapLibreGL from '@maplibre/maplibre-react-native'
import type React from 'react'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
// import 'react-native-gesture-handler'

const IS_ANDROID = Platform.OS === 'android'

function LocPerms({ children }: { children: React.ReactElement }) {
  const [isFetchingAndroidPermission, setIsFetchingAndroidPermission] = useState(IS_ANDROID)
  const [isAndroidPermissionGranted, setIsAndroidPermissionGranted] = useState(false)

  if (!IS_ANDROID) throw new Error('only android supported')

  useEffect(() => {
    ;(async () => {
        const isGranted = await MapLibreGL.requestAndroidLocationPermissions()

        setIsAndroidPermissionGranted(isGranted)
        setIsFetchingAndroidPermission(false)
    })()
  }, [])

  if (!isAndroidPermissionGranted || isFetchingAndroidPermission) {
    return null
  }
  return children
}

export default LocPerms