import {rxDatabase} from '@core/database/rxdb';
import {BaseRepository} from '@core/base/base-repository.interface';
import {wordSchema} from './word.schema';
import {RxCollection} from 'rxdb';
import {IWord} from './word.interface';

const {word} = await rxDatabase.addCollections({
  word: {
    schema: wordSchema,
  },
});

export class WordRepository implements BaseRepository<IWord> {
  Word: RxCollection<IWord>;
  constructor(wordCollection: RxCollection<IWord>) {
    this.Word = wordCollection || word;
  }

  findById = async (id: string) => {
    return this.Word.findOne().where('id').eq(id).exec();
  };
}
