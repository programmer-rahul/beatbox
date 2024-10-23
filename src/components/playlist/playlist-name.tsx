import { ListMusic } from "lucide-react-native";
import COLORS from "./../../constants/colors";
import { Dispatch } from "react";
import { Pressable, Text, View } from "react-native";
import PlaylistNameMenu from "../reusable/menu/playlist-name-menu";

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
    <View className="mt-2 flex-row items-center justify-between rounded-md bg-secondaryBg p-1">
      <Pressable
        className="flex-1 flex-row items-center space-x-2"
        onPress={() => {
          setSelectedPlaylist(playlistName);
        }}
      >
        <ListMusic size={26} color={COLORS.main} />

        <Text
          className="font-primary_semibold text-base text-primaryText"
          style={{ color: COLORS.primaryText + "aa" }}
        >
          {playlistName}
        </Text>
      </Pressable>
      <View className="flex flex-row items-center">
        {tracksCount !== 0 && (
          <Text
            className="text-Tase mr-2 font-primary_semibold text-primaryText"
            style={{ color: COLORS.primaryText + "aa" }}
          >
            {String(tracksCount)}
          </Text>
        )}
        <PlaylistNameMenu playlistName={playlistName} />
      </View>
    </View>
  );
}

export default PlaylistName;
