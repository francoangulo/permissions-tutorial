import React, { useState } from "react";
import {
  Alert,
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from "react-native-permissions";
import { Camera, useCameraDevice } from "react-native-vision-camera";

export const PermissionsApp = () => {
  const device = useCameraDevice("back");
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);

  const permissionType = Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  });

  const checkPermission = async () => {
    if (!permissionType) {
      return;
    }

    const status = await check(permissionType);
    setPermissionStatus(status);
    handlePermissionStatus(status);
  };

  const requestPermission = async () => {
    if (!permissionType) {
      return;
    }

    const status = await request(permissionType);
    setPermissionStatus(status);
    handlePermissionStatus(status);
  };

  const handlePermissionStatus = (status: string) => {
    switch (status) {
      case RESULTS.UNAVAILABLE:
        Alert.alert("Camera not available on this device.");
        break;
      case RESULTS.DENIED:
        Alert.alert(
          "Permission Denied",
          "Camera access is required. Would you like to allow it?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Allow", onPress: requestPermission },
          ]
        );
        break;
      case RESULTS.BLOCKED:
        Alert.alert(
          "Permission Blocked",
          "Camera access is blocked. Please enable it manually in Settings.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Settings",
              onPress: () => openSettings("application"),
            },
          ]
        );
        break;
      case RESULTS.GRANTED:
        Alert.alert("Permission Granted", "You can now use the camera.");
        break;
      default:
        Alert.alert("Unknown permission status");
    }
  };

  return (
    <SafeAreaView style={styles.screenWrapper}>
      <Text style={styles.title}>Permission Status: {permissionStatus}</Text>

      {permissionStatus === RESULTS.GRANTED ? (
        <Camera style={styles.camera} device={device} isActive={true} />
      ) : (
        <Button title="Open Camera" onPress={checkPermission} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenWrapper: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#000" },
  camera: { width: "100%", aspectRatio: 1 },
});
