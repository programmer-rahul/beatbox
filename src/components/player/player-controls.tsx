import useZustandStore from "@/store/zustand-store";
import { View } from "react-native";
import MusicPlayerControls from "./music-player-controls";

const PlayerControls = () => {
  const { currentMusic } = useZustandStore();

  return (
    <View className="mt-10">
      {currentMusic?.duration && (
        <MusicPlayerControls
          duration={currentMusic.duration}
          musicId={currentMusic.id}
        />
      )}
    </View>
  );
};

export default PlayerControls;
