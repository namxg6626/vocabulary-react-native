import React from 'react';
import {WordDetailController} from '@screens/WordDetail/WordDetailController';
import {
  WordDetailForm,
  WordDetailScreen,
} from '@screens/WordDetail/WordDetailScreen';
import {ManageWordsScreenProps} from '@navigation/ManageWordsStack';
import get from 'lodash/get';

export type EditWordControllerProps = ManageWordsScreenProps<'EditWord'>;

export class EditWordController extends WordDetailController {
  constructor(props: EditWordControllerProps) {
    super(props as any);
  }

  get navigation() {
    return this.props
      .navigation as unknown as EditWordControllerProps['navigation'];
  }

  afterUpdate() {
    const func = get(this.route, 'params.afterUpdate', () => null);
    if (typeof func === 'function') {
      func();
    }
  }

  handleSubmit = async (formValue: WordDetailForm) => {
    const initialValue = this.route.params?.initialValue;
    const wordRxId = initialValue?.rxId;
    if (wordRxId) {
      const result = await this.wordService.updateById(wordRxId, formValue);
      const hasResult = !!result;

      if (hasResult) {
        this.messageService.pushMessage({
          title: 'Updated!',
          status: 'success',
        });
        this.afterUpdate();
        this.navigation.navigate('YourWords');
      }

      return hasResult;
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
