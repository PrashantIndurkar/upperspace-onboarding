import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import DestinationCollage from "@/app/components/onboarding/DestinationCollage";
import SkipButton from "@/app/components/onboarding/SkipButton";
import { Title, Subtitle } from "@/app/components/common/Typography";
import Button from "@/app/components/common/Button";

const OnboardingDestinationsScreen = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/(root)/(auth)/sign-up");
  };

  return (
    <SafeAreaView className="flex-1 bg-white h-full">
      <SkipButton />
      {/* Top: 6-image collage */}
      <View className="flex-1 w-full">
        <DestinationCollage />
      </View>
      {/* Copy and CTA */}
      <View className="w-full px-5 pb-6 pt-4 bg-white">
        <View className="w-full max-w-md items-center mx-auto">
          <Title className="text-5xl font-bold mb-4 text-center leading-tight">
            Find perfect{"\n"}destination for{"\n"}every mood
          </Title>
          <Subtitle className="text-gray-500 text-lg mb-8 px-2 leading-7 text-center">
            Explore you&apos;ve never seen {"\n"} before& Discover just for you.
          </Subtitle>
          <Button
            title="Get Started"
            onPress={handleGetStarted}
            className="w-full py-4 rounded-full bg-primary shadow-none"
            textClassName="text-neutral-900 font-semibold text-lg"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingDestinationsScreen;
