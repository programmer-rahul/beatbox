import { TPermissionStore } from "@/types/store/permission-store";
import { create } from "zustand";

const permissionStore = create<TPermissionStore>((set, get) => ({
  isHavePermission: false,
  setIsHavePermission: (value) => set(() => ({ isHavePermission: value })),
}));

export default permissionStore;
