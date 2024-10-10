import { ListMusic } from "lucide-react-native";
import COLORS from "./../../constants/colors";
import { Dispatch } from "react";
import { Pressable, Text, View } from "react-native";

function PlaylistName({
  name: playlistName,
  setSelectedPlaylist,
  tracksCount,
}: {
  name: string;
  setSelectedPlaylist: Dispatch<React.SetStateAction<null | string>>;
  tracksCount: number;
}) {
  return (
    <Pressable
      onPress={() => {
        setSelectedPlaylist(playlistName);
      }}
      className="mt-2 flex-row items-center justify-between rounded-md bg-secondaryBg p-1"
    >
      <View className="flex-1 flex-row items-center space-x-2">
        <ListMusic size={28} color={COLORS.main} />
        <Text
          className="font-primary_semibold text-base text-secondaryText"
          style={{ color: COLORS.secondaryText }}
        >
          {playlistName}
        </Text>
      </View>
      {tracksCount !== 0 && (
        <Text
          className="mr-2 font-primary_semibold text-base text-secondaryText"
          style={{ color: COLORS.secondaryText }}
        >
          {String(tracksCount)}
        </Text>
      )}
    </Pressable>
  );
}

export default PlaylistName;
