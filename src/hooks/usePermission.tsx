import { useEffect } from "react";
import { Alert, Linking } from "react-native";
import * as MediaLibrary from "expo-media-library";
import usePermissionStore from "@/store/permission-store";
import { useRouter } from "expo-router";

const usePermission = () => {
  const { isHavePermission, setIsHavePermission } = usePermissionStore();
  const { navigate } = useRouter();

  const handleDeepLink = (event: { url: string }) => {
    if (event.url === "trackplayer://notification.click") {
      navigate("/player");
    }
  };

  // check for permissions
  useEffect(() => {
    Linking.addEventListener("url", handleDeepLink);
    !isHavePermission && askForPermissions();

    return () => {
      Linking.removeAllListeners("url");
    };
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
