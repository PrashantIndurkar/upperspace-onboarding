import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { CaretLeft } from "phosphor-react-native";
import { colors } from "@/app/theme/colors";

const HIT_SLOP = { top: 12, bottom: 12, left: 12, right: 12 };
const ICON_SIZE = 22;

interface BackHeaderProps {
  /** When provided, called instead of router.back() so a screen can navigate to a specific route. */
  onBack?: () => void;
}

export default function BackHeader({ onBack }: BackHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View className="flex-row justify-between items-center min-h-12">
      <TouchableOpacity
        onPress={handleBack}
        className="min-h-12 min-w-12 rounded-full bg-neutral-100 border border-neutral-200 justify-center items-center"
        hitSlop={HIT_SLOP}
        accessibilityLabel="Go back"
        accessibilityRole="button"
      >
        <CaretLeft size={ICON_SIZE} color={colors.icon} weight="bold" />
      </TouchableOpacity>
      {/* Reserve space for layout (no right icon) */}
      <View className="min-h-12 min-w-12" />
    </View>
  );
}
