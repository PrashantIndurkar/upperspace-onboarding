import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function AuthLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="onboarding-intro"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="onboarding-plan" options={{ headerShown: false }} />
        <Stack.Screen
          name="onboarding-destinations"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
