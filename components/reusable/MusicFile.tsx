import { TMusic } from "@/types/music";
import { Pressable } from "react-native";
import CustomView from "./CustomView";
import { COLORS } from "@/constants/COLORS";
import MusicFileCover from "./MusicFileCover";
import CustomText from "./CustomText";
import { formatMusicFileDuration } from "@/libs/time";
import useMusicStore from "@/store/useMusicStore";
import TrackPlayer from "react-native-track-player";
import { MusicFileTitle } from "./MusicFileTitle";
import { router } from "expo-router";
import { TMusicFilesListingType } from "./MusicFilesListing";

interface TMusicFile {
  musicFile: TMusic;
  type: TMusicFilesListingType;
}

export default function MusicFile({ musicFile, type }: TMusicFile) {
  const musicFilePress = async () => {
    const localMusicFiles = useMusicStore.getState().localMusicFiles;
    const activeTrack = await TrackPlayer.getActiveTrack();

    try {
      // redirect to player screen if current music is clicked again
      if (activeTrack?.contentType === musicFile.id) {
        return router.push("/player");
      }

      let selectedMusicFileIndex = 0;

      if (type === "ALL") {
        if (activeTrack?.genre !== type) {
          await TrackPlayer.reset();
          await TrackPlayer.add(
            localMusicFiles.map((localMusicFile) => {
              const { cover, id, ...rest } = localMusicFile;
              return {
                ...rest,
                artwork: cover || "UNKNOWN",
                contentType: id,
                genre: type,
              };
            }),
          );
        }
        selectedMusicFileIndex = localMusicFiles.findIndex(
          (locaMusicFile) => locaMusicFile.id === musicFile.id,
        );
      } else if (type === "FAVOURITE") {
        const favouriteMusicFiles = localMusicFiles.filter((localMusicFile) =>
          useMusicStore
            .getState()
            .favouriteLocalMusicFiles.includes(localMusicFile.id),
        );
        if (activeTrack?.genre !== type) {
          await TrackPlayer.reset();
          await TrackPlayer.add(
            favouriteMusicFiles.map((localMusicFile) => {
              const { cover, id, ...rest } = localMusicFile;
              return {
                ...rest,
                artwork: cover || "UNKNOWN",
                contentType: id,
                genre: type,
              };
            }),
          );
        }
        selectedMusicFileIndex = favouriteMusicFiles.findIndex(
          (locaMusicFile) => locaMusicFile.id === musicFile.id,
        );
      } else if (type.includes("PLAYLIST:")) {
        const playlistName = type.split(":")[1];
        const userPlaylist = useMusicStore
          .getState()
          .userPlaylists.find(
            (userPlaylist) => userPlaylist.name === playlistName,
          );
        if (!userPlaylist) return;
        const playlistMusicFileIds = userPlaylist.musicFiles;

        const musicFiles = localMusicFiles.filter((localMusicFile) =>
          playlistMusicFileIds.includes(localMusicFile.id),
        );

        if (activeTrack?.genre !== type) {
          await TrackPlayer.reset();
          await TrackPlayer.add(
            musicFiles.map((musicFile) => {
              const { cover, id, ...rest } = musicFile;
              return {
                ...rest,
                artwork: cover || "UNKNOWN",
                contentType: id,
                genre: type,
              };
            }),
          );
        }
        selectedMusicFileIndex = musicFiles.findIndex(
          (musicFile) => musicFile.id === musicFile.id,
        );
      }

      await TrackPlayer.skip(selectedMusicFileIndex);
      await TrackPlayer.play();
    } catch (_) {
      console.log("err", _);
    }
  };

  return (
    <CustomView
      className="h-16 rounded-lg p-2"
      style={{
        backgroundColor: COLORS.NAVIGATION_BG,
        borderColor: COLORS.NAVIGATION_BG,
        marginBottom: 12,
      }}
    >
      <Pressable
        className="flex-1 flex-row gap-4"
        onPress={() => {
          musicFilePress();
        }}
      >
        <MusicFileCover uri={musicFile.cover} />

        <CustomView className="flex-1 flex-row gap-2">
          <MusicFileTitle title={musicFile.title} artist={musicFile.artist} />
          <MusicFileDuration duration={musicFile.duration} />
        </CustomView>
      </Pressable>
    </CustomView>
  );
}

function MusicFileDuration({ duration }: { duration: number }) {
  return (
    <CustomText
      className="ml-2 self-center rounded-md px-2 py-[2px] text-xs"
      style={{
        color: COLORS.PRIMARY_TEXT + "66",
        backgroundColor: COLORS.SECONDARY_TEXT + "33",
      }}
      fontWeight="Medium"
    >
      {formatMusicFileDuration(duration, "milliseconds")}
    </CustomText>
  );
}
