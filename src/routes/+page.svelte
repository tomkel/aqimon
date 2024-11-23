<script lang="ts">
  // https://github.com/dimfeld/svelte-maplibre/blob/next/src/lib/GeolocateControl.svelte
  // https://maplibre.org/maplibre-gl-js/docs/API/classes/GeolocateControl
  // https://github.com/maplibre/maplibre-gl-js/blob/main/src/util/geolocation_support.ts
  // https://github.com/maplibre/maplibre-gl-js/blob/main/src/ui/control/geolocate_control.ts
  // https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/geolocation
  // https://github.com/tauri-apps/plugins-workspace/blob/v2/plugins/geolocation/android/src/main/java/Geolocation.kt
  // tauri geolocation plugin uses google API
  import {
    MapLibre,
    FullscreenControl,
    NavigationControl,
    GeolocateControl,
    ScaleControl,
  } from 'svelte-maplibre'
  import type maplibregl from 'maplibre-gl'
  import {
    checkPermissions,
    requestPermissions,
    getCurrentPosition,
    watchPosition,
    clearWatch,
  } from '@tauri-apps/plugin-geolocation'
  import { platform } from '@tauri-apps/plugin-os'

  async function setupGeoloc() {
    try {
      if (platform() !== 'android') return
      
      // window.navigator.geolocation.getCurrentPosition = getCurrentPosition
      // window.navigator.geolocation.watchPosition = watchPosition

      const checkStatus = await checkPermissions()
      console.log('checkStatus', checkStatus)
      if (
        checkStatus.coarseLocation === 'prompt' ||
        checkStatus.coarseLocation === 'prompt-with-rationale'
      ) {
        const requestStatus = await requestPermissions(['location'])
        console.log('requestStatus', requestStatus)
      }
    } catch (e: unknown) {
      console.error('probably not in tauri env:', e)
    }
  }
  void setupGeoloc()

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

  const options: PositionOptions = {
    enableHighAccuracy: false, // true == GPS, false == Wifi-location
    maximumAge: 60000, // in ms
    // timeout: 60000,
    timeout: 5000, // in ms
  } satisfies PositionOptions

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
