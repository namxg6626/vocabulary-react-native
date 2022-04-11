import {RxCollection, RxDocument} from 'rxdb';

export type RxDocumentPromise<T = any> = Promise<RxDocument<T> | null>;

export interface BaseRepository<DocumentType = any, CommonDto = any> {
  getCollection: () => RxCollection<DocumentType> | null;
  initializeCollection: () => Promise<void>;
  insert: (dto: CommonDto) => RxDocumentPromise<DocumentType>;
  findById: (rxId: string) => RxDocumentPromise<DocumentType>;
  updateById: (
    rxId: string,
    dto: Partial<CommonDto>,
  ) => RxDocumentPromise<DocumentType>;
  atomicPatch: (
    rxId: string,
    dto: Partial<CommonDto>,
  ) => RxDocumentPromise<DocumentType>;
  deleteById: (rxId: string) => RxDocumentPromise<DocumentType>;
}
