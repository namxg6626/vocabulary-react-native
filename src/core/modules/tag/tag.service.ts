import {ITagService} from '@core/modules/tag/interfaces/tag-service.interface';
import {TagRepository} from '@core/modules/tag/tag.repository';
import {ITagRepository} from '@core/modules/tag/interfaces/tag-repository.interface';
import {TagDto} from '@core/modules/tag/dtos/tag.dto';

export class TagService implements ITagService {
  private tagRepository: ITagRepository;

  constructor(tagRepository?: ITagRepository) {
    this.tagRepository = tagRepository || new TagRepository();
  }

  initializeRepositoryCollection(): Promise<void> {
    return this.tagRepository.initializeCollection();
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

  deleteById(rxId: string) {
    return this.tagRepository.deleteById(rxId);
  }

  getAllDocuments = () => {
    return this.tagRepository.getAllDocuments();
  };
}
