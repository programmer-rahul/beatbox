import { SetStateType } from "../../types/store/zustand-store";
import { TUiSlice } from "../../types/store/slices/ui-slice";

const createUiSlice = (set: SetStateType): TUiSlice => ({
  hasHydrated: false,
  setHasHydrated: () => set(() => ({ hasHydrated: true })),
  isSwiping: false,
  setIsSwiping: (value) => set(() => ({ isSwiping: value })),
});

export default createUiSlice;
