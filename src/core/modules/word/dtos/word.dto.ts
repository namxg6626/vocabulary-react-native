import {IWord} from '../inferfaces/word.interface';

export class WordDto implements IWord {
  id?: string;
  rxId?: string;
  image?: any;
  meaning!: string;
  word!: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(word: string, meaning: string, image?: any) {
    this.word = word;
    this.meaning = meaning;
    this.image = image;
  }
}
