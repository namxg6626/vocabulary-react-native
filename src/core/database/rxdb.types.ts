import {RxCollection} from 'rxdb';
import {IWord} from '../modules/word/inferfaces/word.interface';

export type AppCollections = {
  word: RxCollection<IWord>;
};
