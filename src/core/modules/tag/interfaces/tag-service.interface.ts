import {BaseService} from '@core/base/base-service.interface';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';
import {TagDto} from '@core/modules/tag/dtos/tag.dto';
import {RxDocument} from 'rxdb';

export interface ITagService extends BaseService<ITag, TagDto> {
  getAllDocuments: () => Promise<RxDocument<ITag>[] | null>;
}
