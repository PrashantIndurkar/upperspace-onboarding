import React from "react";
import { Text } from "react-native";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const Title: React.FC<TypographyProps> = ({ children, className = "" }) => (
  <Text className={`text-4xl font-extrabold text-black mb-4 ${className}`}>
    {children}
  </Text>
);

export const Subtitle: React.FC<TypographyProps> = ({ children, className = "" }) => (
  <Text className={`text-lg font-medium text-gray-500 mb-6 leading-6 ${className}`}>
    {children}
  </Text>
);

export const Body: React.FC<TypographyProps> = ({ children, className = "" }) => (
  <Text className={`text-base font-normal text-gray-700 ${className}`}>
    {children}
  </Text>
);
