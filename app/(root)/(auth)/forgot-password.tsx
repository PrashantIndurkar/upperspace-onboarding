import BackHeader from "@/app/components/auth/BackHeader";
import { AppIcon } from "@/app/components/common/AppIcon";
import Button from "@/app/components/common/Button";
import FormField from "@/app/components/form/FormField";
import { useAuth } from "@/app/contexts/AuthContext";
import { colors } from "@/app/theme/colors";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/app/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { PencilSimpleLineIcon } from "phosphor-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CIRCLE_ICON_SIZE = 80;

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { sendPasswordResetCode } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
  });

  const onValid = async (data: ForgotPasswordFormData) => {
    setError(null);
    setLoading(true);
    try {
      await sendPasswordResetCode(data.email);
      Alert.alert(
        "Code sent",
        "If an account exists, a code has been sent to your email.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/(root)/(auth)/sign-in"),
          },
        ],
      );
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // return to sign-in
  const handleSignInPress = () => {
    router.replace("/(root)/(auth)/sign-in");
  };

  // back button logic
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
          {/* logo */}
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

          {/* email input */}
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <FormField
                label="Email address*"
                value={field.value}
                onChangeText={(text: string) => {
                  field.onChange(text);
                  if (error) setError(null);
                }}
                placeholder="example@gmail.com"
                error={fieldState.error?.message}
                keyboardType="email-address"
              />
            )}
          />

          {/* general error */}
          {error ? (
            <Text
              className="text-red-500 text-sm mb-3"
              role="alert"
              accessibilityLiveRegion="polite"
            >
              {error}
            </Text>
          ) : null}

          {/* submit button */}
          <Button
            onPress={handleSubmit(onValid)}
            title="Send Code"
            loading={loading}
            className="w-full py-4 rounded-full bg-primary shadow-none mt-2 mb-4"
            textClassName="text-neutral-900 font-semibold text-lg"
            IconLeft={() => (
              <PencilSimpleLineIcon
                size={22}
                color={colors.icon}
                weight="bold"
              />
            )}
          />

          {/* sign in link */}
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
