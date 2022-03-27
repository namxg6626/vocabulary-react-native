import {RxCollection} from 'rxdb';
import {IWord} from '../modules/word/inferfaces/word.interface';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';

export type AppCollections = {
  word: RxCollection<IWord>;
  tag: RxCollection<ITag>;
};
