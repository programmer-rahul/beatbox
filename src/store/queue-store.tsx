import { createStoreWithShallow } from "./../lib/create-store-with-shallow";
import { TQueueStore } from "./../types/store/queue-store";
import { create } from "zustand";

const useQueueStore = create<TQueueStore>()((set) => ({
  currentQueue: {
    type: "home",
  },
  setCurrentQueue: (newQueue) => set(() => ({ currentQueue: newQueue })),
}));

export { useQueueStore as queueStore };
export default createStoreWithShallow(useQueueStore);
