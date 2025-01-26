import React from "react";
import { TextInput, View } from "react-native";
import { SearchIcon, Plus } from "lucide-react-native";
import COLORS from "../../constants/colors";

interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, setSearchText }) => {
  return (
    <View className="mt-3 w-full flex-row items-center rounded-full bg-bottomSheet px-3">
      <SearchIcon
        color={COLORS.modalBg + "88"}
        size={20}
      />
      <TextInput
        className="bg-red-5 flex-1 px-2 py-2 text-primaryText"
        value={searchText}
        placeholder=" Search here ..."
        placeholderTextColor={COLORS.modalBg + "88"}
        onChangeText={setSearchText}
        cursorColor={
          searchText.trim() ? COLORS.primaryText : COLORS.modalBg + "88"
        }
      />
      <Plus
        color={searchText.trim() ? COLORS.primaryText : "transparent"}
        className="rotate-45"
        onPress={() => setSearchText("")}
      />
    </View>
  );
};

export default SearchBar;
