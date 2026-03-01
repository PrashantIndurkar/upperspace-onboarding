import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

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
      accessibilityRole="alertdialog"
    >
      <Pressable
        style={styles.backdrop}
        onPress={onClose}
        accessibilityLabel="Close modal"
        accessibilityRole="button"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.center}
        >
          <Pressable
            style={styles.card}
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
                className="flex-1 py-3 rounded-full bg-[#e7f160] items-center justify-center"
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

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  center: {
    width: "100%",
    maxWidth: 340,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
});
