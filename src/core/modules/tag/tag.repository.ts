import {ITagRepository} from '@core/modules/tag/interfaces/tag-repository.interface';
import {initRxDatabaseAsync} from '@core/database/rxdb';
import {RxCollection, RxDocument} from 'rxdb';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';
import _ from 'lodash';
import {TagDto} from '@core/modules/tag/dtos/tag.dto';
import {v4 as uuid} from 'uuid';
import dayjs from 'dayjs';
import {IWord} from '@core/modules/word/inferfaces/word.interface';

export class TagRepository implements ITagRepository {
  private get Tag(): RxCollection<ITag> {
    if (!this._Tag) {
      throw new Error('TagRepository; You need to initialize collection fist');
    }
    return this._Tag;
  }

  private set Tag(value: RxCollection<ITag>) {
    this._Tag = value;
  }

  private _Tag: RxCollection<ITag> | null = null;

  initializeCollection = async () => {
    try {
      if (_.isEmpty(this._Tag)) {
        const rxDB = await initRxDatabaseAsync();
        this.Tag = rxDB.tag;
      }
    } catch (e) {
      throw e;
    }
  };

  getCollection = () => this.Tag;

  insert = (dto: TagDto) => {
    const now = dayjs();
    return this.Tag.insert({
      ...dto,
      rxId: uuid(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    });
  };

  findById = (rxId: string) => {
    return this.Tag.findOne().where('rxId').eq(rxId).exec();
  };

  updateById = (rxId: string, dto: Partial<TagDto>) => {
    const now = dayjs();
    const query = this.Tag.findOne().where('rxId').eq(rxId);
    return query.update({...dto, updatedAt: now.toISOString()});
  };

  async atomicPatch(rxId: string, dto: Partial<TagDto>) {
    const document = await this.Tag.findOne().where('rxId').eq(rxId).exec();
    if (document) {
      return await document.atomicPatch(dto);
    }
    return null;
  }

  deleteById = (rxId: string) => {
    const query = this.Tag.findOne().where('rxId').eq(rxId);
    return query.remove();
  };

  getAllDocuments = () => {
    return this.Tag.find().exec();
  };

  getWordsByTag = async (tagRxId: string) => {
    const tag = await this.Tag.findOne().where('rxId').eq(tagRxId).exec();
    const words: RxDocument<IWord>[] = await tag?.populate('wordIds');
    if (_.isEmpty(words)) {
      return [];
    }
    return words;
  };
}
