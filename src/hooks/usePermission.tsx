import { useEffect } from "react";
import { Alert, Linking } from "react-native";
import * as MediaLibrary from "expo-media-library";
import permissionStore from "@/store/permission-store";

const usePermission = () => {
  const { isHavePermission, setIsHavePermission } = permissionStore();

  // check for permissions
  useEffect(() => {
    !isHavePermission && askForPermissions();
  }, []);

  // show permissions dialog
  const askForPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status === "granted") {
      setIsHavePermission(true);
    } else {
      Alert.alert(
        "Permissions Required",
        "We need access to your media library to display your Music files.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ]
      );
    }
  };

  return { isHavePermission };
};

export default usePermission;
