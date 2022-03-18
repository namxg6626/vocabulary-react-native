import {RxDocument} from 'rxdb';

export interface BaseRepository<T = any> {
  findById: (id: string) => Promise<RxDocument<T>>;
}
