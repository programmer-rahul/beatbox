import { COLORS } from "@/constants/COLORS";
import CustomText from "./CustomText";
import CustomView from "./CustomView";

interface TMusicFileTitle {
  title: string;
  artist: string;
}

export function MusicFileTitle({ title, artist }: TMusicFileTitle) {
  const isCurrentPlayingSong = false;

  return (
    <CustomView className="flex-1 flex-col">
      <CustomText
        className="flex-1 text-xs"
        numberOfLines={1}
        color={isCurrentPlayingSong ? "MAIN" : "PRIMARY_TEXT"}
      >
        {title}
      </CustomText>
      <CustomText
        className="flex-1 text-xs"
        numberOfLines={1}
        style={{
          color: isCurrentPlayingSong
            ? COLORS.MAIN + "99"
            : COLORS.SECONDARY_TEXT,
        }}
      >
        {artist}
      </CustomText>
    </CustomView>
  );
}
