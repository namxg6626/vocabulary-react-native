import React, {useState} from 'react';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';
import {Screen, CustomButton} from '@components/index';
import {TagModal, TagFormValue} from './components/TagModal';
import {useSet} from '@hooks/index';
import {yesNoAlert} from '@utils/index';
import {TagsList} from './components/TagList';

enum ModalName {
  ADD_NEW_TAG,
  EDIT_TAG,
  DELETE_TAG,
}

export type YourTagsScreenProps = {
  tags: ITag[];
  addTag: (tagName: string) => Promise<ITag | undefined>;
  deleteTag: (tagRxId: string) => Promise<void>;
  updateTag: (tagRxId: string, newTagName: string) => Promise<void>;
};

export const YourTagsScreen: React.FC<YourTagsScreenProps> = ({
  tags,
  addTag,
  deleteTag,
  updateTag,
}) => {
  const [modalNames, modalNameActions] = useSet<ModalName>();
  const [tagToEdit, setTagToEdit] = useState<ITag>();

  const addTagSubmitHandler = (value: TagFormValue) => {
    addTag(value.name).finally(() => {
      modalNameActions.clear();
    });
  };

  const openEditModal = (tag: ITag) => {
    modalNameActions.add(ModalName.EDIT_TAG);
    setTagToEdit(tag);
  };
  const closeEditModal = () => {
    modalNameActions.clear();
    setTagToEdit(undefined);
  };
  const editTagSubmitHandler = (value: TagFormValue) => {
    if (tagToEdit) {
      updateTag(tagToEdit.rxId, value.name).then(() => {
        closeEditModal();
      });
    }
  };

  const handleDeleteTagPress = (tag: ITag) => {
    yesNoAlert(
      `Delete ${tag.name}`,
      'All words belong this tag will be untagged',
      () => deleteTag(tag.rxId),
    );
  };

  return (
    <Screen>
      <TagModal
        header={'New tag'}
        isOpen={modalNames.includes(ModalName.ADD_NEW_TAG)}
        onConfirm={addTagSubmitHandler}
        onClose={modalNameActions.clear}
      />
      <TagModal
        header={'Edit tag'}
        isOpen={modalNames.includes(ModalName.EDIT_TAG)}
        onConfirm={editTagSubmitHandler}
        onClose={closeEditModal}
        defaultValue={tagToEdit}
      />
      <TagsList
        tags={tags}
        onBackspacePress={handleDeleteTagPress}
        onPenPress={openEditModal}
      />
      <CustomButton onPress={() => modalNameActions.add(ModalName.ADD_NEW_TAG)}>
        Add new tag
      </CustomButton>
    </Screen>
  );
};
