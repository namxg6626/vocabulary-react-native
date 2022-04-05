import {BaseRepository} from '@core/base/base-repository.interface';
import {TagDto} from '@core/modules/tag/dtos/tag.dto';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';
import {RxDocument} from 'rxdb';
import {IWord} from '@core/modules/word/inferfaces/word.interface';

export interface ITagRepository extends BaseRepository<ITag, TagDto> {
  getAllDocuments: () => Promise<RxDocument<ITag>[] | null>;
  getWordsByTag: (tagRxId: string) => Promise<RxDocument<IWord>[]>;
}
