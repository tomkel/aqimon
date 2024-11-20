import type { ExpoConfig, ConfigContext } from "expo/config";

// export default ({ config }: ConfigContext): ExpoConfig => {

const config: ExpoConfig = {
  name: 'AQI Monitor',
  slug: 'aqimon',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  jsEngine: 'hermes',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.aqimon',
  },
  web: {
    bundler: 'metro',
    output: 'single',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission: 'Allow $(PRODUCT_NAME) to use your location.', // ios
        // "Show current location on map."
        isAndroidBackgroundLocationEnabled: true,
      },
    ],
    '@maplibre/maplibre-react-native',
    [
      '@rnmapbox/maps',
      {
        RNMapboxMapsDownloadToken: 'sk',
        RNMapboxMapsVersion: '11.8.0',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCanary: true,
    // reactCompiler: true,
    // reactServerFunctions: true,
    // reactServerComponentRoutes: true,
  },
}

export default config
