import { Text, View } from "react-native";
import COLORS from "./../constants/colors";
import { useState } from "react";
import CustomModal from "./../components/reusable/custom-modal";
import ListAllPlaylists from "./../components/playlist/list-all-playlists";
import usePlaylistStore, { playlistStore } from "./../store/playlist-store";
import AddNewPlaylistBtn from "./../components/playlist/add-new-playlist-btn";
import SelectedPlaylistContent from "./../components/playlist/selected-playlist-content";

const PlaylistScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const addPlaylist = usePlaylistStore((state) => state.addPlaylist);
  const [selectedPlaylist, setSelectedPlaylist] = useState<null | string>(null);

  const onNewPlaylistPress = () => {
    // check if there are playlist with this name is already exists
    const isPlaylistAlreadyAvailable = playlistStore
      .getState()
      .allPlaylists.some((playlist) => playlist.name === modalText.trim());

    if (isPlaylistAlreadyAvailable) return;

    // add into playlists
    addPlaylist({
      name: modalText.trim(),
      musicTracksCount: 0,
      musicTracks: [],
    });
    setIsVisible(false);
    setModalText("");
  };

  return !selectedPlaylist ? (
    <View
      className="flex h-full flex-col bg-primaryBg py-1"
      style={{
        backgroundColor: COLORS.primaryBg,
      }}
    >
      <View className="flex-col items-start px-6">
        <YourPlaylistsHeading />
        <ListAllPlaylists setSelectedPlaylist={setSelectedPlaylist} />
        <AddNewPlaylistBtn setIsVisible={setIsVisible} />
      </View>

      <CustomModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        modalText={modalText}
        setModalText={setModalText}
        onPress={onNewPlaylistPress}
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
