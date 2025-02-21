import { VirtualizedList } from "react-native";
import CustomView from "./CustomView";
import { TMusic } from "@/types/music";
import { useCallback } from "react";
import MusicFile from "./MusicFile";
import { TAB_BAR_HEIGHT } from "@/constants/DIMENSIONS";

export type TMusicFilesListingType = "ALL" | "FAVOURITE" | `PLAYLIST:${string}`;

interface TMusicFilesListing {
  musicFiles: TMusic[];
  type: TMusicFilesListingType;
}

export default function MusicFilesListing({
  musicFiles,
  type,
}: TMusicFilesListing) {
  const renderMusicFile = useCallback(
    ({ item }: { item: TMusic }) => <MusicFile musicFile={item} type={type} />,
    [],
  );

  return (
    <CustomView>
      <VirtualizedList
        data={musicFiles}
        keyExtractor={(item) => item.url}
        getItem={(data, index) => data[index]}
        getItemCount={(data) => data.length}
        renderItem={renderMusicFile}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={20}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<FooterComponent />}
      />
    </CustomView>
  );
}

function FooterComponent() {
  return (
    <CustomView
      className="h-14 w-full"
      style={{ marginBottom: 3 * TAB_BAR_HEIGHT }}
    ></CustomView>
  );
}
