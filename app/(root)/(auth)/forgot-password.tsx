import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { PencilSimpleLine } from "phosphor-react-native";
import BackHeader from "@/app/components/auth/BackHeader";
import FormField from "@/app/components/form/FormField";
import Button from "@/app/components/common/Button";
import { AppIcon } from "@/app/components/common/AppIcon";
import { useAuth } from "@/app/contexts/AuthContext";
import { validateForgotPassword } from "@/app/utils/validation";

const CIRCLE_ICON_SIZE = 80;

const EMAIL_ERROR_MESSAGES = [
  "Email is required.",
  "Please enter a valid email address.",
];

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { sendPasswordResetCode } = useAuth();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contextError, setContextError] = useState("");
  const [loading, setLoading] = useState(false);

  const setFieldErrors = (errors: string[]) => {
    setEmailError(
      errors.find((e) => EMAIL_ERROR_MESSAGES.includes(e)) ?? ""
    );
    const mapped = new Set(EMAIL_ERROR_MESSAGES);
    setContextError(errors.find((e) => !mapped.has(e)) ?? "");
  };

  const handleSendCode = async () => {
    setContextError("");
    const result = validateForgotPassword(email);
    if (!result.ok) {
      setFieldErrors(result.errors);
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetCode(email);
      Alert.alert(
        "Code sent",
        "If an account exists, a code has been sent to your email.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/(root)/(auth)/sign-in"),
          },
        ]
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setContextError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInPress = () => {
    router.replace("/(root)/(auth)/sign-in");
  };

  const handleBack = () => {
    router.replace("/(root)/(auth)/sign-in");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 20 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <BackHeader onBack={handleBack} />

          {/* App icon above title */}
          <AppIcon size={CIRCLE_ICON_SIZE} className="self-center my-6" />

          <Text
            className="text-2xl font-bold text-neutral-900 text-center mb-2"
            accessibilityRole="header"
          >
            Forgot Password?
          </Text>
          <Text
            className="text-base text-neutral-600 text-center mb-6"
            accessibilityRole="summary"
          >
            Enter your email and we&apos;ll send a 5-digit verification code
            instantly.
          </Text>

          <FormField
            label="Email address*"
            value={email}
            onChangeText={(text: string) => {
              setEmail(text);
              if (emailError) setEmailError("");
            }}
            placeholder="example@gmail.com"
            error={emailError}
            keyboardType="email-address"
          />

          {contextError ? (
            <Text
              className="text-red-500 text-sm mb-3"
              role="alert"
              accessibilityLiveRegion="polite"
            >
              {contextError}
            </Text>
          ) : null}

          <Button
            onPress={handleSendCode}
            title="Send Code"
            loading={loading}
            className="w-full py-4 rounded-full bg-[#e7f160] shadow-none mt-2 mb-4"
            textClassName="text-neutral-900 font-semibold text-lg"
            IconLeft={() => (
              <PencilSimpleLine size={22} color="#171717" weight="bold" />
            )}
          />

          <View className="flex-row flex-wrap justify-center items-center gap-1 pb-8">
            <Text className="text-neutral-600 text-base">
              Already have an account?
            </Text>
            <Pressable
              onPress={handleSignInPress}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityLabel="Sign In"
              accessibilityRole="link"
            >
              <Text className="text-neutral-900 font-semibold text-base underline">
                Sign In
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
