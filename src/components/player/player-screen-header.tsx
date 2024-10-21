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
        borderColor: COLORS.secondaryText,
      }}
    >
      <Text
        className="font-primary_semibold text-xl text-primaryBg"
        style={{
          color: isSwiping ? COLORS.secondaryText : COLORS.primaryBg,
        }}
      >
        Now Playing
      </Text>
    </View>
  );
};

export default memo(PlayerScreenHeader);
