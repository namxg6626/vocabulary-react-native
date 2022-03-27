import {RxJsonSchema} from 'rxdb';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';

export const tagSchema: RxJsonSchema<ITag> = {
  version: 0,
  title: 'tagSchema',
  primaryKey: 'rxId',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    rxId: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    wordIds: {
      type: 'array',
      uniqueItems: true,
      ref: 'word',
      items: {
        type: 'string',
      },
    },
    createdAt: {
      type: 'string',
    },
    updatedAt: {
      type: 'string',
    },
  },
};
