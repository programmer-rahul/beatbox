import { TPermissionSlice } from "./slices/permission-slice";
import { TPlayerOptionsSlice } from "./slices/player-options-slice";
import { TPlaylistSlice } from "./slices/playlist-slice";
import { TQueueSlice } from "./slices/queue-slice";
import { TSavedSlice } from "./slices/saved-slice";
import { TTrackSlice } from "./slices/track-slice";
import { TUiSlice } from "./slices/ui-slice";

export type TUseZustandStore = TUiSlice &
  TPermissionSlice &
  TPlaylistSlice &
  TQueueSlice &
  TSavedSlice &
  TTrackSlice &
  TPlayerOptionsSlice;

export type SetStateType = (
  partial:
    | TUseZustandStore
    | Partial<TUseZustandStore>
    | ((
        state: TUseZustandStore,
      ) => TUseZustandStore | Partial<TUseZustandStore>),
  replace?: false,
) => void;
