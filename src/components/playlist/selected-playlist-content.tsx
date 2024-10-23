import COLORS from "./../../constants/colors";
import React, { Dispatch, SetStateAction } from "react";
import { Pressable, Text, View } from "react-native";
import ListMusicFiles from "../home/list-music-files";
import { ChevronLeft } from "lucide-react-native";
import useZustandStore from "../../store/useZustandStore";

function SelectedPlaylistContent({
  selectedPlaylist,
  setSelectedPlaylist,
}: {
  selectedPlaylist: null | string;
  setSelectedPlaylist: Dispatch<SetStateAction<null | string>>;
}) {
  const allPlaylists = useZustandStore((state) => state.allPlaylists);

  const currentPlaylist = allPlaylists.find(
    (playlist) => playlist.name === selectedPlaylist,
  );

  if (!currentPlaylist || !selectedPlaylist) return null;

  return (
    <View
      className="flex-1 flex-col bg-primaryBg py-1"
      style={{
        backgroundColor: COLORS.primaryBg,
      }}
    >
      <View className="flex-col items-start px-6">
        <View className="w-full flex-row justify-between">
          <Pressable onPress={() => setSelectedPlaylist(null)}>
            <ChevronLeft size={30} color={COLORS.main} />
          </Pressable>
          <Text
            className="font-primary_regular text-xl text-primaryText"
            style={{
              color: COLORS.primaryText,
            }}
          >
            {selectedPlaylist}
          </Text>
          <View />
        </View>
        <View className="mt-4 w-full">
          {!currentPlaylist?.musicTracksCount ? (
            <PlaylistIsEmpty />
          ) : (
            <ListMusicFiles
              queueType="playlist"
              playlistName={selectedPlaylist}
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
      className="mt-20 self-center font-primary_regular text-2xl text-secondaryText"
      style={{ color: COLORS.secondaryText }}
    >
      Playlist is empty
    </Text>
  );
};
