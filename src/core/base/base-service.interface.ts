import {RxDocumentPromise} from './base-repository.interface';

export interface BaseService<DocumentType = any, CommonDto = any> {
  initializeRepositoryCollection: () => Promise<void>;
  insert: (dto: CommonDto) => RxDocumentPromise<DocumentType>;
  findById: (rxid: string) => RxDocumentPromise<DocumentType>;
  updateById: (rxid: string, dto: CommonDto) => RxDocumentPromise<DocumentType>;
  deleteById: (rxid: string) => RxDocumentPromise<DocumentType>;
}
