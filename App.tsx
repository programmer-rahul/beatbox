import { useEffect, useRef } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import TrackPlayer from "react-native-track-player";

import TabNavitation from "./src/screens/TabNavitation";
import useSetupTrackPlayer from "./src/hooks/useSetupTrackPlayer";
import playbackService from "./src/lib/playback-service";
import PermissionRequired from "./src/components/reusable/permission-required";
import usePermission from "./src/hooks/usePermission";
import COLORS from "./src/constants/colors";
import usePlayerEvents from "./src/hooks/usePlayerEvents";

TrackPlayer.registerPlaybackService(() => playbackService);

function App(): React.JSX.Element {
  const isTrackPlayerInitialized = useRef(false);
  useSetupTrackPlayer({ isTrackPlayerInitialized });

  useEffect(() => {
    console.log("yes");
    setTimeout(() => {
      console.log("inside timeout");
    }, 4000);
  }, []);

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
