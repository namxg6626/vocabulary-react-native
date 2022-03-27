import {RxDocumentPromise} from './base-repository.interface';

export interface BaseService<DocumentType = any, CommonDto = any> {
  initializeRepositoryCollection: () => Promise<void>;
  insert: (dto: CommonDto) => RxDocumentPromise<DocumentType>;
  findById: (rxId: string) => RxDocumentPromise<DocumentType>;
  updateById: (
    rxId: string,
    dto: Partial<CommonDto>,
  ) => RxDocumentPromise<DocumentType>;
  deleteById: (rxId: string) => RxDocumentPromise<DocumentType>;
}
