import {RxSchema} from 'rxdb';
import {IWord} from './word.interface';

export const wordSchema = new RxSchema<IWord>({
  version: 0,
  title: 'wordSchema',
  primaryKey: 'rxid',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    rxid: {
      type: 'string',
    },
    image: {
      type: 'string',
    },
    meaning: {
      type: 'string',
    },
    word: {
      type: 'string',
    },
    updatedAt: {
      type: 'number',
    },
  },
  required: ['rxid', 'word', 'meaning'],
});
