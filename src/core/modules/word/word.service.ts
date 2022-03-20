import {BaseService} from '@core/base/base-service.interface';
import {WordDto} from './dtos/word.dto';
import {IWord} from './inferfaces/word.interface';
import {WordRepository} from './word.repository';

export class WordService implements BaseService<IWord, WordDto> {
  private wordRepository: WordRepository;

  constructor(wordRepository?: WordRepository) {
    this.wordRepository = wordRepository || new WordRepository();
  }

  initializeRepositoryCollection = async () => {
    return await this.wordRepository.initializeCollection();
  };

  insert = (dto: WordDto) => {
    return this.wordRepository.insert(dto);
  };

  findById = (rxid: string) => {
    return this.wordRepository.findById(rxid);
  };

  updateById = (rxid: string, dto: WordDto) => {
    return this.wordRepository.updateById(rxid, dto);
  };

  deleteById = (rxid: string) => {
    return this.wordRepository.deleteById(rxid);
  };

  getAllDocuments = () => {
    return this.wordRepository.getAllDocuments();
  };
}
