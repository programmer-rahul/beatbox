export interface TusePermissionStore {
  isHavePermission: boolean;
  setIsHavePermission: (value: boolean) => void;
  temp: [];
  setTemp: () => void;
  setTemp2: () => void;
  temp2: string;
}
