import React from "react";
import { View, Text, Image, Pressable, ImageSourcePropType } from "react-native";
import { colors } from "@/app/theme/colors";

export interface DestinationCardProps {
  image: ImageSourcePropType;
  country: string;
  title: string;
  description: string;
  onExplorePress: () => void;
}

export function DestinationCard({
  image,
  country,
  title,
  description,
  onExplorePress,
}: DestinationCardProps) {
  return (
    <View className="overflow-hidden rounded-[28px] mb-3.5 h-[200px]">
      <Image
        source={image}
        className="w-full h-full rounded-[28px]"
        resizeMode="cover"
        accessibilityLabel={title}
      />
      <View className="absolute left-3 top-3 flex-row items-center gap-1.5 rounded px-2 py-1 bg-black/40">
        <Text className="text-white text-xs font-semibold">{country}</Text>
      </View>
      <View
        className="absolute left-0 right-0 bottom-0 px-4 pb-3 pt-6 rounded-b-[28px] flex-row items-end justify-between"
        style={{ backgroundColor: colors.overlay }}
      >
        <View className="flex-1 mr-3">
          <Text className="text-white text-lg font-bold leading-tight mb-0.5">
            {title}
          </Text>
          <Text className="text-white/90 text-sm">{description}</Text>
        </View>
        <Pressable
          onPress={onExplorePress}
          className="rounded-full border border-white bg-neutral-900/80 px-4 py-2"
          accessibilityLabel={`Explore ${title}`}
          accessibilityRole="button"
        >
          <Text className="text-white font-semibold text-sm">Explore now</Text>
        </Pressable>
      </View>
    </View>
  );
}
