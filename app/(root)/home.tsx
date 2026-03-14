import { collageImages } from "@/app/assetSources";
import { LogoutConfirmModal } from "@/app/components/common/LogoutConfirmModal";
import { DestinationCard } from "@/app/components/home/DestinationCard";
import { UserMenuModal } from "@/app/components/home/UserMenuModal";
import { useAuth } from "@/app/contexts/AuthContext";
import { colors } from "@/app/theme/colors";
import { useRouter } from "expo-router";
import { MagnifyingGlassIcon, UserIcon } from "phosphor-react-native";
import React, { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SEARCH_INPUT_HEIGHT = 48;

const DESTINATION_CARDS = [
  {
    image: collageImages.des2,
    country: "🇯🇵 JAPAN",
    title: "Discover ancient temples",
    description: "Where tradition meets the future",
  },
  {
    image: collageImages.des3,
    country: "🇮🇹 ITALY",
    title: "La dolce vita awaits",
    description: "Coastlines, cuisine, and culture",
  },
  {
    image: collageImages.des4,
    country: "🇬🇷 GREECE",
    title: "Islands of blue and white",
    description: "Sunsets and stories by the sea",
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const fullName = user?.name?.trim() || "";
  const displayName = fullName ? fullName.split(/\s+/)[0] : "Guest";

  const handleNearbyPress = () => {
    // Placeholder for future nearby destinations
  };

  const handleExploreNowPress = () => {
    // Placeholder for future navigation
  };

  const handleUserIconPress = () => {
    setMenuVisible((v) => !v);
  };

  const handleSignOutPress = () => {
    setMenuVisible(false);
    setLogoutModalVisible(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    router.replace("/(root)/(auth)/sign-in");
  };

  return (
    <View className="flex-1 bg-transparent">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 bg-white">
          {/* Header: greeting left, avatar + user icon right */}
          <View
            className="flex-row items-center justify-between px-5 pt-2 pb-4"
            accessibilityRole="header"
          >
            <View className="flex-1 mr-3">
              <Text
                className="text-2xl font-bold text-neutral-900"
                accessibilityRole="header"
                accessibilityLabel={`Hey ${displayName}`}
              >
                Hey {displayName} 👋
              </Text>
              {user?.email ? (
                <Text
                  className="text-sm text-neutral-500 mt-0.5"
                  accessibilityLabel={`Signed in as ${user.email}`}
                  accessibilityRole="text"
                >
                  {user.email}
                </Text>
              ) : null}
              <Text className="text-base text-neutral-600 mt-0.5">
                Find your next destination.
              </Text>
            </View>
            <Pressable
              onPress={handleUserIconPress}
              className="min-h-10 min-w-10 rounded-full bg-neutral-100 border border-neutral-200 justify-center items-center"
              accessibilityLabel="Open user menu"
              accessibilityRole="button"
            >
              <UserIcon size={22} color={colors.icon} weight="regular" />
            </Pressable>
          </View>

          <UserMenuModal
            visible={menuVisible}
            onClose={() => setMenuVisible(false)}
            onSignOut={handleSignOutPress}
          />

          <LogoutConfirmModal
            visible={logoutModalVisible}
            onClose={() => setLogoutModalVisible(false)}
            onConfirm={handleLogoutConfirm}
          />

          {/* Search bar */}
          <View className="px-5 mb-4">
            <View className="flex-row items-center rounded-full border border-neutral-300 bg-white pr-2 min-h-12">
              <View className="pl-4 pr-2 justify-center" pointerEvents="none">
                <MagnifyingGlassIcon
                  size={20}
                  color={colors.iconMuted}
                  weight="regular"
                />
              </View>
              <TextInput
                className="flex-1 text-base text-neutral-900 py-0 px-2"
                style={[
                  { height: SEARCH_INPUT_HEIGHT },
                  Platform.OS === "android" && { includeFontPadding: false },
                ]}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search destinations or activities"
                placeholderTextColor={colors.placeholder}
                accessibilityLabel="Search destinations or activities"
                returnKeyType="search"
              />
              <Pressable
                onPress={handleNearbyPress}
                className="rounded-full bg-primary px-4 py-2.5"
                accessibilityLabel="Nearby"
                accessibilityRole="button"
              >
                <Text className="text-neutral-900 font-semibold text-sm">
                  Nearby
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Hero image with overlays */}
          <View className="mx-5 overflow-hidden rounded-[28px] h-[280px]">
            <Image
              source={collageImages.des1}
              className="w-full h-full rounded-[28px]"
              resizeMode="cover"
              accessibilityLabel="Featured destination"
            />
            {/* Top-left: country */}
            <View className="absolute left-4 top-4 flex-row items-center gap-1.5 rounded px-2 py-1 bg-black/40">
              <Text className="text-white text-xs font-semibold">
                🇦🇹 AUSTRIA
              </Text>
            </View>
            {/* Bottom: dark overlay — text left, button right */}
            <View
              className="absolute left-0 right-0 bottom-0 px-4 pb-4 pt-8 rounded-b-[28px] flex-row items-end justify-between"
              style={{ backgroundColor: colors.overlay }}
            >
              <View className="flex-1 mr-3">
                <Text
                  className="text-white text-2xl font-bold leading-tight mb-1"
                  accessibilityRole="header"
                >
                  Moments that say with you forever
                </Text>
                <Text className="text-white/90 text-sm">
                  Breathe in the magic of Morocco&apos;s golden dunes
                </Text>
              </View>
              <Pressable
                onPress={handleExploreNowPress}
                className="rounded-full border border-white bg-neutral-900/80 px-4 py-2.5"
                accessibilityLabel="Explore now"
                accessibilityRole="button"
              >
                <Text className="text-white font-semibold text-sm">
                  Explore now
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Destination cards below hero */}
          <View className="mx-5 mt-5 pb-1">
            {DESTINATION_CARDS.map((card, index) => (
              <DestinationCard
                key={index}
                image={card.image}
                country={card.country}
                title={card.title}
                description={card.description}
                onExplorePress={handleExploreNowPress}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
