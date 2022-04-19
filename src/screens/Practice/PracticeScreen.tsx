import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {VStack, Text} from 'native-base';
import {Screen, Modal} from '@components/index';
import {PracticeItem} from './components/PracticeItem';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors} from '@theme/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ITag} from '@core/modules/tag/interfaces/tag.interface';
import tinycolor from 'tinycolor2';
import {Subject} from 'rxjs';
import {first} from 'rxjs/operators';

const SPACING = widthPercentageToDP(3);

interface PracticeScreenProps {
  onFlashcardEmitTag: (tag: ITag | null) => void;
  tags: ITag[];
}

interface PracticeScreenState {
  isModalShown: boolean;
}

export class PracticeScreen extends React.Component<
  PracticeScreenProps,
  PracticeScreenState
> {
  tagRxId$ = new Subject<ITag | null>();

  state = {
    isModalShown: false,
  };

  componentWillUnmount() {
    this.tagRxId$.complete();
  }

  handleFlashcardPress = () => {
    this.setState({isModalShown: true});
    this.tagRxId$.pipe(first()).subscribe(tag => {
      this.props.onFlashcardEmitTag(tag);
      this.closeModal();
    });
  };

  closeModal = () => {
    this.setState({isModalShown: false});
  };

  render() {
    const underlayColor = tinycolor(Colors.textSecondary)
      .darken(10)
      .toRgbString();

    return (
      <>
        <Modal
          disableKeyboardAvoidingView
          contentProps={{
            minW: widthPercentageToDP(60),
          }}
          onRequestClose={this.closeModal}
          isOpen={this.state.isModalShown}
          header={'Select tag to practice'}
          body={
            <VStack space={SPACING}>
              <TouchableHighlight
                style={styles.touchableHighLight}
                underlayColor={underlayColor}
                onPress={() => this.tagRxId$.next(null)}>
                <Text>All Words</Text>
              </TouchableHighlight>

              {this.props.tags.map(t => (
                <TouchableHighlight
                  key={t.rxId}
                  style={styles.touchableHighLight}
                  underlayColor={underlayColor}
                  onPress={() => this.tagRxId$.next(t)}>
                  <Text>{t.name}</Text>
                </TouchableHighlight>
              ))}
            </VStack>
          }
        />
        <Screen>
          <VStack space={SPACING}>
            <PracticeItem
              onPress={this.handleFlashcardPress}
              name={'Flashcard'}
              description={'Let you review and memorize your words'}
              icon={
                <MaterialCommunityIcons
                  name={'note-text-outline'}
                  color={'white'}
                  size={24}
                />
              }
              colors={[Colors.beanRed, Colors.lightningYellow]}
            />
          </VStack>
        </Screen>
      </>
    );
  }
}

const styles = StyleSheet.create({
  touchableHighLight: {
    borderRadius: widthPercentageToDP(1),
    padding: widthPercentageToDP(2),
  },
});
