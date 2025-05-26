import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export const PermissionsApp = () => {
  return (
    <SafeAreaView style={styles.screenWrapper}>
      <Text style={styles.title}>WELCOME!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenWrapper: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#000" },
});
