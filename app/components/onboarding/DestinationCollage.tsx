import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { collageImages } from "@/app/assetSources";

// -----------------------------------------------------------------------------
// Static layout: edit these to change sizes. All values in pixels.
// -----------------------------------------------------------------------------

const BORDER_RADIUS = 20;

/** Fixed size of the collage area. Inner content is centered if screen is wider. */
const CONTAINER_WIDTH = 400;
const CONTAINER_HEIGHT = 450;

const PADDING = 1;
const GAP = 10;

/** Column width and row heights (3 columns, 2 rows). */
const COL_WIDTH = (CONTAINER_WIDTH - PADDING * 1 - GAP * 2) / 3;
const ROW_1_HEIGHT = (CONTAINER_HEIGHT - GAP) / 2;
const ROW_2_HEIGHT = (CONTAINER_HEIGHT - GAP) / 2;

// des1–des4 repeated for 6 slots (DES1DES234 pattern)
const IMAGE_SOURCES = [
  collageImages.des1,
  collageImages.des2,
  collageImages.des3,
  collageImages.des4,
  collageImages.des1,
  collageImages.des2,
];

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const DestinationCollage = () => {
  const cardStyle = (height: number) => ({
    width: COL_WIDTH,
    height,
    borderRadius: BORDER_RADIUS,
    overflow: "hidden" as const,
    backgroundColor: "#eee",
  });

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View
        style={{
          width: CONTAINER_WIDTH,
          height: CONTAINER_HEIGHT,
          marginHorizontal: PADDING,
          alignSelf: "center",
          flexDirection: "row",
          gap: GAP,
        }}
      >
        <View style={{ width: COL_WIDTH, gap: GAP, marginTop: -80 }}>
          <View style={cardStyle(ROW_1_HEIGHT)}>
            <Image
              source={IMAGE_SOURCES[0]}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              transition={200}
            />
          </View>
          <View style={cardStyle(ROW_2_HEIGHT)}>
            <Image
              source={IMAGE_SOURCES[1]}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              transition={200}
            />
          </View>
        </View>
        <View style={{ width: COL_WIDTH, gap: GAP, marginTop: 5 }}>
          <View style={cardStyle(ROW_1_HEIGHT)}>
            <Image
              source={IMAGE_SOURCES[2]}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              transition={200}
            />
          </View>
          <View style={cardStyle(ROW_2_HEIGHT)}>
            <Image
              source={IMAGE_SOURCES[3]}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              transition={200}
            />
          </View>
        </View>
        <View style={{ width: COL_WIDTH, gap: GAP, marginTop: -90 }}>
          <View style={cardStyle(ROW_1_HEIGHT)}>
            <Image
              source={IMAGE_SOURCES[4]}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              transition={200}
            />
          </View>
          <View style={cardStyle(ROW_2_HEIGHT)}>
            <Image
              source={IMAGE_SOURCES[5]}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              transition={200}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DestinationCollage;
