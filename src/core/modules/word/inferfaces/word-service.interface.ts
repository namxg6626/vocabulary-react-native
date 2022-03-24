import {BaseService} from '@core/base/base-service.interface';
import {IWord} from '@core/modules/word/inferfaces/word.interface';
import {WordDto} from '@core/modules/word/dtos/word.dto';
import {RxDocument} from 'rxdb';

export interface IWordService extends BaseService<IWord, WordDto> {
  getAllDocuments: () => Promise<RxDocument<IWord>[]>;
}
