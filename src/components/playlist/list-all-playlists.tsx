import usePlaylistStore from "@/store/playlist-store";
import { View, VirtualizedList } from "react-native";
import PlaylistName from "./playlist-name";
import { Dispatch } from "react";
import { TPlaylist } from "@/types/store/playlist-store";

function ListAllPlaylists({
  setSelectedPlaylist,
}: {
  setSelectedPlaylist: Dispatch<React.SetStateAction<null | string>>;
}) {
  const allPlaylists = usePlaylistStore((state) => state.allPlaylists);

  return allPlaylists.length ? (
    <View className="mt-4 w-full">
      <VirtualizedList
        keyExtractor={(item) => item.name}
        getItem={(_, index) => {
          return allPlaylists[index];
        }}
        getItemCount={() => allPlaylists.length}
        renderItem={({ item, index }: { item: TPlaylist; index: number }) => {
          return (
            <PlaylistName
              name={item.name}
              setSelectedPlaylist={setSelectedPlaylist}
            />
          );
        }}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
      />
    </View>
  ) : null;
}

export default ListAllPlaylists;
