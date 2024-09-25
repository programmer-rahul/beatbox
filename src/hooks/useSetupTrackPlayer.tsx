import { useEffect } from "react";
import TrackPlayer, { Capability } from "react-native-track-player";

const setupTrackPlayer = async () => {
  await TrackPlayer.setupPlayer();

  await TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
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
