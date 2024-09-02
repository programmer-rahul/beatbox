import { useEffect, useState } from "react";
import { Alert, Linking, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { TMusicFile } from "@/types/music";
import ListMusicFiles from "@/components/home/list-music-files";
import useZustandStore from "@/store/zustand-store";

export default function Index() {
  const {
    allMusicFiles,
    addMusicFiles,
    isPermissionGranted,
    setIsPermissionGranted,
  } = useZustandStore((state) => state);

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

  // when we have all music files
  useEffect(() => {
    // console.log("Music Files :- ", allMusicFiles);
  }, [allMusicFiles]);

  return (
    <View className="flex flex-col h-full px-6 py-1">
      {isPermissionGranted && allMusicFiles.length > 0 && (
        <ListMusicFiles musicFiles={allMusicFiles} />
      )}
    </View>
  );
}
