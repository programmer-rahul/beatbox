import { useEffect, useState } from "react";
import { Alert, Linking, Text, View } from "react-native";
import * as MediaLibrary from "expo-media-library";

export default function Index() {
  const [musicFiles, setMusicFiles] = useState<MediaLibrary.Asset[]>([]);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  // check permissions
  const checkIsHavePermissions = async () => {
    // console.log(
    //   "isHavePermissions",
    //   await MediaLibrary.requestPermissionsAsync()
    // );
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status === "granted") {
      setIsPermissionGranted(true);
    } else {
      Alert.alert(
        "Permissions Required",
        "We need access to your media library to display your songs.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ]
      );
    }
  };

  const getMediaFiles = async () => {
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    if (media.assets.length > 0) {
      setMusicFiles(media.assets);
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

  // when we have all music files
  useEffect(() => {
    console.log("Music Files :- ", musicFiles);
  }, [musicFiles]);

  return (
    <View className="flex flex-col justify-center items-center h-full gap-4">
      {musicFiles && <Text className="text-3xl">All Songs Count</Text>}
      <Text className="text-5xl font-semibold text-neutral-700">
        {musicFiles.length}
      </Text>
    </View>
  );
}
