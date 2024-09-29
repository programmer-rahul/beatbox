import COLORS from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction } from "react";
import { Pressable, Text, View } from "react-native";
import usePlaylistStore from "@/store/playlist-store";
import ListMusicFiles from "../home/list-music-files";

function SelectedPlaylistContent({
  selectedPlaylist,
  setSelectedPlaylist,
}: {
  selectedPlaylist: null | string;
  setSelectedPlaylist: Dispatch<SetStateAction<null | string>>;
}) {
  const { allPlaylists } = usePlaylistStore(["allPlaylists"]);

  const currentPlaylist = allPlaylists.find(
    (playlist) => playlist.name === selectedPlaylist,
  );

  if (!currentPlaylist) return null;

  return (
    <View
      className="flex h-full flex-col bg-primaryBg py-1"
      style={{
        backgroundColor: COLORS.primaryBg,
      }}
    >
      <View className="flex-col items-start px-6">
        <View className="w-full flex-row justify-between">
          <Pressable onPress={() => setSelectedPlaylist(null)}>
            <MaterialCommunityIcons
              name="chevron-left-circle"
              size={30}
              color={COLORS.main}
            />
          </Pressable>
          <Text
            className="font-primary_regular text-2xl text-primaryText"
            style={{
              color: COLORS.primaryText,
            }}
          >
            {selectedPlaylist}
          </Text>
          <View />
        </View>
        <View className="w-full mt-4">
          {!currentPlaylist?.musicTracksCount ? (
            <PlaylistIsEmpty />
          ) : (
            <ListMusicFiles
              queueType="playlist"
              musicFiles={currentPlaylist.musicTracks}
            />
          )}
        </View>
      </View>
    </View>
  );
}

export default SelectedPlaylistContent;

const PlaylistIsEmpty = () => {
  return (
    <Text
      className="mt-20 self-center font-primary_regular text-4xl text-secondaryText"
      style={{ color: COLORS.secondaryText }}
    >
      Playlist is empty
    </Text>
  );
};
