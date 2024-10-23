export interface TUiSlice {
  hasHydrated: boolean;
  setHasHydrated: () => void;
  isSwiping: boolean;
  setIsSwiping: (value: boolean) => void;
}
