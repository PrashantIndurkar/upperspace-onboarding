import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { colors } from "@/app/theme/colors";

export interface LogoutConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutConfirmModal({
  visible,
  onClose,
  onConfirm,
}: LogoutConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      accessibilityLabel="Sign out confirmation"
    >
      <Pressable
        className="flex-1 justify-center items-center p-6"
        style={{ backgroundColor: colors.overlayLight }}
        onPress={onClose}
        accessibilityLabel="Close modal"
        accessibilityRole="button"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="w-full max-w-[340px] justify-center items-center"
        >
          <Pressable
            className="w-full bg-white rounded-2xl p-6 border border-neutral-200"
            onPress={(e) => e.stopPropagation()}
            accessibilityViewIsModal
          >
            <Text
              className="text-lg font-semibold text-neutral-900 mb-2"
              accessibilityRole="header"
            >
              Are you sure you want to sign out?
            </Text>
            <View className="flex-row gap-3 mt-4">
              <Pressable
                onPress={onClose}
                className="flex-1 py-3 rounded-full border border-neutral-300 bg-white items-center justify-center"
                accessibilityLabel="Cancel"
                accessibilityRole="button"
              >
                <Text className="text-neutral-700 font-semibold">Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleConfirm}
                className="flex-1 py-3 rounded-full bg-primary items-center justify-center"
                accessibilityLabel="Log out"
                accessibilityRole="button"
              >
                <Text className="text-neutral-900 font-semibold">Log out</Text>
              </Pressable>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}
