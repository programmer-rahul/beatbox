import CustomText from "./CustomText";
import CustomView from "./CustomView";

export default function NoSearchMusicFilesFound({
  type,
}: {
  type: "Music" | "Playlist";
}) {
  return (
    <CustomView className="flex flex-1 items-center pt-12">
      <CustomText
        color="SECONDARY_TEXT"
        className="text-center text-3xl"
        fontWeight="Semibold"
      >
        No Searched {type === "Music" ? "Music Files" : "Playlists"} Found
      </CustomText>
    </CustomView>
  );
}
