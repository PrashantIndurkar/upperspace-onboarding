import "../global.css";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import * as SystemUI from "expo-system-ui";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AnimatedSplashScreen } from "./components/AnimatedSplashScreen";

// Root window black so no white flash before or after native splash
SystemUI.setBackgroundColorAsync("#000000").catch(() => {});

SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger race conditions, ignore */
});

export default function RootLayout() {
  const [splashComplete, setSplashComplete] = useState(false);

  // Load fonts (or other async init). Add font assets when needed, e.g.:
  // useFonts({ Inter: require('./assets/fonts/Inter.ttf') })
  const [fontsLoaded] = useFonts({});

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: "#000000" }}>
        {!splashComplete ? (
          <AnimatedSplashScreen
            onComplete={() => setSplashComplete(true)}
            isAppReady={fontsLoaded}
          />
        ) : (
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#000000" },
            }}
          >
            <Stack.Screen name="index" />
          </Stack>
        )}
      </View>
    </SafeAreaProvider>
  );
}
