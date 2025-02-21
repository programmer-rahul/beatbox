import BottomSheetLayout from "@/layout/BottomSheetLayout";
import { COLORS } from "@/constants/COLORS";
import CustomText from "../reusable/CustomText";
import { Pressable, ScrollView } from "react-native";
import { useActiveTrack } from "react-native-track-player";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomView from "../reusable/CustomView";
import useMusicStore from "@/store/useMusicStore";
import AddNewPlaylistBtn from "@/app/(tabs)/playlists/AddNewPlaylistBtn";

export default function AddMusicInPlaylistBottomSheet() {
  const activeTrack = useActiveTrack();
  const closeBottomSheet = useMusicStore((state) => state.closeBottomSheet);
  const userPlaylists = useMusicStore((state) => state.userPlaylists);
  const addMusicFileInUserPlaylist = useMusicStore(
    (state) => state.addMusicFileInUserPlaylist,
  );
  const removeMusicFileInUserPlaylist = useMusicStore(
    (state) => state.removeMusicFileInUserPlaylist,
  );

  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);

  const onAddPress = () => {
    if (!activeTrack || selectedPlaylists.length === 0) return;
    selectedPlaylists.forEach((playlistName) => {
      if (activeTrack?.contentType) {
        addMusicFileInUserPlaylist(playlistName, activeTrack.contentType);
      }
    });
    closeBottomSheet();
  };

  const onRemovePress = () => {
    if (!activeTrack || selectedPlaylists.length === 0) return;
    selectedPlaylists.forEach((playlistName) => {
      if (activeTrack?.contentType) {
        removeMusicFileInUserPlaylist(playlistName, activeTrack.contentType);
      }
    });
    closeBottomSheet();
  };

  useEffect(() => {
    if (!activeTrack) return;
    const musicFileId = activeTrack.contentType;
    if (!musicFileId) return;
    userPlaylists.forEach((userPlaylist) => {
      if (userPlaylist.musicFiles.includes(musicFileId)) {
        setSelectedPlaylists((prev) => [...prev, userPlaylist.name]);
      }
    });
  }, [activeTrack]);

  return (
    <BottomSheetLayout heading="Playlists">
      <CustomView className="h-full flex-col gap-2">
        {/* current track title  */}
        <CustomText numberOfLines={2} fontWeight="Medium">
          {activeTrack?.title}
        </CustomText>

        <CustomView className="flex-1">
          {userPlaylists.length === 0 ? (
            <CustomView className="flex h-full w-full items-center justify-center">
              <CustomText className="text-2xl" fontWeight="Medium">
                No Playlists Found
              </CustomText>
            </CustomView>
          ) : (
            <>
              {/* select playlist text */}
              <CustomView>
                <CustomText className="text-center text-sm" fontWeight="Medium">
                  Select Playlists
                </CustomText>
              </CustomView>

              {/* userPlaylists listing */}
              <ScrollView showsVerticalScrollIndicator={false}>
                {userPlaylists.map((playlist, index) => {
                  return (
                    <PlaylistCheckbox
                      key={index}
                      playlistTitle={playlist.name}
                      isSelected={selectedPlaylists.includes(playlist.name)}
                      onCheckboxPress={() => {
                        if (selectedPlaylists.includes(playlist.name)) {
                          setSelectedPlaylists((prev) =>
                            prev.filter(
                              (playlistName) => playlistName !== playlist.name,
                            ),
                          );
                        } else {
                          setSelectedPlaylists((prev) => [
                            ...prev,
                            playlist.name,
                          ]);
                        }
                      }}
                    />
                  );
                })}
              </ScrollView>
            </>
          )}
        </CustomView>

        {/* add new playlist button */}
        <CustomView className="-mb-2 -mt-2 self-start">
          <AddNewPlaylistBtn />
        </CustomView>

        {/* remove and add button */}
        <CustomView className="mb-4 flex-row justify-end gap-4">
          <Pressable onPress={onRemovePress}>
            <CustomText
              className="text-base"
              color="MAIN"
              fontWeight="Semibold"
            >
              Remove
            </CustomText>
          </Pressable>
          <Pressable onPress={onAddPress}>
            <CustomText
              className="text-base"
              color="MAIN"
              fontWeight="Semibold"
            >
              Add
            </CustomText>
          </Pressable>
        </CustomView>
      </CustomView>
    </BottomSheetLayout>
  );
}

const PlaylistCheckbox = ({
  playlistTitle,
  onCheckboxPress,
  isSelected,
}: {
  playlistTitle: string;
  onCheckboxPress: () => void;
  isSelected: boolean;
}) => {
  return (
    <Pressable
      className="flex-row items-center gap-2 self-start py-2"
      onPress={() => onCheckboxPress()}
    >
      <CustomView
        className="h-6 w-6 items-center justify-center rounded-sm border"
        style={{
          borderColor: isSelected ? COLORS.PRIMARY_ICON : COLORS.SECONDARY_ICON,
        }}
      >
        {isSelected && (
          <MaterialCommunityIcons
            name="check"
            size={16}
            color={COLORS.PRIMARY_ICON}
          />
        )}
      </CustomView>
      <CustomText
        className="flex-1 text-base"
        style={{
          color: isSelected ? COLORS.PRIMARY_ICON : COLORS.SECONDARY_ICON,
        }}
        numberOfLines={1}
        fontWeight={isSelected ? "Semibold" : "Medium"}
      >
        {playlistTitle}
      </CustomText>
    </Pressable>
  );
};
