import React from 'react';
import {FlatList, Platform} from 'react-native';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';
import {Screen, CustomButton, Empty} from '@components/index';
import {TagModal, TagFormValue} from './components/TagModal';
import {useSet} from '@hooks/index';
import _ from 'lodash';
import {TagItem} from '@screens/YourTags/components/TagItem';

enum ModalName {
  ADD_NEW_TAG,
  EDIT_TAG,
}

export type YourTagsScreenProps = {
  tags: ITag[];
  addTag: (tagName: string) => Promise<ITag | undefined>;
};

export const YourTagsScreen: React.FC<YourTagsScreenProps> = ({
  tags,
  addTag,
}) => {
  const [modalNames, modalNameActions] = useSet<ModalName>();

  const submitHandler = (value: TagFormValue) => {
    addTag(value.name).finally(() => {
      modalNameActions.clear();
    });
  };

  const TagsList = () => {
    return (
      <>
        {_.isEmpty(tags) ? (
          <Empty
            title={'There are no tags'}
            moreInfo={'Press the button below to create one'}
          />
        ) : (
          <FlatList
            removeClippedSubviews={Platform.OS === 'ios'}
            data={tags}
            renderItem={({item}) => <TagItem tag={item} />}
            keyExtractor={item => item.rxId}
          />
        )}
      </>
    );
  };

  return (
    <Screen headerContent={'Tags'}>
      <TagModal
        header={'New tag'}
        isOpen={modalNames.includes(ModalName.ADD_NEW_TAG)}
        onConfirm={submitHandler}
        onClose={modalNameActions.clear}
      />
      <TagsList />
      <CustomButton onPress={() => modalNameActions.add(ModalName.ADD_NEW_TAG)}>
        Add new tag
      </CustomButton>
    </Screen>
  );
};
