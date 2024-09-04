import { View, Text, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { formatMusicFileDuration } from "@/lib/helper";
import { useRouter } from "expo-router";
import useZustandStore from "@/store/zustand-store";
import { TMusicFile } from "@/types/music";

const ListMusic = ({ musicFile }: { musicFile: TMusicFile }) => {
  const { navigate } = useRouter();
  const { setCurrentMusic, currentMusic } = useZustandStore();

  const { filename, duration } = musicFile;

  return (
    <View className="flex-row justify-between items-center border border-lime-300 bg-lime-200/20 p-1 rounded-md mb-2">
      <Pressable
        className="w-[88%] flex-row space-x-2"
        onPress={() => {
          setCurrentMusic(musicFile);

          // change route
          navigate("/player");
        }}
      >
        <View className="w-9 h-9 items-center justify-center bg-lime-200/20 border border-lime-600 rounded-md">
          <Feather name="music" size={22} color="#65a30d" />
        </View>
        <View>
          <Text className="text-neutral-900 text-xs" numberOfLines={1}>
            {filename}
          </Text>
          <Text className="text-neutral-500">
            {formatMusicFileDuration(duration)}
          </Text>
        </View>
        {/* </Link> */}
      </Pressable>
      <View>
        <Entypo name="dots-three-horizontal" size={20} />
      </View>
    </View>
  );
};

export default ListMusic;
