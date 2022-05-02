import {AsyncStorageKeyEnum} from './async-storage.enum';
import {Nullable} from '@utils/types';

type NullableString = Nullable<string>;

export interface IAsyncStorageService {
  get: (key: AsyncStorageKeyEnum) => Promise<NullableString>;
  set: (key: AsyncStorageKeyEnum, value: string) => Promise<void>;
  trySetObject: <T = any>(key: AsyncStorageKeyEnum, value: T) => Promise<void>;
  tryGetObject: <T = any>(key: AsyncStorageKeyEnum) => Promise<Nullable<T>>;
}
