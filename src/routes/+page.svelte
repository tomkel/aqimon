<script lang="ts">
  // https://github.com/dimfeld/svelte-maplibre/blob/next/src/lib/DefaultMarker.svelte
  // https://github.com/dimfeld/svelte-maplibre/blob/next/src/lib/GeolocateControl.svelte
  // https://maplibre.org/maplibre-gl-js/docs/API/classes/GeolocateControl
  import {
    MapLibre,
    DefaultMarker,
    FullscreenControl,
    NavigationControl,
    GeolocateControl,
    ScaleControl,
  } from 'svelte-maplibre'
  import maplibregl from 'maplibre-gl'

  type GeoEvent =
    | 'trackuserlocationstart'
    | 'trackuserlocationend'
    | 'userlocationfocus'
    | 'userlocationlostfocus'
    | 'geolocate'
    | 'error'
    | 'outofmaxbounds'

  const allGeoEvents: GeoEvent[] = [
    'trackuserlocationstart',
    'trackuserlocationend',
    'userlocationfocus',
    'userlocationlostfocus',
    'geolocate',
    'error',
    'outofmaxbounds',
  ]
  const lngLat = new maplibregl.LngLat(-20, 20)

  let lng = $state(0)
  let lat = $state(0)

  const success = (position: GeolocationPosition) => {
    console.log('geoloc success', position)
    lng = position.coords.longitude
    lat = position.coords.latitude
  }
  const error = (err: GeolocationPositionError) => {
    console.error('geoloc error', err)
    throw new Error(err.message)
  }
  const options: PositionOptions = {
    enableHighAccuracy: false, // true == GPS, false == Wifi-location
    maximumAge: 60000, // in ms
    // timeout: 60000,
    timeout: 5000, // in ms
  } satisfies PositionOptions
  // const id = navigator.geolocation.watchPosition(success, error, options)
  // return () => navigator.geolocation.clearWatch(id)

  let control = $state<maplibregl.GeolocateControl | undefined>(undefined)
  $effect(() => {
    console.log('control', control)
    if (control) {
      const listeners = allGeoEvents.map((ev) => {
        console.log('adding GeoEvent', ev)
        if (!control) throw new Error('control should be defined in subscribe')
        const listener = (...args: unknown[]) => console.log(...args)
        control.on(ev, listener)
        return [ev, listener] as const
      })

      return () => {
        if (!control) throw new Error('control should be defined in cleanup')
        for (const [ev, listener] of listeners) {
          control.off(ev, listener)
        }
      }
    }
  })
</script>

<MapLibre
  center={[-20, 20]}
  zoom={1}
  class="map"
  style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  attributionControl={false}
>
  <DefaultMarker {lngLat} draggable />
  <NavigationControl />
  <GeolocateControl
    fitBoundsOptions={{ maxZoom: 4 }}
    trackUserLocation={true}
    showAccuracyCircle={true}
    showUserLocation={true}
    positionOptions={options}
    bind:control
  />
  <FullscreenControl />
  <ScaleControl />
</MapLibre>

<style>
  :global(.map) {
    height: 90vh;
    width: 90vw;
    margin-inline: 5vw;
    margin-block: 5vw;
  }
</style>
