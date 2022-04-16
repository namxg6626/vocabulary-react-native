import {getRxDatabaseInstance} from '@core/database/rxdb';
import {BaseRepository} from '@core/base/base-repository.interface';
import {RxCollection} from 'rxdb';
import {IWord} from './inferfaces/word.interface';
import {WordDto} from './dtos/word.dto';
import dayjs from 'dayjs';
import {v4 as uuid} from 'uuid';

export class WordRepository implements BaseRepository<IWord, WordDto> {
  constructor() {
    const rxDb = getRxDatabaseInstance();
    if (rxDb?.word) {
      this.Word = rxDb.word;
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

  findById = (rxId: string) => {
    return this.Word.findOne().where('rxId').eq(rxId).exec();
  };

  updateById = (rxId: string, dto: Partial<WordDto>) => {
    const query = this.Word.findOne().where('rxId').eq(rxId);
    return query.update({...dto, updatedAt: WordRepository.now.toISOString()});
  };

  async atomicPatch(rxId: string, dto: Partial<WordDto>) {
    const word = await this.Word.findOne().where('rxId').eq(rxId).exec();
    if (word) {
      return await word.atomicPatch(dto);
    }
    return null;
  }

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
