import { TQueueStore } from "@/types/store/queue-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useQueueStore = create<TQueueStore>()(
  persist(
    (set) => ({
      currentQueue: {
        type: "home",
      },
      setCurrentQueue: (newQueue) => set(() => ({ currentQueue: newQueue })),
    }),
    {
      name: "permission-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({}) => ({}),
    }
  )
);

export default useQueueStore;
