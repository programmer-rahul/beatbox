import { TPermissionStore } from "@/types/store/permission-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const permissionStore = create<TPermissionStore>()(
  persist(
    (set) => ({
      isHavePermission: false,
      setIsHavePermission: (value) => set(() => ({ isHavePermission: value })),
    }),
    {
      name: "permission-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ isHavePermission }) => ({ isHavePermission }),
    }
  )
);

export default permissionStore;
