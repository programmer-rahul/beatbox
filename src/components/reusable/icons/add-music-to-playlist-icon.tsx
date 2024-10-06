// import { MaterialCommunityIcons } from "@expo/vector-icons";
import {ListPlus} from 'lucide-react-native';
import COLORS from './../../../constants/colors';

function AddMusicToPlaylistIcon({size = 25}: {size?: number}) {
  return (
    <ListPlus size={size} color={COLORS.secondaryIcon} onPress={() => {}} />
  );
}

export default AddMusicToPlaylistIcon;
