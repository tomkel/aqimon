<script lang="ts">
  // https://github.com/dimfeld/svelte-maplibre/blob/next/src/lib/DefaultMarker.svelte
  import { MapLibre, DefaultMarker } from 'svelte-maplibre'
  import type { LngLatLike } from 'maplibre-gl'
  import { LngLat } from 'maplibre-gl'
  
  const lngLat = new LngLat(-20, 20)
</script>

<MapLibre
  center={[-20, 20]}
  zoom={1}
  class="map"
  standardControls
  style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
>
  <DefaultMarker {lngLat} draggable />
</MapLibre>

<style>
  :global(.map) {
    height: 500px;
    width: 1100px;
  }
</style>
