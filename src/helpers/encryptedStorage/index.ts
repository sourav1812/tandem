import {MMKV} from 'react-native-mmkv';

export const ENCRYPTION_KEY =
  'oxrbDkLgqUvSp9APFWDKYf0b132vfJJRaZhLc7da8UV4xAf6yDO';

export const storage = new MMKV({
  id: 'tandemapp',
  encryptionKey: ENCRYPTION_KEY,
});
const storeKey = (key: string, value: any) => {
  const valueToStore = JSON.stringify(value);
  storage.set(key, valueToStore);
};

const getValueFromKey = (key: string) => {
  const storedValue = storage.getString(key);
  if (storedValue) {
    return JSON.parse(storedValue);
  }
  return null;
};

const removeKey = (key: string) => {
  try {
    const doesKeyHaveValue = storage.getString(key);
    if (doesKeyHaveValue) {
      storage.delete(key);
    }
  } catch (error) {}
};

const clearStorage = () => {
  try {
    storage.clearAll();
  } catch (error) {}
};

export {storeKey, getValueFromKey, clearStorage, removeKey};
