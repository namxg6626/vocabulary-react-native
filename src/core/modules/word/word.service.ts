import {WordDto} from './dtos/word.dto';
import {WordRepository} from './word.repository';
import {IWordService} from '@core/modules/word/inferfaces/word-service.interface';
import {ITagService} from '@core/modules/tag/interfaces/tag-service.interface';
import {TagService} from '@core/modules/tag/tag.service';

export class WordService implements IWordService {
  private wordRepository: WordRepository;
  private tagService: ITagService;

  constructor(wordRepository?: WordRepository, tagService?: ITagService) {
    this.wordRepository = wordRepository || new WordRepository();
    this.tagService = tagService || new TagService(undefined, this);
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

  updateById = (rxId: string, dto: Partial<WordDto>) => {
    return this.wordRepository.updateById(rxId, dto);
  };

  deleteById = (rxId: string) => {
    return this.wordRepository.deleteById(rxId);
  };

  getAllDocuments = () => {
    return this.wordRepository.getAllDocuments();
  };
}
