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
