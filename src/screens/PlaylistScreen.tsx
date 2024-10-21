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

  return !selectedPlaylist ? (
    <View
      className="flex h-full flex-col bg-primaryBg"
      style={{
        backgroundColor: COLORS.primaryBg,
      }}
    >
      <View className="flex-col items-start px-6">
        <YourPlaylistsHeading />
        <ListAllPlaylists setSelectedPlaylist={setSelectedPlaylist} />
        <AddNewPlaylistBtn setIsVisible={setIsNewPlaylistModalVisible} />
      </View>

      <AddNewPlaylistModal
        isVisible={isNewPlaylistModalVisible}
        setIsVisible={setIsNewPlaylistModalVisible}
      />
    </View>
  ) : (
    <SelectedPlaylistContent
      selectedPlaylist={selectedPlaylist}
      setSelectedPlaylist={setSelectedPlaylist}
    />
  );
};

export default PlaylistScreen;

const YourPlaylistsHeading = () => {
  return (
    <Text
      className="font-primary_regular text-2xl text-primaryText"
      style={{
        color: COLORS.primaryText,
      }}
    >
      Your Playlists
    </Text>
  );
};
