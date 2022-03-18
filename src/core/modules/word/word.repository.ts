import {RxCollectionBase, createRxCollection} from 'rxdb';
import {IWord} from './word.interface';

export const wordRepository = await createRxCollection({});
