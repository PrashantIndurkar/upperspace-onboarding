import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { Image, LayoutChangeEvent, Text, View } from "react-native";

const MIN_SPLASH_DURATION_MS = 2000;

// App icon — no borders, just the image (path relative to this file)
const APP_ICON = require("../../assets/icon.png");

type SplashScreenProps = {
  onComplete: () => void;
  /** When false, splash waits before completing. Set from e.g. useFonts() so app is ready (fonts, init) before showing main UI. Default true. */
  isAppReady?: boolean;
};

/**
 * Splash: app icon image (no borders) + "UpperSpace" in large black text.
 * Hides native splash only after this view has painted (seamless handoff).
 * Completes after min duration and when isAppReady is true (e.g. fonts loaded).
 */
export function AnimatedSplashScreen({
  onComplete,
  isAppReady = true,
}: SplashScreenProps) {
  const [hasPainted, setHasPainted] = useState(false);

  const handleLayout = useCallback((_e: LayoutChangeEvent) => {
    setHasPainted(true);
  }, []);

  // Hide native splash only after our view has been laid out and painted
  useEffect(() => {
    if (!hasPainted) return;
    SplashScreen.hideAsync().catch(() => {});
  }, [hasPainted]);

  // Complete when both min duration has elapsed and app is ready (e.g. fonts loaded)
  useEffect(() => {
    if (!isAppReady) return;
    const t = setTimeout(onComplete, MIN_SPLASH_DURATION_MS);
    return () => clearTimeout(t);
  }, [isAppReady, onComplete]);

  return (
    <View
      className="flex-1 items-center justify-center bg-white"
      onLayout={handleLayout}
      accessibilityLabel="UpperSpace splash"
      accessibilityRole="image"
    >
      <Image
        source={APP_ICON}
        resizeMode="contain"
        className="h-32 w-32"
        accessibilityRole="image"
        accessibilityLabel="UpperSpace logo"
      />
      <Text
        className="mt-6 text-5xl font-bold text-black"
        accessibilityLabel="UpperSpace"
      >
        UpperSpace
      </Text>
    </View>
  );
}
