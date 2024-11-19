'use client'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
// import MapLibreGL, { MapView } from '@maplibre/maplibre-react-native'
// import MapView from 'react-native-maps'
import { MapView } from '@rnmapbox/maps'
import CurrLocation from './CurrLocation.tsx'

// Will be null for most users (only Mapbox authenticates this way).
// Required on Android. See Android installation notes.
// MapLibreGL.setAccessToken(null)

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    backgroundColor: 'tomato',
  },
  container: {
    height: 700,
    width: 350,
    backgroundColor: 'green',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
})

const MapsLibre = () => (
  <MapView
    style={styles.map}
    logoEnabled={false}
    styleURL="https://demotiles.maplibre.org/style.json"
    compassEnabled={true}
    compassViewPosition={1}
  />
)

const MapsExpo = () => <MapView style={styles.map} />

const MapsMapbox = () => (
  <MapView
    style={styles.map}
    logoEnabled={false}
    // styleURL="https://demotiles.maplibre.org/style.json"
    compassEnabled={true}
    compassViewPosition={1}
  />
)

export default class MapLibre extends Component {
  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapsMapbox />
        </View>
      </View>
    )
  }
}
