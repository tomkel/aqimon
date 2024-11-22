'use client'
// never triggers re-render
// native render updates the icon position , but doesn't trigger react re-render
import { useState } from 'react'
import type MapLibreGL from '@maplibre/maplibre-react-native'
import { UserLocation } from '@maplibre/maplibre-react-native'

export default function MLCurrLoc({ onUpdate }: { onUpdate: null | ((newLocation: MapLibreGL.Location) => void) }) {
  const [location, setLocation] = useState<MapLibreGL.Location>()

  const set = (newLocation: MapLibreGL.Location) => {
    console.log('set loc', newLocation)
    setLocation(newLocation)
    if (onUpdate) onUpdate(newLocation)
  }

  console.log('curr loc', location)
  return (
    <UserLocation
      animated={false}
      // renderMode="native"
      renderMode="normal"
      androidRenderMode="compass"
      visible={true}
      showsUserHeadingIndicator={true}
      onUpdate={set}
    />
  )
}
