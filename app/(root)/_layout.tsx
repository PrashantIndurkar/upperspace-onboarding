import { Stack } from "expo-router";

export default function RootGroupLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: "",
      }}
    >
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
