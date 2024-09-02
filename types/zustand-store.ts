import { TMusicFile } from "./music";

export type TZustandStore = {
  allMusicFiles: TMusicFile[];
  addMusicFiles: (files: TMusicFile[]) => void;

  isPermissionGranted: boolean;
  setIsPermissionGranted: (value: boolean) => void;

  currentMusic: TMusicFile | null;
  setCurrentMusic: (music: TMusicFile) => void;
  changeMusic: (currentMusicId: string,inc : number) => void;
};
