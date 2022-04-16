import {ITagService} from '@core/modules/tag/interfaces/tag-service.interface';
import {TagRepository} from '@core/modules/tag/tag.repository';
import {ITagRepository} from '@core/modules/tag/interfaces/tag-repository.interface';
import {TagDto} from '@core/modules/tag/dtos/tag.dto';
import {WordDto} from '@core/modules/word/dtos/word.dto';
import {IWordService} from '@core/modules/word/inferfaces/word-service.interface';
import {WordService} from '@core/modules/word/word.service';

export class TagService implements ITagService {
  private tagRepository: ITagRepository;
  private wordService: IWordService;

  constructor(tagRepository?: ITagRepository, wordService?: IWordService) {
    this.tagRepository = tagRepository || new TagRepository();
    this.wordService = wordService || new WordService(undefined, this);
  }

  insert(dto: TagDto) {
    return this.tagRepository.insert(dto);
  }

  findById(rxId: string) {
    return this.tagRepository.findById(rxId);
  }

  updateById(rxId: string, dto: Partial<TagDto>) {
    return this.tagRepository.updateById(rxId, dto);
  }

  updateTagName(rxId: string, newTagName: string) {
    return this.tagRepository.atomicPatch(rxId, {name: newTagName});
  }

  deleteById(rxId: string) {
    return this.tagRepository.deleteById(rxId);
  }

  getAllDocuments = () => {
    return this.tagRepository.getAllDocuments();
  };

  addNewWordToTag = async (tagRxId: string, wordDto: WordDto) => {
    const tag = await this.tagRepository.findById(tagRxId);
    const newWord = await this.wordService.insert(wordDto);
    if (tag && newWord) {
      return this.tagRepository.addWordToTag(tag.rxId, newWord.rxId);
    }
    return tag;
  };

  addWordToTag(tagRxId: string, wordRxId: string) {
    return this.tagRepository.addWordToTag(tagRxId, wordRxId);
  }

  removeWordFromTag(tagRxId: string, wordRxId: string) {
    return this.tagRepository.removeWordFromTag(tagRxId, wordRxId);
  }

  async changeTagOfWord(tagRxId: string, wordRxId: string) {
    const word = await this.wordService.findById(wordRxId);
    if (word?.tagRxId) {
      await this.removeWordFromTag(word.tagRxId, wordRxId);
    }
    return await this.addWordToTag(tagRxId, wordRxId);
  }

  getWordsByTag(tagRxId: string) {
    return this.tagRepository.getWordsByTag(tagRxId);
  }
}
