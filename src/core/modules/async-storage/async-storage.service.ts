import {IAsyncStorageService} from './async-storage-service.interface';
import {AsyncStorageKeyEnum} from './async-storage.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Nullable} from '@utils/types';

export class AsyncStorageService implements IAsyncStorageService {
  get = (key: AsyncStorageKeyEnum) => {
    return AsyncStorage.getItem(key);
  };

  set = (key: AsyncStorageKeyEnum, value: string) => {
    return AsyncStorage.setItem(key, value);
  };

  trySetObject<T>(key: AsyncStorageKeyEnum, value: T): Promise<void> {
    const stringified = JSON.stringify(value);
    return AsyncStorage.setItem(key, stringified);
  }

  async tryGetObject<T>(key: AsyncStorageKeyEnum): Promise<Nullable<T>> {
    const stringified = await AsyncStorage.getItem(key);
    if (stringified) {
      return JSON.parse(stringified);
    }
    return null;
  }

  removeAll = async (): Promise<void> => {
    const allKeys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(allKeys);
  };
}
