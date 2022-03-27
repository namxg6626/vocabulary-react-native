import {initRxDatabaseAsync} from '@core/database/rxdb';
import {BaseRepository} from '@core/base/base-repository.interface';
import {RxCollection} from 'rxdb';
import {IWord} from './inferfaces/word.interface';
import {WordDto} from './dtos/word.dto';
import dayjs from 'dayjs';
import _ from 'lodash';
import {v4 as uuid} from 'uuid';

export class WordRepository implements BaseRepository<IWord, WordDto> {
  constructor(wordCollection?: RxCollection<IWord>) {
    if (wordCollection) {
      this.Word = wordCollection;
    }
  }

  private static get now() {
    return dayjs();
  }

  private _Word: RxCollection<IWord> | null = null;

  private get Word() {
    if (this._Word) {
      return this._Word;
    }
    throw new Error('WordRepository; You need to initialize collection first');
  }

  private set Word(wordCollection: RxCollection<IWord>) {
    this._Word = wordCollection;
  }

  getCollection = () => this.Word;

  initializeCollection = async () => {
    if (_.isEmpty(this._Word)) {
      const rxDB = await initRxDatabaseAsync();
      this.Word = rxDB.word;
    }
  };

  findById = (rxId: string) => {
    return this.Word.findOne().where('rxId').eq(rxId).exec();
  };

  updateById = (rxId: string, dto: Partial<WordDto>) => {
    const query = this.Word.findOne().where('rxId').eq(rxId);
    return query.update({...dto, updatedAt: WordRepository.now.toISOString()});
  };

  insert = (dto: WordDto) => {
    return this.Word.insert({
      ...dto,
      rxId: uuid(),
      createdAt: WordRepository.now.toISOString(),
      updatedAt: WordRepository.now.toISOString(),
    });
  };

  deleteById = (rxId: string) => {
    const query = this.Word.findOne().where('rxId').eq(rxId);
    return query.remove();
  };

  getAllDocuments = () => {
    return this.Word.find().exec();
  };
}
