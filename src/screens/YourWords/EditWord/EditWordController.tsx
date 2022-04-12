import React from 'react';
import {WordDetailController} from '@screens/WordDetail/WordDetailController';
import {
  WordDetailForm,
  WordDetailScreen,
} from '@screens/WordDetail/WordDetailScreen';
import {ManageWordsScreenProps} from '@navigation/ManageWords';

export type EditWordControllerProps = ManageWordsScreenProps<'EditWord'>;

export class EditWordController extends WordDetailController {
  constructor(props: EditWordControllerProps) {
    super(props as any);
  }

  handleSubmit = async (formValue: WordDetailForm) => {
    const wordRxId = this.route.params?.initialValue?.rxId;
    if (wordRxId) {
      const result = await this.wordService.updateById(wordRxId, formValue);
      this.messageService.pushMessage({
        title: 'Test',
        description: formValue.word,
        status: 'success',
      });
      return !!result;
    }

    return false;
  };

  render() {
    return (
      <WordDetailScreen
        tags={this.state.tags}
        onSubmit={this.handleSubmit}
        actionLabel={this.route.params?.actionLabel}
        initialValue={this.route.params?.initialValue}
      />
    );
  }
}
