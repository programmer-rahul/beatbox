import usePlaylistStore from "@/store/playlist-store";
import { FlatList, View } from "react-native";
import PlaylistName from "./playlist-name";
import { Dispatch } from "react";

function ListAllPlaylists({
  setSelectedPlaylist,
}: {
  setSelectedPlaylist: Dispatch<React.SetStateAction<null | string>>;
}) {
  const { allPlaylists } = usePlaylistStore(["allPlaylists"]);

  return allPlaylists.length ? (
    <View className="mt-4 w-full">
      <FlatList
        data={allPlaylists}
        renderItem={({ item }) => {
          return (
            <PlaylistName
              name={item.name}
              setSelectedPlaylist={setSelectedPlaylist}
            />
          );
        }}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
      />
    </View>
  ) : null;
}

export default ListAllPlaylists;
