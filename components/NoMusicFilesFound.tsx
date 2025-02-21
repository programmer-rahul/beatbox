import CustomView from "./reusable/CustomView";
import CustomText from "./reusable/CustomText";

const NoMusicFilesFound = () => {
  return (
    <CustomView
      className="flex-1 items-center justify-center gap-4 px-4"
      backgroundColor="PRIMARY_BG"
    >
      <CustomText className="text-3xl" color="PRIMARY_TEXT">
        No Music Files Found
      </CustomText>
    </CustomView>
  );
};

export default NoMusicFilesFound;
