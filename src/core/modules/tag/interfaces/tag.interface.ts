import {BaseModel} from '@core/base/base-model.interface';

export interface ITag extends BaseModel {
  name: string;
  wordIds: string[];
}
