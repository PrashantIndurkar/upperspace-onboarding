import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "@/app/components/common/Button";
import { Subtitle, Title } from "@/app/components/common/Typography";
import SkipButton from "@/app/components/onboarding/SkipButton";

const OnboardingPlanScreen = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/(root)/(auth)/onboarding-destinations");
  };

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <SkipButton variant="dark" />
      {/* Full-bleed background image — no padding */}
      <Image
        source={require("../../../assets/onboarding.avif")}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
      />
      {/* Bottom overlay — dark tint, NativeWind only */}
      <View className="absolute bottom-0 left-0 right-0 h-[35vh] justify-end overflow-hidden">
        <View className="absolute inset-0 bg-black/50" />
        <SafeAreaView
          edges={["bottom"]}
          className="flex-1 justify-end px-6 pt-6 pb-6"
        >
          <Title className="text-white text-3xl font-bold mb-3 text-center">
            Plan your trips with ease and confidence
          </Title>
          <Subtitle className="text-white text-base font-normal mb-6 text-center opacity-95">
            Build your itinerary in minutes, not hours.
          </Subtitle>
          <Button
            title="Continue"
            onPress={handleContinue}
            className="w-full py-4 rounded-full bg-primary shadow-none"
            textClassName="text-neutral-900 font-semibold text-lg"
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

export default OnboardingPlanScreen;
