import {RxJsonSchema} from 'rxdb';
import {IWord} from './inferfaces/word.interface';

export const wordSchema: RxJsonSchema<IWord> = {
  version: 0,
  title: 'wordSchema',
  primaryKey: 'rxId',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    rxId: {
      type: 'string',
    },
    tagRxId: {
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
    createdAt: {
      type: 'string',
    },
    updatedAt: {
      type: 'string',
    },
  },
  required: ['rxId', 'word', 'meaning'],
};
