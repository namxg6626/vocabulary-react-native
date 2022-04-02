import {BaseService} from '@core/base/base-service.interface';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';
import {TagDto} from '@core/modules/tag/dtos/tag.dto';
import {RxDocument} from 'rxdb';
import {RxDocumentPromise} from '@core/base/base-repository.interface';
import {WordDto} from '@core/modules/word/dtos/word.dto';

export interface ITagService extends BaseService<ITag, TagDto> {
  getAllDocuments: () => Promise<RxDocument<ITag>[] | null>;
  addNewWordToTag: (
    tagRxId: string,
    wordDto: WordDto,
  ) => RxDocumentPromise<ITag>;
}
