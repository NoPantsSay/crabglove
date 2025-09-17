import SuperJSON from "superjson";
import type {
  PersistStorage,
  StateStorage,
  StorageValue,
} from "zustand/middleware";

export function createSuperJSONStorage<S>(
  getStorage: () => StateStorage,
): PersistStorage<S> | undefined {
  let storage: StateStorage | undefined;
  try {
    storage = getStorage();
  } catch {
    // prevent error if the storage is not defined (e.g. when server side rendering a page)
    return;
  }

  const persistStorage: PersistStorage<S> = {
    getItem: (name) => {
      console.log("getItem");
      const parse = (str: string | null): StorageValue<S> | null => {
        if (str === null) {
          return null;
        }
        return SuperJSON.parse(str);
      };

      const str = storage.getItem(name);
      if (str instanceof Promise) {
        return str.then(parse);
      }
      return parse(str);
    },
    setItem: (name, newValue) => {
      console.log("setItem");
      return storage.setItem(name, SuperJSON.stringify(newValue));
    },
    removeItem: (name) => {
      return storage.removeItem(name);
    },
  };

  return persistStorage;
}
