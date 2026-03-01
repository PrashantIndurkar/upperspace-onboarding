import React from "react";
import { View, Image, useWindowDimensions, Dimensions } from "react-native";
import { collageImages } from "../../assetSources";

const BORDER_RADIUS = 20;
const COLLAGE_TOP_PERCENT = 0.6; // Top ~60% of screen for collage (per design)

const ImageCollage = () => {
  const window = useWindowDimensions();
  const fallback = Dimensions.get("window");
  const screenWidth = window.width > 0 ? window.width : fallback.width;
  const screenHeight = window.height > 0 ? window.height : fallback.height;
  const containerHeight = Math.max(280, screenHeight * COLLAGE_TOP_PERCENT);
  const padding = 16;
  const contentWidth = Math.max(screenWidth - padding * 2, 200);

  // Dummy border/background for testing – remove when images load correctly
  const DEBUG_BORDER = { borderWidth: 2, borderColor: "#ff6b00" };
  const DEBUG_SLOT_BORDER = { borderWidth: 1, borderColor: "rgba(0,0,0,0.3)" };
  const DEBUG_BG = { backgroundColor: "#e8f4fc" };

  // Back layer: top-left (pool), top-right (pier), far-right (pool sliver)
  // Front layer: central image (person/karst) rotated counter-clockwise
  return (
    <View
      style={{
        width: contentWidth,
        height: containerHeight,
        marginHorizontal: padding,
        marginBottom: 24,
        position: "relative",
        alignSelf: "center",
        ...DEBUG_BG,
        ...DEBUG_BORDER,
        borderRadius: BORDER_RADIUS,
      }}
    >
      {/* Back: top-left (pool/parasols) */}
      <View
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: contentWidth * 0.4,
          height: containerHeight * 0.45,
          borderRadius: BORDER_RADIUS,
          overflow: "hidden",
          zIndex: 1,
          backgroundColor: "#eee",
          ...DEBUG_SLOT_BORDER,
        }}
      >
        <Image
          source={collageImages.des1}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>
      {/* Back: top-right (pier) – slight clockwise rotation */}
      <View
        style={{
          position: "absolute",
          right: contentWidth * 0.08,
          top: 0,
          width: contentWidth * 0.38,
          height: containerHeight * 0.4,
          borderRadius: BORDER_RADIUS,
          overflow: "hidden",
          zIndex: 1,
          backgroundColor: "#eee",
          ...DEBUG_SLOT_BORDER,
          transform: [{ rotate: "4deg" }],
        }}
      >
        <Image
          source={collageImages.des2}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>
      {/* Back: far-right sliver (pool) */}
      <View
        style={{
          position: "absolute",
          right: 0,
          top: containerHeight * 0.35,
          width: contentWidth * 0.22,
          height: containerHeight * 0.5,
          borderRadius: BORDER_RADIUS,
          overflow: "hidden",
          zIndex: 1,
          backgroundColor: "#eee",
          ...DEBUG_SLOT_BORDER,
        }}
      >
        <Image
          source={collageImages.des4}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>
      {/* Front: central image (person/karst), rotated counter-clockwise */}
      <View
        style={{
          position: "absolute",
          left: contentWidth * 0.12,
          top: containerHeight * 0.08,
          width: contentWidth * 0.7,
          height: containerHeight * 0.88,
          borderRadius: BORDER_RADIUS,
          overflow: "hidden",
          zIndex: 2,
          backgroundColor: "#ddd",
          ...DEBUG_SLOT_BORDER,
          transform: [{ rotate: "-6deg" }],
        }}
      >
        <Image
          source={collageImages.des3}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default ImageCollage;
