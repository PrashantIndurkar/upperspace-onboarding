import React from "react";
import { ActivityIndicator, View } from "react-native";

export function LoadingScreen() {
  return (
    <View
      className="flex-1 justify-center items-center"
      accessibilityLabel="Loading"
      accessibilityRole="progressbar"
    >
      <ActivityIndicator size="large" />
    </View>
  );
}
