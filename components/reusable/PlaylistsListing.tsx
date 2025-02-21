import { VirtualizedList } from "react-native";
import CustomView from "./CustomView";
import { useCallback } from "react";
import { TAB_BAR_HEIGHT } from "@/constants/DIMENSIONS";
import { TUserPlaylist } from "@/types/playlist";
import PlaylistItem from "../screens/playlist/PlaylistItem";
import AddNewPlaylistBtn from "@/app/(tabs)/playlists/AddNewPlaylistBtn";

export default function PlaylistsListing({
  playlists,
}: {
  playlists: TUserPlaylist[];
}) {
  const renderPlaylistItem = useCallback(
    ({ item }: { item: TUserPlaylist }) => (
      <PlaylistItem name={item.name} count={item.musicFiles.length} />
    ),
    [],
  );

  return (
    <CustomView className="flex flex-col">
      <VirtualizedList
        data={playlists}
        keyExtractor={(item) => item.name}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        renderItem={renderPlaylistItem}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={20}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<FooterComponent />}
      />
    </CustomView>
  );
}

function FooterComponent() {
  return (
    <CustomView className="self-center">
      <AddNewPlaylistBtn />
      <CustomView
        className="h-14 w-full"
        style={{ marginBottom: 3 * TAB_BAR_HEIGHT }}
      />
    </CustomView>
  );
}
