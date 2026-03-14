import { colors } from "@/app/theme/colors";
import { EyeIcon, EyeSlashIcon } from "phosphor-react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import FormField, { type FormFieldProps } from "./FormField";

const ICON_SIZE = 22;

export interface PasswordFieldProps extends Omit<
  FormFieldProps,
  "secureTextEntry" | "rightElement" | "keyboardType"
> {
  placeholder?: string;
  error?: string;
}

export default function PasswordField(props: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((v) => !v);
  };

  return (
    <FormField
      {...props}
      secureTextEntry={!visible}
      keyboardType="default"
      rightElement={
        <TouchableOpacity
          onPress={toggleVisibility}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          accessibilityLabel={visible ? "Hide password" : "Show password"}
          accessibilityRole="button"
        >
          {visible ? (
            <EyeSlashIcon
              size={ICON_SIZE}
              color={colors.iconMuted}
              weight="regular"
            />
          ) : (
            <EyeIcon
              size={ICON_SIZE}
              color={colors.iconMuted}
              weight="regular"
            />
          )}
        </TouchableOpacity>
      }
    />
  );
}
