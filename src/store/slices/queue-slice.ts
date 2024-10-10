import { SetStateType } from "../../types/store/zustand-store";
import { TQueueSlice } from "../../types/store/slices/queue-slice";

const createQueueSlice = (set: SetStateType): TQueueSlice => ({
  currentQueue: {
    type: "home",
  },
  setCurrentQueue: (newQueue) => set((state) => ({ currentQueue: newQueue })),
});

export default createQueueSlice;
