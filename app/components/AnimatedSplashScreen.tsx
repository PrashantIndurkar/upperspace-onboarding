import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { LayoutChangeEvent, Text, View } from "react-native";

const MIN_SPLASH_DURATION_MS = 2000;

type SplashScreenProps = {
  onComplete: () => void;
  /** When false, splash waits before completing. Set from e.g. useFonts() so app is ready (fonts, init) before showing main UI. Default true. */
  isAppReady?: boolean;
};

/**
 * Simple splash: company/app name only, then main app.
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
      className="flex-1 items-center justify-center bg-black"
      onLayout={handleLayout}
      accessibilityLabel="Upper Space"
      accessibilityRole="image"
    >
      <Text
        className="text-2xl font-semibold text-white"
        accessibilityElementsHidden
      >
        UpperSpace
      </Text>
    </View>
  );
}
