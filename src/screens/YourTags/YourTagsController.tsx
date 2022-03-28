import React, {Component} from 'react';
import {InStackScreenProps} from '@navigation/navigation';
import {ITagService} from '@core/modules/tag/interfaces/tag-service.interface';
import {YourTagsScreen} from '@screens/YourTags/YourTagsScreen';
import {TagService} from '@core/modules/tag/tag.service';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';
import {TagDto} from '@core/modules/tag/dtos/tag.dto';

export type YourTagsControllerProps = InStackScreenProps<'YourTags'> & {
  tagService?: ITagService;
};

type YourTagsControllerState = {
  tags: ITag[];
};

export class YourTagsController extends Component<
  YourTagsControllerProps,
  YourTagsControllerState
> {
  tagService: ITagService;
  state = {
    tags: [],
  };

  constructor(props: YourTagsControllerProps) {
    super(props);
    this.tagService = props.tagService || new TagService();
  }

  async componentDidMount() {
    try {
      await this.tagService.initializeRepositoryCollection();
      await this.getAllTags();
    } catch (e) {
      throw e;
    }
  }

  getAllTags = async () => {
    const tags = await this.tagService.getAllDocuments();
    if (tags) {
      this.setState({
        tags: tags.map(tag => {
          const tagJson = tag.toJSON();
          return {
            ...tagJson,
            wordIds: Array.from(tag.wordIds),
          };
        }),
      });
    }
  };

  addTag = (tagName: string) => {
    const dto = new TagDto(tagName, []);
    return this.tagService.insert(dto);
  };

  render() {
    return <YourTagsScreen tags={this.state.tags} addTag={this.addTag} />;
  }
}
