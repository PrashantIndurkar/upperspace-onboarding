import React from "react";
import { Image, StyleProp, View, ViewStyle } from "react-native";
import { appIcon } from "@/app/assetSources";

const DEFAULT_SIZE = 80;

export interface AppIconProps {
  /** Size in logical pixels (width and height). Default 80. */
  size?: number;
  /** Optional style override (e.g. for margin). Applied to the wrapper. */
  style?: StyleProp<ViewStyle>;
  /** Optional NativeWind class name. Applied to the wrapper. */
  className?: string;
}

/** Tailwind rounded-xl = 12px */
const ROUNDED_XL = 12;

/**
 * App branding icon (UpperSpace logo). Use on splash, auth screens, and elsewhere.
 * Rendered with rounded-xl corners (not full circle).
 */
export function AppIcon({
  size = DEFAULT_SIZE,
  style,
  className,
}: AppIconProps) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: ROUNDED_XL,
          overflow: "hidden",
        },
        style,
      ]}
      className={className}
    >
      <Image
        source={appIcon}
        resizeMode="contain"
        style={{ width: size, height: size }}
        accessibilityRole="image"
        accessibilityLabel="UpperSpace logo"
      />
    </View>
  );
}
