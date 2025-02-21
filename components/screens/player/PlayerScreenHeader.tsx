import CustomText from "@/components/reusable/CustomText";
import CustomView from "@/components/reusable/CustomView";
import { memo } from "react";

const PlayerScreenHeader = () => {
  return (
    <CustomView backgroundColor="PRIMARY_BG">
      <CustomView
        className="flex flex-row items-center justify-center rounded-b-3xl border-0 border-t-0 py-3"
        style={
          {
            // borderColor: COLORS.PRIMARY_TEXT + "44",
          }
        }
        backgroundColor="NAVIGATION_BG"
      >
        <CustomText
          className="text-xl"
          color="PRIMARY_TEXT"
          colorOpacity="cc"
          fontWeight="Bold"
        >
          Now Playing
        </CustomText>
      </CustomView>
    </CustomView>
  );
};

export default memo(PlayerScreenHeader);
