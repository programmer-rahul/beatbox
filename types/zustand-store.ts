import { TMusicFile } from "./music";
import { Audio } from "expo-av";

export type TZustandStore = {
  allMusicFiles: TMusicFile[];
  addMusicFiles: (files: TMusicFile[]) => void;

  isPermissionGranted: boolean;
  setIsPermissionGranted: (value: boolean) => void;

  currentMusic: TMusicFile | null;
  setCurrentMusic: (music: TMusicFile) => void;
  changeMusic: (
    currentMusicId: string,
    inc: number
  ) => { status: boolean; uri: string };

  isMusicPlaying: boolean;
  setIsMusicPlaying: (value: boolean) => void;

  musicTrack: null | Audio.Sound;
  clearMusicTrack: () => void;
  addMusicTrack: (track: Audio.Sound) => void;

  currentPosition: number;
  setCurrentPosition: (position: number) => void;

  savedMusicsList: { musicId: string }[];
  addMusicInSavedMusicList: (musicId: string) => void;
  removeMusicInSavedMusicList: (musicId: string) => void;
};
