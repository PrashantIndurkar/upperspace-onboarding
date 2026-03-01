import React from "react";
import { Text, TouchableOpacity } from "react-native";
import GoogleIcon from "@/app/components/icons/GoogleIcon";
import AppleIcon from "@/app/components/icons/AppleIcon";

const ICON_SIZE = 22;

type Provider = "google" | "apple";

interface SocialButtonProps {
  provider: Provider;
  onPress?: () => void;
}

const labels: Record<Provider, string> = {
  google: "Google",
  apple: "Apple",
};

export default function SocialButton({
  provider,
  onPress = () => {},
}: SocialButtonProps) {
  const label = labels[provider];

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 flex-row items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white py-3 px-4"
      accessibilityLabel={`Continue with ${label}`}
      accessibilityRole="button"
    >
      {provider === "google" ? (
        <GoogleIcon size={ICON_SIZE} accessibilityLabel="" />
      ) : (
        <AppleIcon size={ICON_SIZE} color="#171717" accessibilityLabel="" />
      )}
      <Text className="text-neutral-900 font-semibold text-base">{label}</Text>
    </TouchableOpacity>
  );
}
