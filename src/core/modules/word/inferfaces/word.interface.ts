import {BaseModel} from '@core/base/base-model.interface';

export interface IWord extends BaseModel {
  word: string;
  meaning: string;
  image?: any;
  tagRxId?: string;
}
