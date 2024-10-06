import { ListMusic } from "lucide-react-native";
import COLORS from "./../../constants/colors";
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
      <ListMusic size={28} color={COLORS.main} />
      <Text
        className="font-primary_semibold text-base text-primaryText"
        style={{ color: COLORS.secondaryText }}
      >
        {playlistName}
      </Text>
    </Pressable>
  );
}

export default PlaylistName;
