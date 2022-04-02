export class WordDto {
  image?: any;
  meaning!: string;
  word!: string;

  constructor(word: string, meaning: string, image?: any) {
    this.word = word;
    this.meaning = meaning;
    this.image = image;
  }
}
