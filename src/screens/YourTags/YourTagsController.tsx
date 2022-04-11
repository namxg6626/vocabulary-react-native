import React, {Component} from 'react';
import {MainStackScreenProps} from '@navigation/navigation';
import {ITagService} from '@core/modules/tag/interfaces/tag-service.interface';
import {YourTagsScreen} from '@screens/YourTags/YourTagsScreen';
import {TagService} from '@core/modules/tag/tag.service';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';
import {TagDto} from '@core/modules/tag/dtos/tag.dto';
import {IMessageService} from '@core/modules/message/message-service.interface';
import {MessageService} from '@core/modules/message/message.service';

export type YourTagsControllerProps = MainStackScreenProps<'YourTags'> & {
  tagService?: ITagService;
  messageService?: IMessageService;
};

type YourTagsControllerState = {
  tags: ITag[];
};

export class YourTagsController extends Component<
  YourTagsControllerProps,
  YourTagsControllerState
> {
  tagService: ITagService;
  messageService: IMessageService;
  state = {
    tags: [],
  };

  constructor(props: YourTagsControllerProps) {
    super(props);
    this.tagService = props.tagService || new TagService();
    this.messageService = props.messageService || new MessageService();
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

  addTag = async (tagName: string) => {
    const dto = new TagDto(tagName, []);
    const newTag = await this.tagService.insert(dto);
    const tagJson = newTag?.toJSON();
    if (tagJson) {
      this.messageService.pushMessage({
        status: 'success',
        title: 'New tag has been added',
      });
      await this.getAllTags();
      return {
        ...tagJson,
        wordIds: Array.from(tagJson?.wordIds || []),
      };
    }
    this.messageService.pushMessage({
      status: 'error',
      title: 'An error occurred while adding new tag',
    });
    return undefined;
  };

  deleteTag = async (tagId: string) => {
    await this.tagService.deleteById(tagId);
    await this.getAllTags();
    this.messageService.pushMessage({
      title: 'Tag is deleted',
      status: 'info',
    });
  };

  updateTagName = async (tagRxId: string, newName: string) => {
    await this.tagService.updateTagName(tagRxId, newName);
    await this.getAllTags();
    this.messageService.pushMessage({
      title: 'Tag is updated',
      status: 'success',
    });
  };

  render() {
    return (
      <YourTagsScreen
        tags={this.state.tags}
        addTag={this.addTag}
        deleteTag={this.deleteTag}
        updateTag={this.updateTagName}
      />
    );
  }
}
