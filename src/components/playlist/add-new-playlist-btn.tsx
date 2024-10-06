import { ListPlus } from "lucide-react-native";
import COLORS from "./../../constants/colors";
import { Dispatch, SetStateAction } from "react";
import { Pressable, Text } from "react-native";

function AddNewPlaylistBtn({
  setIsVisible,
}: {
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Pressable
      onPress={() => setIsVisible(true)}
      className="my-4 flex flex-row items-center space-x-2 rounded-md border px-4 py-1"
      style={{ borderColor: COLORS.secondaryText }}
    >
      <ListPlus size={25} color={COLORS.main} />
      <Text
        style={{ color: COLORS.main }}
        className="font-primary_semibold text-base"
      >
        New Playlist
      </Text>
    </Pressable>
  );
}

export default AddNewPlaylistBtn;
