import { useRef, useState } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TrackPlayer from "react-native-track-player";

import TabNavitation from "./src/screens/TabNavitation";
import useSetupTrackPlayer from "./src/hooks/useSetupTrackPlayer";
import playbackService from "./src/lib/playback-service";
import PermissionRequired from "./src/components/reusable/permission-required";
import usePermission from "./src/hooks/usePermission";
import usePlayerEvents from "./src/hooks/usePlayerEvents";
import { MenuProvider } from "react-native-popup-menu";
import LoadingScreen from "./src/components/reusable/loading-screen";

TrackPlayer.registerPlaybackService(() => playbackService);

function App(): React.JSX.Element {
  const isTrackPlayerInitialized = useRef(false);
  useSetupTrackPlayer({ isTrackPlayerInitialized });

  return (
    <MenuProvider>
      <RootNavigation />

      <StatusBar
        backgroundColor={"transparent"}
        barStyle={"light-content"}
        translucent={true}
      />
    </MenuProvider>
  );
}

export default App;

const RootNavigation = () => {
  const [appState, setAppState] = useState<{
    isLoading: boolean;
    screen?: undefined | "no-permissions";
  }>({
    isLoading: true,
    screen: undefined,
  });

  usePermission({ setAppState });
  usePlayerEvents();

  console.log("INSIDE ROOT_NAVIGATION", appState);

  return (
    <NavigationContainer>
      {appState.isLoading ? (
        <LoadingScreen />
      ) : appState.screen === "no-permissions" ? (
        <PermissionRequired />
      ) : (
        <TabNavitation />
      )}
    </NavigationContainer>
  );
};
