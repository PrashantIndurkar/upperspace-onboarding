import React from "react";
import { Modal, View, Text, Pressable } from "react-native";
import {
  User,
  UsersThree,
  Gear,
  SignOut,
} from "phosphor-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/app/theme/colors";

const MENU_ICON_SIZE = 20;

export interface UserMenuModalProps {
  visible: boolean;
  onClose: () => void;
  onSignOut: () => void;
}

export function UserMenuModal({
  visible,
  onClose,
  onSignOut,
}: UserMenuModalProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 items-end"
        style={{
          paddingTop: insets.top + 8,
          paddingRight: 20,
        }}
        onPress={onClose}
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
            <User
              size={MENU_ICON_SIZE}
              color={colors.iconMuted}
              weight="regular"
            />
            <Text className="text-base text-neutral-900">Profile</Text>
          </View>
          <View
            className="flex-row items-center gap-3 px-4 py-3"
            accessibilityRole="menuitem"
            accessibilityLabel="Community subscription"
          >
            <UsersThree
              size={MENU_ICON_SIZE}
              color={colors.iconMuted}
              weight="regular"
            />
            <Text className="text-base text-neutral-900">
              Community subscription
            </Text>
          </View>
          <View
            className="flex-row items-center gap-3 px-4 py-3"
            accessibilityRole="menuitem"
            accessibilityLabel="Settings"
          >
            <Gear
              size={MENU_ICON_SIZE}
              color={colors.iconMuted}
              weight="regular"
            />
            <Text className="text-base text-neutral-900">Settings</Text>
          </View>
          <Pressable
            onPress={onSignOut}
            className="flex-row items-center gap-3 px-4 py-3"
            accessibilityRole="menuitem"
            accessibilityLabel="Sign out"
          >
            <SignOut
              size={MENU_ICON_SIZE}
              color={colors.iconMuted}
              weight="regular"
            />
            <Text className="text-base text-neutral-900">Sign out</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
