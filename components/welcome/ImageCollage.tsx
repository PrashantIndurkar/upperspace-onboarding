import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";

// -----------------------------------------------------------------------------
// Static layout: edit these to change sizes and positions. All values in pixels.
// -----------------------------------------------------------------------------

const BORDER_RADIUS = 20;

/** Fixed size of the collage area. Inner content is centered if screen is wider. */
const CONTAINER_WIDTH = 390;
const CONTAINER_HEIGHT = 380;

/** Image 1: top-left (e.g. pool / red umbrellas). Landscape, moderate size. */
const IMG_1 = {
  width: 150,
  height: 350,
  left: -10,
  top: -15,
  zIndex: 1,
  rotate: "0deg",
  source: require("../../assets/des-2.jpg"),
};

/** Image 2: top-right (e.g. wooden structure by water). Smaller, roughly square. */
const IMG_2 = {
  width: 190,
  height: 200,
  left: 150,
  top: -25,
  zIndex: 1,
  rotate: "0deg",
  source: require("../../assets/des-4.jpg"),
};

/** Image 3: center foreground (e.g. hiker / island). Large portrait, rotated. */
const IMG_3 = {
  width: 200,
  height: 300,
  left: 100,
  top: 200,
  zIndex: 2,
  rotate: "-12deg",
  source: require("../../assets/des-1.jpg"),
};

/** Image 4: far right, partially visible (e.g. pool / palm). Behind center image. */
const IMG_4 = {
  left: 350,
  top: -20,
  width: 150,
  height: 530,
  zIndex: 1,
  rotate: "0deg",
  source: require("../../assets/des-3.jpg"),
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Card = ({
  width,
  height,
  left,
  top,
  zIndex,
  rotate,
  source,
}: {
  width: number;
  height: number;
  left: number;
  top: number;
  zIndex: number;
  rotate: string;
  source: number;
}) => (
  <View
    style={{
      position: "absolute",
      width,
      height,
      left,
      top,
      zIndex,
      borderRadius: BORDER_RADIUS,
      overflow: "hidden",
      backgroundColor: "#eee",
      transform: rotate !== "0deg" ? [{ rotate }] : undefined,
    }}
  >
    <Image
      source={source}
      style={{ width: "100%", height: "100%" }}
      contentFit="cover"
      transition={200}
    />
  </View>
);

const ImageCollage = () => {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View
        style={{
          width: CONTAINER_WIDTH,
          height: CONTAINER_HEIGHT,
          alignSelf: "center",
          position: "relative",
          overflow: "visible",
        }}
      >
        <Card
          width={IMG_1.width}
          height={IMG_1.height}
          left={IMG_1.left}
          top={IMG_1.top}
          zIndex={IMG_1.zIndex}
          rotate={IMG_1.rotate}
          source={IMG_1.source}
        />
        <Card
          width={IMG_2.width}
          height={IMG_2.height}
          left={IMG_2.left}
          top={IMG_2.top}
          zIndex={IMG_2.zIndex}
          rotate={IMG_2.rotate}
          source={IMG_2.source}
        />
        <Card
          width={IMG_3.width}
          height={IMG_3.height}
          left={IMG_3.left}
          top={IMG_3.top}
          zIndex={IMG_3.zIndex}
          rotate={IMG_3.rotate}
          source={IMG_3.source}
        />
        <Card
          width={IMG_4.width}
          height={IMG_4.height}
          left={IMG_4.left}
          top={IMG_4.top}
          zIndex={IMG_4.zIndex}
          rotate={IMG_4.rotate}
          source={IMG_4.source}
        />
      </View>
    </View>
  );
};

export default ImageCollage;
