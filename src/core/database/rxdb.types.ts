import {RxCollection} from 'rxdb';
import {IWord} from '../modules/word/word.interface';

export type AppCollections = {
  word: RxCollection<IWord>;
};
