import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomView from "../reusable/CustomView";
import CustomText from "../reusable/CustomText";
import FastImage from "react-native-fast-image";

const Header = () => {
  const insets = useSafeAreaInsets();

  return (
    <CustomView backgroundColor="PRIMARY_BG">
      <CustomView
        className="rounded-b-3xl px-6"
        backgroundColor="NAVIGATION_BG"
        style={{
          paddingTop: insets.top + 20,
          paddingBottom: 20,
        }}
      >
        <CustomView className="flex flex-row items-center justify-between">
          <CustomView className="flex-row items-center justify-center gap-2">
            <FastImage
              source={require("../../assets/images/logo.png")}
              style={{ width: 25, height: 25, }}
              resizeMode="cover"
            />
            <CustomText
              className="text-3xl"
              color="PRIMARY_TEXT"
              fontWeight="Semibold"
            >
              BeatBox
            </CustomText>
          </CustomView>
          <CustomView className="flex-row items-center" style={{ gap: 16 }}>
            {/* <ScanMusicFilesIcon
            refreshMusicFilesModal={refreshMusicFilesModal}
            setRefreshMusicFilesModal={setRefreshMusicFilesModal}
          /> */}
          </CustomView>
        </CustomView>
        {/* <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
      ></LinearGradient> */}
      </CustomView>
    </CustomView>
  );
};

export default Header;
