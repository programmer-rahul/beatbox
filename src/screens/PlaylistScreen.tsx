import { Text, View } from "react-native";
import COLORS from "./../constants/colors";
import { useState } from "react";
import ListAllPlaylists from "./../components/playlist/list-all-playlists";
import SelectedPlaylistContent from "./../components/playlist/selected-playlist-content";
import AddNewPlaylistBtn from "../components/playlist/add-new-playlist-btn";
import AddNewPlaylistModal from "../components/reusable/modal/add-new-playlist-modal";

const PlaylistScreen = () => {
  const [isNewPlaylistModalVisible, setIsNewPlaylistModalVisible] =
    useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<null | string>(null);

  console.log("INSIDE PLAYLIST SCREEN");

  return (
    <View
      className="flex-1 bg-primaryBg"
      style={{
        backgroundColor: COLORS.primaryBg,
      }}
    >
      <View className="flex-1 pt-2">
        {!selectedPlaylist ? (
          <>
            <View className="mb-12 flex-1 flex-col items-start px-6">
              <YourPlaylistsHeading />
              <ListAllPlaylists setSelectedPlaylist={setSelectedPlaylist} />
              <AddNewPlaylistBtn setIsVisible={setIsNewPlaylistModalVisible} />
            </View>

            <AddNewPlaylistModal
              isVisible={isNewPlaylistModalVisible}
              setIsVisible={setIsNewPlaylistModalVisible}
            />
          </>
        ) : (
          <SelectedPlaylistContent
            selectedPlaylist={selectedPlaylist}
            setSelectedPlaylist={setSelectedPlaylist}
          />
        )}
      </View>
    </View>
  );
};

export default PlaylistScreen;

const YourPlaylistsHeading = () => {
  return (
    <Text
      className="font-primary_regular text-xl text-primaryText"
      style={{
        color: COLORS.primaryText,
      }}
    >
      Your Playlists
    </Text>
  );
};
