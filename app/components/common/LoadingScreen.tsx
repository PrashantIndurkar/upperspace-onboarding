import React from "react";
import { View, ActivityIndicator } from "react-native";

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
