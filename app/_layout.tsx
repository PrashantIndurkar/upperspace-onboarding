import "../global.css";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AnimatedSplashScreen } from "./components/AnimatedSplashScreen";

// Keep native splash visible until we show and complete our in-app animated splash
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger race conditions, ignore */
});

export default function RootLayout() {
  const [splashComplete, setSplashComplete] = useState(false);

  // Hide native splash as soon as we show our in-app animated splash so the animation is visible
  useEffect(() => {
    if (!splashComplete) {
      SplashScreen.hideAsync();
    }
  }, []);

  return (
    <SafeAreaProvider>
      {!splashComplete ? (
        <AnimatedSplashScreen onComplete={() => setSplashComplete(true)} />
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      )}
    </SafeAreaProvider>
  );
}
