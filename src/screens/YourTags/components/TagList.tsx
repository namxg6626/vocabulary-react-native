import _ from 'lodash';
import {Empty} from '@components/Empty';
import {FlatList, Platform} from 'react-native';
import {TagItem} from '@screens/YourTags/components/TagItem';
import React, {memo} from 'react';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';
import deepEqual from 'deep-equal';

type TagsListProps = {
  tags: ITag[];
  onPenPress: (item: ITag) => void;
  onBackspacePress: (item: ITag) => void;
};

export const TagsList = memo<TagsListProps>(
  function MemoTagsList({tags, onPenPress, onBackspacePress}) {
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
            renderItem={({item}) => (
              <TagItem
                onPenPress={() => onPenPress(item)}
                onBackspacePress={() => onBackspacePress(item)}
                tag={item}
              />
            )}
            keyExtractor={item => item.rxId}
          />
        )}
      </>
    );
  },
  (l, r) => {
    const mapTag = (item: ITag) => ({
      name: item.name,
      rxId: item.rxId,
    });
    return deepEqual(l.tags.map(mapTag), r.tags.map(mapTag));
  },
);
