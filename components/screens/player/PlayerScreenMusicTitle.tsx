import CustomText from "@/components/reusable/CustomText";
import CustomView from "@/components/reusable/CustomView";

interface TPlayerScreenMusicTitle {
  title: string;
  album: string;
}

export default function PlayerScreenMusicTitle({
  title,
  album,
}: TPlayerScreenMusicTitle) {
  return (
    <CustomView className="flex justify-between px-4">
      <CustomText className="text-base" numberOfLines={1} color="PRIMARY_TEXT">
        {title}
      </CustomText>
      <CustomText
        className="font-primary_regular text-secondaryText text-start text-sm"
        numberOfLines={1}
        color="SECONDARY_TEXT"
      >
        {album}
      </CustomText>
    </CustomView>
  );
}
