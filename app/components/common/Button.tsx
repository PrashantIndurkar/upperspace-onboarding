import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: "primary" | "secondary" | "outline";
  loading?: boolean;
  className?: string;
  textClassName?: string;
  IconLeft?: React.ComponentType<Record<string, unknown>>;
  IconRight?: React.ComponentType<Record<string, unknown>>;
}

const getVariantStyles = (variant: ButtonProps["variant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "outline":
      return "bg-transparent border border-neutral-300";
    case "primary":
    default:
      return "bg-[#0286FF] shadow-md shadow-neutral-400/70";
  }
};

const getTextVariantStyles = (variant: ButtonProps["variant"]) => {
  switch (variant) {
    case "outline":
      return "text-neutral-500";
    case "secondary":
      return "text-gray-100";
    case "primary":
    default:
      return "text-white";
  }
};

const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = "primary",
  loading = false,
  className = "",
  textClassName = "",
  IconLeft,
  IconRight,
}) => (
  <TouchableOpacity
    onPress={onPress}
    className={`w-full rounded-full flex flex-row justify-center items-center p-3 mb-2 ${getVariantStyles(
      variant
    )} ${className}`}
    disabled={loading}
    accessibilityRole="button"
    accessibilityLabel={title}
  >
    {loading ? (
      <ActivityIndicator color={variant === "outline" ? "gray" : "white"} />
    ) : (
      <>
        {IconLeft && <IconLeft />}
        <Text className={`text-lg font-bold ml-2 ${getTextVariantStyles(variant)} ${textClassName}`}>
          {title}
        </Text>
        {IconRight && <IconRight />}
      </>
    )}
  </TouchableOpacity>
);

export default Button;
