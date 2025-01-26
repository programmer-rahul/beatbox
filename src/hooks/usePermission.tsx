import { useEffect } from "react";
import { Alert, Linking, Platform, PermissionsAndroid } from "react-native";
import useZustandStore from "../store/useZustandStore";

const usePermission = () => {
  const setIsHavePermission = useZustandStore(
    (state) => state.setIsHavePermission,
  );

  console.log("INSIDE usePERMISSION");

  // Check for permissions
  useEffect(() => {
    !useZustandStore.getState().isHavePermission && askForPermissions();
  }, []);

  // Show permissions dialog
  const askForPermissions = async () => {
    try {
      let granted;
      let androidVersion = Number(Platform.Version);

      if (androidVersion >= 33) {
        // Android 13+ (API level 33) - Use READ_MEDIA_AUDIO for accessing audio files
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        );
      } else if (androidVersion >= 30) {
        // Android 11 and 12 (API levels 30-32) - Use READ_EXTERNAL_STORAGE
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      } else {
        // For Android < 11 (API level < 30) - Use READ_EXTERNAL_STORAGE
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }

      console.log("Granted state:", granted);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("PERMISSIONS _GRANTED HERE", granted);
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
    } catch (err) {
      console.warn(err);
      Alert.alert("Error in getting Permissions :- ", JSON.stringify(err));
    }
  };
};

export default usePermission;
