'use client'
import React, { Component, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import MapLibreGL, { MapView, UserLocation } from '@maplibre/maplibre-react-native'
// import MLCurrLoc from './MLCurrLoc.tsx'
import LocPerms from './LocPerms.tsx'
import BrowserLoc from './BrowserLoc.tsx'
// import MapView from 'react-native-maps'
// import Mapbox, { MapView, LocationPuck } from '@rnmapbox/maps'

// Will be null for most users (only Mapbox authenticates this way).
// Required on Android. See Android installation notes.
MapLibreGL.setAccessToken(null)

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    backgroundColor: 'tomato',
  },
  container: {
    height: '85%',
    width: '85%',
    backgroundColor: 'green',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
})

const MapsLibre = () => {

  return (
    <MapView
      style={styles.map}
      logoEnabled={false}
      styleURL="https://demotiles.maplibre.org/style.json"
      compassEnabled={true}
      compassViewPosition={1}
    >
      <BrowserLoc />
      {/* <CurrLocation /> */}
      {/* <MLCurrLoc onUpdate={null}/> */}
    </MapView>
  )
}

/*
const MapsExpo = () => <MapView style={styles.map} />
Mapbox.setAccessToken(`pk`)
const MapsMapbox = () => (
  <MapView
    style={styles.map}
    logoEnabled={false}
    // styleURL="https://demotiles.maplibre.org/style.json"
    compassEnabled={true}
    compassViewPosition={1}
  >
    <LocationPuck
       puckBearingEnabled={true}
    />
  </MapView>
)
*/

export default function MapLibre() {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <LocPerms>
          <MapsLibre />
        </LocPerms>
      </View>
    </View>
  )
}
