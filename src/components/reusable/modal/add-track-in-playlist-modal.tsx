import { Check, ListMinus, ListPlus, X } from "lucide-react-native";
import COLORS from "../../../constants/colors";
import { Dispatch, SetStateAction, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import useZustandStore from "../../../store/useZustandStore";
import AddNewPlaylistBtn from "../../playlist/add-new-playlist-btn";
import AddNewPlaylistModal from "./add-new-playlist-modal";

interface TAddTrackInPlaylistModal {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

function AddTrackInPlaylistModal({
  isVisible,
  setIsVisible,
}: TAddTrackInPlaylistModal) {
  const currentMusicTrack = useZustandStore((state) => state.currentMusicTrack);
  const addTrackInPlaylists = useZustandStore(
    (state) => state.addTrackInPlaylists,
  );

  const [isNewPlaylistModal, setIsNewPlaylistModal] = useState(false);
  const [playlistType, setPlaylistType] = useState<"add" | "remove">("add");
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);

  const addOrRemoveTrackInPlaylists = () => {
    if (!currentMusicTrack) return;
    console.log("here");
    addTrackInPlaylists(currentMusicTrack, selectedPlaylists, playlistType);

    setIsVisible(false);
    setSelectedPlaylists([]);
    setPlaylistType("add");
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        focusable={true}
      >
        <View
          className="flex-1"
          style={{ backgroundColor: COLORS.primaryBg + "bb" }}
        >
          <View
            className="absolute left-[5%] top-1/4 max-h-96 w-[90%] -translate-y-4 rounded-md px-3 py-4"
            style={{ backgroundColor: COLORS.primaryIcon }}
          >
            <View className="flex-col">
              <MusicTrackTitle title={currentMusicTrack?.title || ""} />
              <AddOrRemoveFromPlaylistBtns
                playlistType={playlistType}
                setPlaylistType={setPlaylistType}
              />

              <ListAllPlaylists setSelectedPlaylists={setSelectedPlaylists} />

              <View className="-mb-2 -mt-2 self-start">
                <AddNewPlaylistBtn setIsVisible={setIsNewPlaylistModal} />
              </View>

              <View className="flex-row justify-end gap-4">
                <Pressable onPress={() => setIsVisible(false)}>
                  <Text
                    style={{
                      color: COLORS.main + "dd",
                    }}
                    className="font-primary_semibold text-base"
                  >
                    Cancel
                  </Text>
                </Pressable>
                <Pressable onPress={addOrRemoveTrackInPlaylists}>
                  <Text
                    style={{
                      color: selectedPlaylists.length
                        ? COLORS.main + "dd"
                        : COLORS.main + "77",
                    }}
                    className="font-primary_semibold text-base"
                  >
                    {playlistType === "add" ? "Add" : "Remove"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <AddNewPlaylistModal
        isVisible={isNewPlaylistModal}
        setIsVisible={setIsNewPlaylistModal}
      />
    </>
  );
}

export default AddTrackInPlaylistModal;

const MusicTrackTitle = ({ title }: { title: string }) => {
  return (
    <Text numberOfLines={2} className="mb-2 text-sm text-primaryText">
      {title}
    </Text>
  );
};

const AddOrRemoveFromPlaylistBtns = ({
  playlistType,
  setPlaylistType,
}: {
  playlistType: "add" | "remove";
  setPlaylistType: Dispatch<SetStateAction<"add" | "remove">>;
}) => {
  return (
    <View className="my-1 flex-row justify-between gap-2">
      <Pressable
        className="flex-1 items-center rounded-sm border p-1"
        style={{
          borderColor:
            playlistType === "add" ? COLORS.main : COLORS.secondaryIcon,
        }}
        onPress={() => setPlaylistType("add")}
      >
        <ListPlus
          size={25}
          color={playlistType === "add" ? COLORS.main : COLORS.secondaryIcon}
        />
        <Text className="text-secondaryText">Add To Playlists</Text>
      </Pressable>
      <Pressable
        className="flex-1 items-center rounded-sm border p-1"
        style={{
          borderColor:
            playlistType === "remove" ? COLORS.main : COLORS.secondaryIcon,
        }}
        onPress={() => setPlaylistType("remove")}
      >
        <ListMinus
          size={25}
          color={playlistType === "remove" ? COLORS.main : COLORS.secondaryIcon}
        />
        <Text className="text-secondaryText">Remove To Playlists</Text>
      </Pressable>
    </View>
  );
};

const ListAllPlaylists = ({
  setSelectedPlaylists,
}: {
  setSelectedPlaylists: Dispatch<SetStateAction<string[]>>;
}) => {
  const allPlaylists = useZustandStore((state) => state.allPlaylists);

  return (
    <ScrollView className="mt-2 max-h-40" showsVerticalScrollIndicator={false}>
      {allPlaylists.map((playlist, index) => {
        return (
          <PlaylistCheckbox
            key={index}
            setSelectedPlaylists={setSelectedPlaylists}
            playlistTitle={playlist.name}
          />
        );
      })}
    </ScrollView>
  );
};

const PlaylistCheckbox = ({
  playlistTitle,
  setSelectedPlaylists,
}: {
  playlistTitle: string;
  setSelectedPlaylists: Dispatch<SetStateAction<string[]>>;
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const onCheckboxPress = () => {
    setSelectedPlaylists((selectedPlaylists) => {
      return isSelected
        ? selectedPlaylists.filter(
            (playlistTitle) => playlistTitle !== playlistTitle,
          )
        : [...selectedPlaylists, playlistTitle];
    });

    setIsSelected(!isSelected);
  };
  return (
    <View className="mb-2 flex-row items-center gap-2">
      <Pressable
        onPress={onCheckboxPress}
        className="h-5 w-5 items-center justify-center rounded-sm border"
        style={{
          borderColor: isSelected ? COLORS.main : COLORS.secondaryIcon,
        }}
      >
        {isSelected && <Check size={16} color={COLORS.main} />}
      </Pressable>
      <Text className="flex-1 text-base text-primaryText" numberOfLines={1}>
        {playlistTitle}
      </Text>
    </View>
  );
};
