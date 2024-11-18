import { Text, View } from "react-native";
import MapLibre from "./MapLibre.tsx"

function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

export default function MapIndex() {
  return (
    <MapLibre />
  )
}

export const unstable_settings = {
  // This component will be rendered at build-time and never re-rendered in production.
  render: 'static',
}
