import CustomText from "@/components/reusable/CustomText";
import CustomView from "@/components/reusable/CustomView";
import useMusicStore from "@/store/useMusicStore";
import { router } from "expo-router";
import { Pressable } from "react-native";
import PlaylistItemMenuPopUp from "./PlaylistItemMenuPopUp";

export default function PlaylistItem({
  name,
  count,
}: {
  name: string;
  count: number;
}) {
  const onPlaylistPress = () => {
    useMusicStore.setState({ selectedUserPlaylist: name });
    router.push("/playlists/selected-playlist");
  };

  return (
    <CustomView
      className="mb-3 flex-row items-center justify-between gap-2 rounded-md p-3"
      backgroundColor="BOTTOM_SHEET"
    >
      <Pressable onPress={onPlaylistPress} className="flex-1">
        <CustomText color="PRIMARY_TEXT" fontWeight="Medium">
          {name}
        </CustomText>
      </Pressable>
      {count !== 0 && <CustomText color="SECONDARY_TEXT">{count}</CustomText>}

      <PlaylistItemMenuPopUp name={name} count={count} />
    </CustomView>
  );
}
