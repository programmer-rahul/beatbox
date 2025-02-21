import { Ionicons } from "@expo/vector-icons";
import CustomText from "./CustomText";
import CustomView from "./CustomView";
import { COLORS } from "@/constants/COLORS";

interface TMusicFilesListingTitleProps {
  title: string;
  count: number;
  goBackIcon?: boolean;
  onGoBack?: () => void;
}
export default function MusicFilesListingTitle({
  title,
  count,
  goBackIcon = false,
  onGoBack = () => {},
}: TMusicFilesListingTitleProps) {
  return (
    <CustomView className="mt-4 flex-row justify-between">
      <CustomView className="flex-row items-center gap-4">
        {goBackIcon && (
          <Ionicons
            name="arrow-back"
            size={24}
            color={COLORS.SECONDARY_ICON}
            onPress={() => onGoBack()}
          />
        )}
        <CustomText
          color="SECONDARY_TEXT"
          className="text-lg"
          fontWeight="Medium"
        >
          {title}
        </CustomText>
      </CustomView>
      <CustomText
        color="SECONDARY_TEXT"
        className="text-lg"
        fontWeight="Medium"
      >
        {String(count)}
      </CustomText>
    </CustomView>
  );
}
