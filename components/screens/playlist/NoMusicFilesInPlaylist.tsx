import CustomView from "@/components/reusable/CustomView";
import CustomText from "@/components/reusable/CustomText";

export default function NoMusicFilesInPlaylist() {
  return (
    <CustomView
      className="flex flex-1 items-center px-16 pt-32"
      backgroundColor="PRIMARY_BG"
    >
      <CustomText
        color="SECONDARY_TEXT"
        className="text-center text-3xl"
        fontWeight="Semibold"
      >
        No Music Files In Playlist Yet.
      </CustomText>
    </CustomView>
  );
}
