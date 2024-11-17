import { useEffect } from "react";
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from "react-native-track-player";

const setupTrackPlayer = async () => {
  await TrackPlayer.setupPlayer({});
  await TrackPlayer.updateOptions({
    android: {
      appKilledPlaybackBehavior:
        AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
    },
  });
  await TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
    ],
    compactCapabilities: [Capability.Play, Capability.Pause],
  });
};

const useSetupTrackPlayer = ({
  isTrackPlayerInitialized,
}: {
  isTrackPlayerInitialized: React.MutableRefObject<boolean>;
}) => {
  useEffect(() => {
    if (isTrackPlayerInitialized.current) return;

    setupTrackPlayer()
      .then(() => {
        isTrackPlayerInitialized.current = true;
      })
      .catch(() => {
        isTrackPlayerInitialized.current = false;
        return null;
      });
  }, []);
};

export default useSetupTrackPlayer;
