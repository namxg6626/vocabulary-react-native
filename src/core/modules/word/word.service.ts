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

  updateById = async (rxId: string, dto: Partial<WordDto>) => {
    const originalWord = await this.findById(rxId);
    if (originalWord && dto.tagRxId && originalWord?.tagRxId !== dto.tagRxId) {
      await this.tagService.removeWordFromTag(
        originalWord?.tagRxId || '',
        originalWord.rxId,
      );
      await this.tagService.addNewWordToTag(
        dto.tagRxId,
        originalWord.rxId || '',
      );
    }
    return await this.wordRepository.atomicPatch(rxId, dto);
  };

  deleteById = (rxId: string) => {
    return this.wordRepository.deleteById(rxId);
  };

  getAllDocuments = () => {
    return this.wordRepository.getAllDocuments();
  };
}
