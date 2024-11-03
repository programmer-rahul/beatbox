import { lazy, Suspense, useRef } from "react";
import { StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TrackPlayer from "react-native-track-player";
import { MenuProvider } from "react-native-popup-menu";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useSetupTrackPlayer from "./src/hooks/useSetupTrackPlayer";
import playbackService from "./src/lib/playback-service";
import PermissionRequired from "./src/components/reusable/permission-required";
import usePermission from "./src/hooks/usePermission";
import usePlayerEvents from "./src/hooks/usePlayerEvents";
import LoadingScreen from "./src/components/reusable/loading-screen";
import useZustandStore from "./src/store/useZustandStore";
import ShowBlurredImageBg from "./src/components/reusable/show-blurred-image-bg";
import COLORS from "./src/constants/colors";
import changeNavigationBarColor from "react-native-navigation-bar-color";

const TabNavitation = lazy(() => import("./src/screens/TabNavitation"));

TrackPlayer.registerPlaybackService(() => playbackService);

function App(): React.JSX.Element {
  const isTrackPlayerInitialized = useRef(false);
  useSetupTrackPlayer({ isTrackPlayerInitialized });

  const hasHydrated = useZustandStore((state) => state.hasHydrated);
  changeNavigationBarColor("transparent");

  return (
    <MenuProvider>
      <SafeAreaProvider
        className="flex-1"
        style={{ backgroundColor: COLORS.primaryBg }}
      >
        {hasHydrated ? <RootNavigation /> : <LoadingScreen />}

        <StatusBar
          backgroundColor={"transparent"}
          barStyle={"light-content"}
          translucent={true}
        />
      </SafeAreaProvider>
    </MenuProvider>
  );
}

export default App;

const RootNavigation = () => {
  const isHavePermission = useZustandStore((state) => state.isHavePermission);

  usePermission();
  usePlayerEvents();

  console.log("INSIDE ROOT_NAVIGATION", isHavePermission);

  return (
    <NavigationContainer>
      {isHavePermission ? (
        <>
          <Suspense fallback={<LoadingScreen />}>
            <TabNavitation />
            <View className="absolute -z-10 h-full w-full">
              <ShowBlurredImageBg />
            </View>
          </Suspense>
        </>
      ) : (
        <PermissionRequired />
      )}
    </NavigationContainer>
  );
};
