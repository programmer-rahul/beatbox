import { StoreApi, UseBoundStore } from "zustand";
import { shallow } from "zustand/shallow";

type GenericState = Record<string, any>;

export const createStoreWithShallow = <T extends GenericState>(
  createWithEqualityFn: UseBoundStore<StoreApi<T>>,
): (<K extends keyof T>(keys: K[]) => Pick<T, K>) => {
  const useStoreWithEqualityFn: <K extends keyof T>(keys: K[]) => Pick<T, K> = <
    K extends keyof T,
  >(
    keys: K[],
  ) => {
    return createWithEqualityFn((state) => {
      const x = keys.reduce((acc, cur) => {
        acc[cur] = state[cur];
        return acc;
      }, {} as T);

      return x as Pick<T, K>;
    }, shallow);
  };

  return useStoreWithEqualityFn;
};
