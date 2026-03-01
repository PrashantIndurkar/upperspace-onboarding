import React from "react";
import { View, useWindowDimensions, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import SkipButton from "../../components/welcome/SkipButton";
import { Title, Subtitle } from "../../../components/common/Typography";
import Button from "../../../components/common/Button";

const OVERLAY_HEIGHT_RATIO = 0.35;

const Welcome2Screen = () => {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const overlayHeight = height * OVERLAY_HEIGHT_RATIO;

  const handleContinue = () => {
    router.push("/(root)/(auth)/welcome-destination");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SkipButton variant="dark" />
      {/* Full-bleed background image — no padding */}
      <Image
        source={require("../../../assets/onboarding.avif")}
        style={StyleSheet.absoluteFillObject}
        contentFit="cover"
      />
      {/* Bottom overlay with blur */}
      <View
        style={[
          styles.overlay,
          {
            height: overlayHeight,
            paddingBottom: insets.bottom + 24,
          },
        ]}
      >
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={styles.content}>
          <Title className="text-white text-3xl font-bold mb-3 text-center">
            Plan your trips with ease and confidence
          </Title>
          <Subtitle className="text-white text-base font-normal mb-6 text-center opacity-95">
            Build your itinerary in minutes, not hours.
          </Subtitle>
          <Button
            title="Continue"
            onPress={handleContinue}
            className="w-full py-4 rounded-full bg-[#e7f160] shadow-none"
            textClassName="text-neutral-900 font-semibold text-lg"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingTop: 24,
  },
});

export default Welcome2Screen;
