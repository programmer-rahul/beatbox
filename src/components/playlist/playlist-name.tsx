import COLORS from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Dispatch } from "react";
import { Pressable, Text } from "react-native";

function PlaylistName({
  name: playlistName,
  setSelectedPlaylist,
}: {
  name: string;
  setSelectedPlaylist: Dispatch<React.SetStateAction<null | string>>;
}) {
  return (
    <Pressable
      onPress={() => {
        setSelectedPlaylist(playlistName);
      }}
      className="mt-2 flex-row items-center space-x-2 rounded-md bg-secondaryBg p-1"
    >
      <MaterialCommunityIcons
        name="playlist-music"
        size={30}
        color={COLORS.main}
      />
      <Text
        className="mb-1 font-primary_semibold text-xl text-primaryText"
        style={{ color: COLORS.secondaryText }}
      >
        {playlistName}
      </Text>
    </Pressable>
  );
}

export default PlaylistName;
