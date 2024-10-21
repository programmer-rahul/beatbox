import { SetStateType } from "../../types/store/zustand-store";
import { TPermissionSlice } from "../../types/store/slices/permission-slice";

const createPermissionSlice = (set: SetStateType): TPermissionSlice => ({
  isHavePermission: false,
  setIsHavePermission: (value) =>
    set(() => ({ isHavePermission: value, hasHydrated: true })),
});

export default createPermissionSlice;
