import "../global.css";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import * as SystemUI from "expo-system-ui";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./contexts/AuthContext";

const MIN_SPLASH_DURATION_MS = 2000;

// Root window black so no white flash before or after native splash
SystemUI.setBackgroundColorAsync("#000000").catch(() => {});

SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger race conditions, ignore */
});

export default function RootLayout() {
  const [showApp, setShowApp] = useState(false);

  // Load fonts (or other async init). Add font assets when needed, e.g.:
  // useFonts({ Inter: require('./assets/fonts/Inter.ttf') })
  const [fontsLoaded] = useFonts({});

  // Single splash: native Expo splash (app.json). Hide when app is ready, then show main UI.
  useEffect(() => {
    if (!fontsLoaded) return;
    const t = setTimeout(() => {
      SplashScreen.hideAsync().catch(() => {});
      setShowApp(true);
    }, MIN_SPLASH_DURATION_MS);
    return () => clearTimeout(t);
  }, [fontsLoaded]);

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
