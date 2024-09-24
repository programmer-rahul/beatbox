import { useEffect } from "react";
import { Alert, Linking, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import useZustandStore from "@/store/zustand-store";
import permissionStore from "@/store/permission-store";

const usePermission = () => {
  // const { addMusicFiles, isPermissionGranted, setIsPermissionGranted } =
  //   useZustandStore((state) => state);

  // scan all media files from device
  // const getMediaFiles = async () => {
  //   const medias = await MediaLibrary.getAssetsAsync({
  //     mediaType: "audio",
  //     first: 150,
  //   });

  //   console.log("medias", medias);

  //   if (medias.assets.length > 0) {
  //     addMusicFiles(medias.assets);
  //   }
  // };

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
