import BackHeader from "@/app/components/auth/BackHeader";
import SocialButton from "@/app/components/auth/SocialButton";
import { AppIcon } from "@/app/components/common/AppIcon";
import Button from "@/app/components/common/Button";
import FormField from "@/app/components/form/FormField";
import PasswordField from "@/app/components/form/PasswordField";
import { useAuth } from "@/app/contexts/AuthContext";
import { colors } from "@/app/theme/colors";
import { signUpSchema, type SignUpFormData } from "@/app/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { PencilSimpleLineIcon } from "phosphor-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CIRCLE_ICON_SIZE = 80;

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
  });

  const onValid = async (data: SignUpFormData) => {
    setError(null);
    setLoading(true);
    try {
      await signUp(data.name, data.email, data.password);
      router.replace("/(root)/(auth)/sign-in");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "This email is already registered.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInPress = () => {
    router.replace("/(root)/(auth)/sign-in");
  };

  /** Back from sign-up always goes to sign-in; we use explicit navigation because
   *  sign-in uses router.replace() to open sign-up, so there is no stack entry to go back to. */
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
            Create Your Account?
          </Text>
          <Text
            className="text-base text-neutral-600 text-left mb-6"
            accessibilityRole="summary"
          >
            Create your account to explore exciting travel destinations and
            adventures.
          </Text>

          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <FormField
                label="Full Name"
                value={field.value}
                onChangeText={(text: string) => {
                  field.onChange(text);
                  if (error) setError(null);
                }}
                placeholder="Alex Smith"
                error={fieldState.error?.message}
                autoCapitalize="words"
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <FormField
                label="Email"
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
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <PasswordField
                label="Password"
                value={field.value}
                onChangeText={(text: string) => {
                  field.onChange(text);
                  if (error) setError(null);
                }}
                placeholder="@Sn123hsn#"
                error={fieldState.error?.message}
              />
            )}
          />

          {error ? (
            <Text
              className="text-red-500 text-sm mb-3"
              role="alert"
              accessibilityLiveRegion="polite"
            >
              {error}
            </Text>
          ) : null}

          <Button
            onPress={handleSubmit(onValid)}
            title="Register"
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

          <Text
            className="text-center text-neutral-500 text-sm mb-3"
            accessibilityRole="text"
          >
            Or continue with
          </Text>
          <View className="flex-row gap-3 mb-6">
            <SocialButton provider="google" />
            <SocialButton provider="apple" />
          </View>

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
