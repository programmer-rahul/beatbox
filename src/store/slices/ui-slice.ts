import { SetStateType } from "../../types/store/zustand-store";
import { TUiSlice } from "../../types/store/slices/ui-slice";

const createUiSlice = (set: SetStateType): TUiSlice => ({
  isSwiping: false,
  setIsSwiping: (value) => set(() => ({ isSwiping: value })),
});

export default createUiSlice;
