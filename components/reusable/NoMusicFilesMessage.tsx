import { TNoMusicFileMessage } from "@/layout/MusicFilesListingLayout";
import CustomText from "./CustomText";
import CustomView from "./CustomView";
import AddNewPlaylistBtn from "@/app/(tabs)/playlists/AddNewPlaylistBtn";

export default function NoMusicFilesMessage({
  message,
}: {
  message: TNoMusicFileMessage;
}) {
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
        {message}
      </CustomText>
      {message === "No Playlist Found" && (
        <CustomView className="mt-8`">
          <AddNewPlaylistBtn />
        </CustomView>
      )}
    </CustomView>
  );
}
