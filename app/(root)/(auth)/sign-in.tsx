import BackHeader from "@/app/components/auth/BackHeader";
import SocialButton from "@/app/components/auth/SocialButton";
import { AppIcon } from "@/app/components/common/AppIcon";
import Button from "@/app/components/common/Button";
import FormField from "@/app/components/form/FormField";
import PasswordField from "@/app/components/form/PasswordField";
import { useAuth } from "@/app/contexts/AuthContext";
import { colors } from "@/app/theme/colors";
import { validateLogin } from "@/app/utils/validation";
import { useRouter } from "expo-router";
import { SignIn as SignInIcon } from "phosphor-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

const CIRCLE_ICON_SIZE = 80;

export default function SignInScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [contextError, setContextError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    // Clear previous errors
    setEmailError("");
    setPasswordError("");
    setContextError("");

    // Validate form - map errors to their respective fields
    const result = validateLogin(email, password);
    if (!result.ok) {
      // Simple mapping: errors mentioning "email" go to emailError,
      // errors mentioning "password" go to passwordError
      result.errors.forEach((error) => {
        const lowerError = error.toLowerCase();
        if (lowerError.includes("email")) {
          setEmailError(error);
        } else if (lowerError.includes("password")) {
          setPasswordError(error);
        } else {
          // Any unexpected validation errors go to context
          setContextError(error);
        }
      });
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      router.replace("/(root)/home");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Incorrect credentials.";
      setContextError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpPress = () => {
    router.replace("/(root)/(auth)/sign-up");
  };

  const handleForgotPassword = () => {
    router.replace("/(root)/(auth)/forgot-password");
  };

  const handleBack = () => {
    router.replace("/(root)/(auth)/sign-up");
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
            Welcome Back!
          </Text>
          <Text
            className="text-base text-neutral-600 text-center mb-6"
            accessibilityRole="summary"
          >
            Sign in to access smart, personalized travel plans made for you.
          </Text>

          <FormField
            label="Email address"
            value={email}
            onChangeText={(text: string) => {
              setEmail(text);
              if (emailError) setEmailError("");
            }}
            placeholder="example@gmail.com"
            error={emailError}
            keyboardType="email-address"
          />
          <PasswordField
            label="Password"
            value={password}
            onChangeText={(text: string) => {
              setPassword(text);
              if (passwordError) setPasswordError("");
            }}
            placeholder="@Sn123hsn#"
            error={passwordError}
          />

          <View className="flex-row justify-between items-center mb-4">
            <Pressable
              onPress={() => setRememberMe((v) => !v)}
              className="flex-row items-center gap-2"
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityLabel={
                rememberMe ? "Remember me, checked" : "Remember me, unchecked"
              }
              accessibilityRole="checkbox"
              accessibilityState={{ checked: rememberMe }}
            >
              <View
                className={`w-5 h-5 rounded border-2 justify-center items-center ${
                  rememberMe
                    ? "bg-neutral-900 border-neutral-900"
                    : "border-neutral-400"
                }`}
              >
                {rememberMe ? (
                  <Text className="text-white text-xs" allowFontScaling={false}>
                    ✓
                  </Text>
                ) : null}
              </View>
              <Text className="text-neutral-800 font-medium text-base">
                Remember me
              </Text>
            </Pressable>
            <Pressable
              onPress={handleForgotPassword}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityLabel="Forgot Password"
              accessibilityRole="link"
            >
              <Text className="text-neutral-600 text-sm">Forgot Password?</Text>
            </Pressable>
          </View>

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
            onPress={handleSignIn}
            title="Sign in"
            loading={loading}
            className="w-full py-4 rounded-full bg-primary shadow-none mt-2 mb-4"
            textClassName="text-neutral-900 font-semibold text-lg"
            IconLeft={() => (
              <SignInIcon size={22} color={colors.icon} weight="bold" />
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
              Don&apos;t have an account?
            </Text>
            <Pressable
              onPress={handleSignUpPress}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityLabel="Sign up"
              accessibilityRole="link"
            >
              <Text className="text-neutral-900 font-semibold text-base underline">
                Sign up
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
