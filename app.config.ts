import type { ExpoConfig, ConfigContext } from 'expo/config'

// export default ({ config }: ConfigContext): ExpoConfig => {

const config: ExpoConfig = {
  name: "AQI mon",
  slug: "aqimon",
  version: "1.0.0",
  orientation: "portrait",
  // icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  jsEngine: "hermes",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      // foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    bundler: "metro",
    output: "single",
    // favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        // image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCanary: true,
    reactCompiler: true,
    reactServerFunctions: true,
    reactServerComponentRoutes: true,
  },
};

export default config
