import { TusePermissionStore } from "./../types/store/permission-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const usePermissionStore = create<TusePermissionStore>()(
  persist(
    (set) => ({
      isHavePermission: false,
      setIsHavePermission: (value) => set(() => ({ isHavePermission: value })),

      temp: [],
      setTemp: () => set((state) => ({ temp: [] })),
      temp2: "wrling",
      setTemp2: () => set((state) => ({ temp2: Math.random().toString() })),
    }),
    {
      name: "permission-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ isHavePermission }) => ({ isHavePermission }),
    },
  ),
);

export default usePermissionStore;
