import React, { type ReactNode } from "react";
import { View, Text, TextInput, Platform } from "react-native";
import { colors } from "@/app/theme/colors";

/** Fixed height for single-line inputs: prevents growth when typing and keeps text vertically centered. */
const INPUT_HEIGHT = 48;

export interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "visible-password";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  rightElement?: ReactNode;
  editable?: boolean;
}

export default function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  rightElement,
  editable = true,
}: FormFieldProps) {
  const hasError = Boolean(error?.trim());

  return (
    <View className="mb-4">
      <Text
        className="text-neutral-800 font-medium text-base mb-1.5"
        nativeID={`label-${label.replace(/\s/g, "-")}`}
      >
        {label}
      </Text>
      <View className="flex-row items-center min-h-12">
        <TextInput
          className={`flex-1 rounded-xl border text-base text-neutral-900 bg-white px-4 ${
            hasError ? "border-red-500" : "border-neutral-300"
          } ${rightElement != null ? "pr-12" : ""} ${!editable ? "opacity-70" : ""}`}
          style={[
            { height: INPUT_HEIGHT, paddingVertical: 0, textAlignVertical: "center" },
            Platform.OS === "android" && { includeFontPadding: false },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          accessibilityLabel={label}
          accessibilityHint={hasError ? error : undefined}
          accessibilityState={{ disabled: !editable }}
        />
        {rightElement != null ? (
          <View className="absolute right-3 top-0 bottom-0 justify-center">
            {rightElement}
          </View>
        ) : null}
      </View>
      {hasError ? (
        <Text
          className="text-red-500 text-sm mt-1"
          role="alert"
          accessibilityLiveRegion="polite"
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}
