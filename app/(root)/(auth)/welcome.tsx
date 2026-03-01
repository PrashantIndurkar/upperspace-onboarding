import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import ImageCollage from "../../../components/welcome/ImageCollage";
import SkipButton from "../../components/welcome/SkipButton";
import { Title, Subtitle } from "../../../components/common/Typography";
import Button from "../../../components/common/Button";

const WelcomeScreen = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/(root)/(auth)/welcome-2");
  };

  return (
    <SafeAreaView className="flex-1 bg-white h-full" edges={["bottom"]}>
      <SkipButton />
      {/* Top: image collage flush to top (no safe area inset) */}
      <View className="flex-1 w-full">
        <ImageCollage />
      </View>
      {/* Bottom: content and button anchored at end; reduced top padding to fix wide space */}
      <View className="w-full px-5 pb-6 pt-1 bg-white">
        <View className="w-full max-w-md items-start mx-auto">
          <Title className="text-3xl font-bold mb-4 text-left">
            Discover Your Next Destination
          </Title>
          <Subtitle className="text-gray-500 text-lg mb-8 px-0 leading-7 text-left">
            Explore hidden gems and iconic spots around the world with ease.
          </Subtitle>
          <Button
            title="Continue"
            onPress={handleContinue}
            className="w-full py-4 rounded-full bg-[#e7f160] shadow-none"
            textClassName="text-neutral-900 font-semibold text-lg"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
