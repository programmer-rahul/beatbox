interface TPermissionStore {
  isHavePermission: boolean;
  setIsHavePermission: (value: boolean) => void;
}

export { TPermissionStore };
