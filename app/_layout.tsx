import { Stack } from "expo-router";
import * as SystemUI from "expo-system-ui";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import { AuthProvider } from "./contexts/AuthContext";

// Root window black so no white flash before or after native splash
SystemUI.setBackgroundColorAsync("#000000").catch(() => {});

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(root)" options={{ title: "" }} />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
