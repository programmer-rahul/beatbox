export interface TUiSlice {
  hasHydrated: boolean;
  setHasHydrated: () => void;
  isSwiping: boolean;
  setIsSwiping: (value: boolean) => void;

  bottomSheet: TBottomSheet;
  setBottomSheet: (bottomSheet: TBottomSheet) => void;
}

interface TBottomSheet {
  isVisible: boolean;
  sheet: null | "sleep-timer";
}
