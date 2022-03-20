import {RxCollection, RxDocument} from 'rxdb';

export type RxDocumentPromise<T = any> = Promise<
  RxDocument<T> | null | undefined
>;

export interface BaseRepository<DocumentType = any, CommonDto = any> {
  getCollection: () => RxCollection<DocumentType> | null;
  initializeCollection: () => Promise<void>;
  insert: (dto: CommonDto) => RxDocumentPromise<DocumentType>;
  findById: (rxid: string) => RxDocumentPromise<DocumentType>;
  updateById: (rxid: string, dto: CommonDto) => RxDocumentPromise<DocumentType>;
  deleteById: (rxid: string) => RxDocumentPromise<DocumentType>;
}
