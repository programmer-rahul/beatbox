import COLORS from "./../../constants/colors";
import { memo } from "react";
import { Text, View } from "react-native";
import useZustandStore from "../../store/useZustandStore";

const PlayerScreenHeader = () => {
  const isSwiping = useZustandStore((state) => state.isSwiping);

  console.log("inside player screen header");
  return (
    <View
      className="flex flex-row items-center justify-center border-b py-2"
      style={{
        borderColor: COLORS.primaryText,
      }}
    >
      <Text
        className="font-primary_semibold text-xl text-primaryText"
        style={{
          color: COLORS.primaryText,
        }}
      >
        Now Playing
      </Text>
    </View>
  );
};

export default memo(PlayerScreenHeader);
