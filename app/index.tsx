import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 min-h-screen-safe justify-center items-center bg-black p-safe">
      <Text
        className="text-2xl font-semibold text-white"
        accessibilityRole="header"
      >
        Home
      </Text>
    </View>
  );
}
