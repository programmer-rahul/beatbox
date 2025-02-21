import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TMusic } from "@/types/music";
import { TUserPlaylist } from "@/types/playlist";
import { TCustomBottomSheet } from "@/types/custom-bottom-sheet";
import _BackgroundTimer from "react-native-background-timer";
import TrackPlayer from "react-native-track-player";

interface TUseMusicStore {
  hasHydrated: boolean;
  localMusicFiles: TMusic[];
  localMusicFilesCount: null | number;

  favouriteLocalMusicFiles: string[];
  addMusicFileInFavouriteList: (id: string) => void;
  removeMusicFileInFavouriteList: (id: string) => void;

  // playlist
  userPlaylists: TUserPlaylist[];
  selectedUserPlaylist: null | string;
  addNewUserPlaylist: (name: string, musicFiles?: string[]) => boolean;
  removeUserPlaylist: (name: string) => void;
  renameUserPlaylist: (oldName: string, newName: string) => boolean;

  addMusicFileInUserPlaylist: (
    playlistName: string,
    musicFileId: string,
  ) => boolean;
  removeMusicFileInUserPlaylist: (
    playlistName: string,
    musicFileId: string,
  ) => void;

  // app states
  customBottomSheet: TCustomBottomSheet | null;
  openBottomSheet: (name: TCustomBottomSheet) => void;
  closeBottomSheet: () => void;

  // sleep timer state
  sleepTimerMinutes: number | null;
  sleepTimerStartTime: Date | null;
  sleepTimerTimeoutId: number | null;
  setSleepTimerTimeoutId: (sleepTimerTimeoutId: number) => void;
  setSleepTimer: (minutes: number) => void;
  clearSleepTimer: () => void;
}

const useMusicStore = create<TUseMusicStore>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      localMusicFiles: [],
      localMusicFilesCount: null,

      favouriteLocalMusicFiles: [],
      addMusicFileInFavouriteList: (id) =>
        set((state) => ({
          favouriteLocalMusicFiles: [...state.favouriteLocalMusicFiles, id],
        })),
      removeMusicFileInFavouriteList: (id) =>
        set((state) => ({
          favouriteLocalMusicFiles: [
            ...state.favouriteLocalMusicFiles.filter(
              (localMusicFile) => localMusicFile !== id,
            ),
          ],
        })),
      // playlists
      userPlaylists: [],
      selectedUserPlaylist: null,
      addNewUserPlaylist: (name, musicFiles = []) => {
        const state = get();
        // check if playlist already exists
        const playlistExists = state.userPlaylists.some(
          (playlist) => playlist.name === name,
        );
        if (playlistExists) {
          return false;
        }

        set((state) => ({
          userPlaylists: [...state.userPlaylists, { name, musicFiles }],
        }));

        return true;
      },
      removeUserPlaylist: (name) =>
        set((state) => ({
          userPlaylists: [
            ...state.userPlaylists.filter(
              (userPlaylist) => userPlaylist.name !== name,
            ),
          ],
        })),

      renameUserPlaylist: (oldName, newName) => {
        const state = get();
        const playlistIndex = state.userPlaylists.findIndex(
          (userPlaylist) => userPlaylist.name === oldName.trim(),
        );

        // check is playlist name is not same as the current one or does not exist
        const isPlaylistNameExists = state.userPlaylists.some(
          (userPlaylist) => userPlaylist.name === newName.trim(),
        );

        if (isPlaylistNameExists) {
          return false;
        }

        state.userPlaylists[playlistIndex].name = newName;

        set(() => ({
          userPlaylists: [...state.userPlaylists],
        }));

        return true;
      },

      addMusicFileInUserPlaylist: (playlistName, musicFileId) => {
        const state = get();
        // check if music files already exists in playlist
        const isMusicFileExists = state.userPlaylists.some((userPlaylist) => {
          if (userPlaylist.name === playlistName) {
            return userPlaylist.musicFiles.includes(musicFileId);
          }
          return false;
        });
        if (isMusicFileExists) return false;

        set((state) => ({
          userPlaylists: [
            ...state.userPlaylists.map((userPlaylist) => {
              if (userPlaylist.name === playlistName) {
                userPlaylist.musicFiles.push(musicFileId);
              }
              return userPlaylist;
            }),
          ],
        }));

        return true;
      },

      removeMusicFileInUserPlaylist: (playlistName, musicFileId) => {
        set((state) => ({
          userPlaylists: [
            ...state.userPlaylists.map((userPlaylist) => {
              if (userPlaylist.name === playlistName) {
                userPlaylist.musicFiles = userPlaylist.musicFiles.filter(
                  (id) => id !== musicFileId,
                );
              }
              return userPlaylist;
            }),
          ],
        }));

        return true;
      },

      // app states
      customBottomSheet: null,
      openBottomSheet: (name) => set(() => ({ customBottomSheet: name })),
      closeBottomSheet: () => set(() => ({ customBottomSheet: null })),

      // sleep timer state
      sleepTimerMinutes: null,
      sleepTimerStartTime: null,
      sleepTimerTimeoutId: null,
      setSleepTimerTimeoutId: (sleepTimerTimeoutId) =>
        set(() => ({ sleepTimerTimeoutId: sleepTimerTimeoutId })),

      setSleepTimer: (minutes) =>
        set((state) => {
          const sleepTimerTimeoutId = state.sleepTimerTimeoutId;
          sleepTimerTimeoutId &&
            _BackgroundTimer.clearTimeout(sleepTimerTimeoutId);

          const timeoutId = _BackgroundTimer.setTimeout(
            () => {
              console.log("TIMER COMPLETED");
              TrackPlayer.stop();
              state.clearSleepTimer();
            },
            minutes * 60 * 1000,
          );

          state.closeBottomSheet();

          return {
            sleepTimerMinutes: minutes,
            sleepTimerStartTime: new Date(),
            sleepTimerTimeoutId: timeoutId,
          };
        }),
      clearSleepTimer: () =>
        set((state) => {
          const sleepTimerTimeoutId = state.sleepTimerTimeoutId;
          sleepTimerTimeoutId &&
            _BackgroundTimer.clearTimeout(sleepTimerTimeoutId);

          return {
            sleepTimerMinutes: null,
            sleepTimerStartTime: null,
            sleepTimerTimeoutId: null,
          };
        }),
    }),
    {
      name: "music_store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({
        localMusicFilesCount,
        favouriteLocalMusicFiles,
        userPlaylists,
      }) => ({
        localMusicFilesCount,
        favouriteLocalMusicFiles,
        userPlaylists,
      }),
      onRehydrateStorage: (state) => {
        state.hasHydrated = true;
      },
    },
  ),
);

export default useMusicStore;
