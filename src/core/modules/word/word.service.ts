import {WordDto} from './dtos/word.dto';
import {WordRepository} from './word.repository';
import {IWordService} from '@core/modules/word/inferfaces/word-service.interface';

export class WordService implements IWordService {
  private wordRepository: WordRepository;

  constructor(wordRepository?: WordRepository) {
    this.wordRepository = wordRepository || new WordRepository();
  }

  initializeRepositoryCollection = () => {
    return this.wordRepository.initializeCollection();
  };

  insert = (dto: WordDto) => {
    return this.wordRepository.insert(dto);
  };

  findById = (rxId: string) => {
    return this.wordRepository.findById(rxId);
  };

  updateById = (rxId: string, dto: WordDto) => {
    return this.wordRepository.updateById(rxId, dto);
  };

  deleteById = (rxId: string) => {
    return this.wordRepository.deleteById(rxId);
  };

  getAllDocuments = () => {
    return this.wordRepository.getAllDocuments();
  };
}
