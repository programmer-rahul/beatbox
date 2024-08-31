import { View, Text, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { formatMusicFileDuration } from "@/lib/helper";

const ListMusic = ({
  filename,
  duration,
}: {
  filename: string;
  duration: number;
}) => {
  return (
    <View className="flex-row justify-between items-center border border-lime-300 bg-lime-200/20 p-1 rounded-md mb-1">
      <Pressable
        className="flex-row items-center space-x-2 w-4/5"
        onPress={() => {}}
      >
        <View className="w-9 h-9 items-center justify-center bg-lime-200/20 border border-lime-600 rounded-md">
          <Feather name="music" size={22} color="#65a30d" />
        </View>
        <View>
          <Text numberOfLines={1} className="text-neutral-900">
            {filename}
          </Text>
          <Text className="text-neutral-500">
            {formatMusicFileDuration(duration)}
          </Text>
        </View>
      </Pressable>
      <View>
        <Entypo name="dots-three-horizontal" size={20} />
      </View>
    </View>
  );
};

export default ListMusic;
