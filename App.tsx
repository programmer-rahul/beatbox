import { useRef } from "react";
import TabNavitation from "./src/screens/TabNavitation";
import { NavigationContainer } from "@react-navigation/native";
import useSetupTrackPlayer from "./src/hooks/useSetupTrackPlayer";
import TrackPlayer from "react-native-track-player";
import playbackService from "./src/lib/playback-service";
import PermissionRequired from "./src/components/reusable/permission-required";
import usePermission from "./src/hooks/usePermission";
import { StatusBar } from "react-native";
import COLORS from "./src/constants/colors";
import usePlayerEvents from "./src/hooks/usePlayerEvents";
import { SafeAreaView } from "react-native-safe-area-context";

TrackPlayer.registerPlaybackService(() => playbackService);

function App(): React.JSX.Element {
  const isTrackPlayerInitialized = useRef(false);
  useSetupTrackPlayer({ isTrackPlayerInitialized });

  return (
    <SafeAreaView className="flex-1">
      <RootNavigation />

      <StatusBar
        backgroundColor={COLORS.primaryBg}
        barStyle={"light-content"}
      />
    </SafeAreaView>
  );
}

export default App;

const RootNavigation = () => {
  const { isHavePermission } = usePermission();

  usePlayerEvents();

  console.log("INSIDE ROOT_NAVIGATION");

  return (
    <NavigationContainer>
      {isHavePermission ? <TabNavitation /> : <PermissionRequired />}
    </NavigationContainer>
  );
};
