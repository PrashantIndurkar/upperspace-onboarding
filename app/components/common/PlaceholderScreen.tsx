import React from "react";
import { View, Text } from "react-native";

interface PlaceholderScreenProps {
  title: string;
}

export function PlaceholderScreen({ title }: PlaceholderScreenProps) {
  return (
    <View
      className="flex-1 items-center justify-center bg-white"
      accessibilityLabel={title}
    >
      <Text className="text-2xl font-bold">{title}</Text>
    </View>
  );
}
