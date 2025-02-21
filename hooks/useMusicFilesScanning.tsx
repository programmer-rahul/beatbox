import { scanAndCacheMusicFiles } from "@/libs/music";
import useMusicStore from "@/store/useMusicStore";
import { useEffect, useState } from "react";

export function useMusicFilesScanning() {
  const localMusicFilesCount = useMusicStore(
    (state) => state.localMusicFilesCount,
  );
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    scanAndCacheMusicFiles().finally(() => {
      setIsScanning(false);
    });
  }, []);

  return { localMusicFilesCount, isScanning };
}
