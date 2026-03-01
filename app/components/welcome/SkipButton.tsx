import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { CaretLeft, CaretRight } from "phosphor-react-native";

const HIT_SLOP = { top: 0, bottom: 12, left: 12, right: 12 };
const ICON_SIZE = 22;

export type SkipButtonVariant = "light" | "dark";

interface SkipButtonProps {
  /** "light" = dark text (white/light screens), "dark" = white text (over image) */
  variant?: SkipButtonVariant;
}

const pillClassName =
  "min-h-fit justify-center items-center bg-white/30 border border-white rounded-full py-2 shadow-lg shadow-blue-200";

const SkipButton = ({ variant = "light" }: SkipButtonProps) => {
  const router = useRouter();
  const canGoBack = router.canGoBack();
  const isDark = variant === "dark";
  const iconColor = isDark ? "#ffffff" : "#171717";

  const handleSkip = () => {
    router.replace("/(root)/(auth)/sign-up");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View
      className="absolute top-[60px] left-4 right-4 z-10 flex-row justify-between items-center"
      pointerEvents="box-none"
    >
      {/* Left: Back button (only when there is a previous screen) */}
      {canGoBack ? (
        <TouchableOpacity
          onPress={handleBack}
          className={`${pillClassName} px-4 flex-row gap-1.5`}
          hitSlop={HIT_SLOP}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <CaretLeft size={ICON_SIZE} color={iconColor} weight="bold" />
        </TouchableOpacity>
      ) : (
        <View className="w-12" />
      )}

      {/* Right: Skip button with icon */}
      <TouchableOpacity
        onPress={handleSkip}
        className={`${pillClassName} px-8 flex-row gap-2 items-center`}
        hitSlop={HIT_SLOP}
        accessibilityLabel="Skip onboarding"
        accessibilityRole="button"
      >
        <Text
          className={`text-base font-bold ${isDark ? "text-white" : "text-neutral-900"}`}
        >
          Skip
        </Text>
        <CaretRight size={ICON_SIZE} color={iconColor} weight="bold" />
      </TouchableOpacity>
    </View>
  );
};

export default SkipButton;
