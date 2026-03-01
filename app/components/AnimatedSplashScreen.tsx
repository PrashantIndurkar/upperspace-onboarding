import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useMemo } from "react";
import { Text, useWindowDimensions } from "react-native";

const CIRCLE_BASE_SIZE = 200;
const CIRCLE_HALF = CIRCLE_BASE_SIZE / 2;
const TEXT_DISPLAY_MS = 2000;
const HOLD_MS = 300;
const FADE_OUT_MS = 450;
const CIRCLE_GROW_MS = 800;
const EASING_OUT_CUBIC = Easing.out(Easing.cubic);

type AnimatedSplashScreenProps = {
  onComplete: () => void;
};

export function AnimatedSplashScreen({
  onComplete,
}: AnimatedSplashScreenProps) {
  const { width, height } = useWindowDimensions();
  const circleScale = useSharedValue(0);
  const containerOpacity = useSharedValue(1);

  const scaleToEdge = useMemo(
    () =>
      Math.ceil(Math.sqrt(width * width + height * height) / CIRCLE_BASE_SIZE) +
      0.5,
    [width, height],
  );

  const circleStaticStyle = useMemo(
    () => ({
      position: "absolute" as const,
      left: width / 2 - CIRCLE_HALF,
      top: height / 2 - CIRCLE_HALF,
      width: CIRCLE_BASE_SIZE,
      height: CIRCLE_BASE_SIZE,
      borderRadius: CIRCLE_HALF,
      backgroundColor: "#ffffff",
    }),
    [width, height],
  );

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  useEffect(() => {
    const triggerFadeOut = () => {
      containerOpacity.value = withDelay(
        HOLD_MS,
        withTiming(
          0,
          { duration: FADE_OUT_MS, easing: EASING_OUT_CUBIC },
          (finished) => {
            if (finished) runOnJS(onComplete)();
          },
        ),
      );
    };

    circleScale.value = withDelay(
      TEXT_DISPLAY_MS,
      withTiming(
        scaleToEdge,
        {
          duration: CIRCLE_GROW_MS,
          easing: EASING_OUT_CUBIC,
        },
        (finished) => {
          if (finished) runOnJS(triggerFadeOut)();
        },
      ),
    );
  }, [scaleToEdge, onComplete, circleScale, containerOpacity]);

  return (
    <Animated.View
      style={animatedContainerStyle}
      className="absolute inset-0 z-50 flex-1 items-center justify-center bg-black"
      accessibilityLabel="Upper Space app loading"
      accessibilityRole="progressbar"
      accessibilityLiveRegion="polite"
    >
      <Animated.View
        style={[animatedCircleStyle, circleStaticStyle]}
        pointerEvents="none"
      />
      <Text
        className="text-4xl font-bold tracking-tight text-white z-10"
        accessibilityElementsHidden
      >
        UpperSpace
      </Text>
    </Animated.View>
  );
}
