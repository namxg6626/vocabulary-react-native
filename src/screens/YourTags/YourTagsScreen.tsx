import React from 'react';
import {FlatList, Platform} from 'react-native';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';
import {
  Screen,
  CustomButton,
  CustomInput,
  KeyboardAvoidingView,
  Empty,
} from '@components/index';
import {TagModal} from './components/TagModal';
import {useSet} from '@hooks/index';
import _ from 'lodash';

enum ModalName {
  ADD_NEW_TAG,
  EDIT_TAG,
}

export type YourTagsScreenProps = {
  tags: ITag[];
  addTag: (tagName: string) => void;
};

export const YourTagsScreen: React.FC<YourTagsScreenProps> = ({tags}) => {
  const [modalNames, modalNameActions] = useSet<ModalName>();

  const submitHandler = (values: any) => {
    console.log(values);
  };

  const Body = () => {
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
            renderItem={({item}) => <CustomInput />}
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
      {modalNames.length ? (
        <Body />
      ) : (
        <KeyboardAvoidingView>
          <Body />
        </KeyboardAvoidingView>
      )}
      <CustomButton onPress={() => modalNameActions.add(ModalName.ADD_NEW_TAG)}>
        Add new tag
      </CustomButton>
    </Screen>
  );
};
