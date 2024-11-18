'use client'
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';

// Will be null for most users (only Mapbox authenticates this way).
// Required on Android. See Android installation notes.
MapLibreGL.setAccessToken(null);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

export default class MapLibre extends Component {
  render() {
    return (
      <View style={styles.page}>
        <MapLibreGL.MapView
          style={styles.map}
          logoEnabled={false}
          styleURL="https://demotiles.maplibre.org/style.json"
        />
      </View>
    );
  }
}