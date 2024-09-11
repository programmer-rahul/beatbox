import { useEffect } from "react";
import { Alert, Linking, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import useZustandStore from "@/store/zustand-store";

const usePermission = () => {
  const { addMusicFiles, isPermissionGranted, setIsPermissionGranted } =
    useZustandStore((state) => state);

  // check permissions
  const checkIsHavePermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status === "granted") {
      setIsPermissionGranted(true);
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

  // scan all media files from device
  const getMediaFiles = async () => {
    const medias = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });

    if (medias.assets.length > 0) {
      addMusicFiles(medias.assets);
    }
  };

  // initial render
  useEffect(() => {
    checkIsHavePermissions();
  }, []);

  // to check permissions
  useEffect(() => {
    if (isPermissionGranted) {
      getMediaFiles();
    }
  }, [isPermissionGranted]);
};

export default usePermission;
