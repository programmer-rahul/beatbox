import { ActivityIndicator, TextInput } from "react-native";
import CustomView from "./CustomView";
import { COLORS } from "@/constants/COLORS";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
  searching: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  setSearchText,
  searching,
}) => {
  return (
    <CustomView
      className="w-full flex-row items-center rounded-xl px-3"
      backgroundColor="NAVIGATION_BG"
    >
      <MaterialIcons name="search" size={20} color={COLORS.SECONDARY_ICON} />
      <TextInput
        className="flex-1 px-2 py-2"
        value={searchText}
        placeholder=" Search here ..."
        placeholderTextColor={COLORS.PRIMARY_ICON + "88"}
        style={{ color: COLORS.PRIMARY_TEXT }}
        onChangeText={setSearchText}
        cursorColor={
          searchText.trim() ? COLORS.PRIMARY_TEXT : COLORS.PRIMARY_ICON
        }
      />

      {searching ? (
        <ActivityIndicator color={COLORS.MAIN} />
      ) : (
        <AntDesign
          name="plus"
          size={20}
          color={searchText.trim() ? COLORS.PRIMARY_TEXT : "transparent"}
          style={{ transform: [{ rotate: "45deg" }] }}
          onPress={() => setSearchText("")}
        />
      )}
    </CustomView>
  );
};

export default SearchBar;
