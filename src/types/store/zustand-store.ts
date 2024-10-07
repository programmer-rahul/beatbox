import { TPermissionSlice } from "./slices/permission-slice";
import { TPlaylistSlice } from "./slices/playlist-slice";
import { TQueueSlice } from "./slices/queue-slice";
import { TSavedSlice } from "./slices/saved-slice";
import { TShuffleSlice } from "./slices/shuffle-slice";
import { TTrackSlice } from "./slices/track-slice";

export type TUseZustandStore = TPermissionSlice &
  TPlaylistSlice &
  TQueueSlice &
  TSavedSlice &
  TTrackSlice &
  TShuffleSlice;

export type SetStateType = (
  partial:
    | TUseZustandStore
    | Partial<TUseZustandStore>
    | ((
        state: TUseZustandStore,
      ) => TUseZustandStore | Partial<TUseZustandStore>),
  replace?: false,
) => void;
