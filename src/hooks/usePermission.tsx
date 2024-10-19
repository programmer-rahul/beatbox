import { useEffect } from "react";
import { Alert, Linking, PermissionsAndroid } from "react-native";
import useZustandStore from "../store/useZustandStore";

const usePermission = () => {
  const isHavePermission = useZustandStore((state) => state.isHavePermission);
  const setIsHavePermission = useZustandStore(
    (state) => state.setIsHavePermission,
  );

  console.log("INSIDE usePERMISSION");

  // check for permissions
  useEffect(() => {
    !isHavePermission && askForPermissions();
  }, []);

  // show permissions dialog
  const askForPermissions = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
    );
    console.log("granted state", granted);

    if (granted === "granted") {
      setIsHavePermission(true);
    } else {
      Alert.alert(
        "Permissions Required",
        "We need access to your media library to display your Music files.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ],
      );
    }
  };
};

export default usePermission;
