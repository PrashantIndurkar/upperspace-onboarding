import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Platform,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  MagnifyingGlass,
  User,
  UsersThree,
  Gear,
  SignOut,
} from "phosphor-react-native";
import { useAuth } from "@/app/contexts/AuthContext";
import { collageImages } from "@/app/assetSources";
import { LogoutConfirmModal } from "@/app/components/common/LogoutConfirmModal";

const SEARCH_INPUT_HEIGHT = 48;
const HERO_BORDER_RADIUS = 28;
const CARD_HEIGHT = 200;
const MENU_ICON_SIZE = 20;
const MENU_ICON_COLOR = "#525252";

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
    <View style={styles.screen} className="flex-1">
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
              <User size={22} color="#171717" weight="regular" />
            </Pressable>
          </View>

          {/* User menu dropdown (Modal) */}
          <Modal
            visible={menuVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setMenuVisible(false)}
          >
            <Pressable
              className="flex-1"
              style={{ paddingTop: insets.top + 8, paddingRight: 20, alignItems: "flex-end" }}
              onPress={() => setMenuVisible(false)}
              accessibilityLabel="Close menu"
              accessibilityRole="button"
            >
              <Pressable
                className="bg-white border border-neutral-200 rounded-2xl py-2 min-w-[220]"
                onPress={(e) => e.stopPropagation()}
                accessibilityRole="menu"
                accessibilityViewIsModal
              >
                <View
                  className="flex-row items-center gap-3 px-4 py-3"
                  accessibilityRole="menuitem"
                  accessibilityLabel="Profile"
                >
                  <User size={MENU_ICON_SIZE} color={MENU_ICON_COLOR} weight="regular" />
                  <Text className="text-base text-neutral-900">Profile</Text>
                </View>
                <View
                  className="flex-row items-center gap-3 px-4 py-3"
                  accessibilityRole="menuitem"
                  accessibilityLabel="Community subscription"
                >
                  <UsersThree size={MENU_ICON_SIZE} color={MENU_ICON_COLOR} weight="regular" />
                  <Text className="text-base text-neutral-900">Community subscription</Text>
                </View>
                <View
                  className="flex-row items-center gap-3 px-4 py-3"
                  accessibilityRole="menuitem"
                  accessibilityLabel="Settings"
                >
                  <Gear size={MENU_ICON_SIZE} color={MENU_ICON_COLOR} weight="regular" />
                  <Text className="text-base text-neutral-900">Settings</Text>
                </View>
                <Pressable
                  onPress={handleSignOutPress}
                  className="flex-row items-center gap-3 px-4 py-3"
                  accessibilityRole="menuitem"
                  accessibilityLabel="Sign out"
                >
                  <SignOut size={MENU_ICON_SIZE} color={MENU_ICON_COLOR} weight="regular" />
                  <Text className="text-base text-neutral-900">Sign out</Text>
                </Pressable>
              </Pressable>
            </Pressable>
          </Modal>

          <LogoutConfirmModal
            visible={logoutModalVisible}
            onClose={() => setLogoutModalVisible(false)}
            onConfirm={handleLogoutConfirm}
          />

          {/* Search bar */}
          <View className="px-5 mb-4">
            <View
              className="flex-row items-center rounded-full border border-neutral-300 bg-white pr-2"
              style={styles.searchContainer}
            >
              <View className="pl-4 pr-2 justify-center" pointerEvents="none">
                <MagnifyingGlass size={20} color="#525252" weight="regular" />
              </View>
              <TextInput
                className="flex-1 text-base text-neutral-900"
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search destinations or activities"
                placeholderTextColor="#a3a3a3"
                accessibilityLabel="Search destinations or activities"
                returnKeyType="search"
              />
              <Pressable
                onPress={handleNearbyPress}
                className="rounded-full bg-[#e7f160] px-4 py-2.5"
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
          <View
            className="mx-5 overflow-hidden rounded-[28px]"
            style={styles.heroWrapper}
          >
            <Image
              source={collageImages.des1}
              className="w-full"
              style={styles.heroImage}
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
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
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
              <View
                key={index}
                className="overflow-hidden rounded-[28px] mb-3.5"
                style={styles.destinationCard}
              >
                <Image
                  source={card.image}
                  className="w-full"
                  style={[
                    styles.destinationCardImage,
                    { borderRadius: HERO_BORDER_RADIUS },
                  ]}
                  resizeMode="cover"
                  accessibilityLabel={card.title}
                />
                <View className="absolute left-3 top-3 flex-row items-center gap-1.5 rounded px-2 py-1 bg-black/40">
                  <Text className="text-white text-xs font-semibold">
                    {card.country}
                  </Text>
                </View>
                <View
                  className="absolute left-0 right-0 bottom-0 px-4 pb-3 pt-6 rounded-b-[28px] flex-row items-end justify-between"
                  style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                  <View className="flex-1 mr-3">
                    <Text className="text-white text-lg font-bold leading-tight mb-0.5">
                      {card.title}
                    </Text>
                    <Text className="text-white/90 text-sm">
                      {card.description}
                    </Text>
                  </View>
                  <Pressable
                    onPress={handleExploreNowPress}
                    className="rounded-full border border-white bg-neutral-900/80 px-4 py-2"
                    accessibilityLabel={`Explore ${card.title}`}
                    accessibilityRole="button"
                  >
                    <Text className="text-white font-semibold text-sm">
                      Explore now
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "transparent",
  },
  searchContainer: {
    minHeight: SEARCH_INPUT_HEIGHT,
  },
  searchInput: {
    height: SEARCH_INPUT_HEIGHT,
    paddingVertical: 0,
    paddingHorizontal: 8,
    ...(Platform.OS === "android" && { includeFontPadding: false }),
  },
  heroWrapper: {
    height: 280,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    borderRadius: HERO_BORDER_RADIUS,
  },
  destinationCard: {
    height: CARD_HEIGHT,
  },
  destinationCardImage: {
    width: "100%",
    height: "100%",
  },
});
