import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";

const checkMediaPermissions = async (): Promise<boolean> => {
  try {
    let granted;
    let androidVersion = Number(Platform.Version);

    if (androidVersion >= 33) {
      granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
      );
    } else if (androidVersion >= 30) {
      granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    } else {
      granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
    return granted;
  } catch (err) {
    return false;
  }
};

const requestMediaPermissions = async () => {
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

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert(
        "Permissions Required",
        "We need access to your media library to display your Music files.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ],
      );
    }

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    Alert.alert("Error in getting Permissions :- ", JSON.stringify(err));
    return false;
  }
};

export { checkMediaPermissions, requestMediaPermissions };
