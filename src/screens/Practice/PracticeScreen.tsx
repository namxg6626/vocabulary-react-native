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
import noop from 'lodash/noop';
import {Nullable} from '@utils/types';

const SPACING = widthPercentageToDP(3);

type NullableTag = Nullable<ITag>;

interface PracticeScreenProps {
  onFlashcardTagChange: (tag: NullableTag) => void;
  onCorrectAnswerTagChange: (tag: NullableTag) => void;
  tags: ITag[];
}

interface PracticeScreenState {
  isModalShown: boolean;
}

export class PracticeScreen extends React.Component<
  PracticeScreenProps,
  PracticeScreenState
> {
  state = {
    isModalShown: false,
  };

  openModal = () => {
    this.setState({isModalShown: true});
  };

  closeModal = () => {
    this.setState({isModalShown: false});
    this._handleTagPress = noop;
  };

  handleFlashcardPress = () => {
    this.openModal();
    this._handleTagPress = this.props.onFlashcardTagChange;
  };

  handleCorrectAnswerPress = () => {
    this.openModal();
    this._handleTagPress = this.props.onCorrectAnswerTagChange;
  };

  _handleTagPress: (tag: NullableTag) => void = noop;

  handleTagPress = (tag: NullableTag) => {
    this._handleTagPress(tag);
    this.closeModal();
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
                onPress={() => this.handleTagPress(null)}>
                <Text>All Words</Text>
              </TouchableHighlight>

              {this.props.tags.map(t => (
                <TouchableHighlight
                  key={t.rxId}
                  style={styles.touchableHighLight}
                  underlayColor={underlayColor}
                  onPress={() => this.handleTagPress(t)}>
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
            <PracticeItem
              onPress={this.handleCorrectAnswerPress}
              name={'Correct answer'}
              description={'Given meaning and select the correct \nanswer'}
              icon={
                <MaterialCommunityIcons
                  name={'note-text-outline'}
                  color={'white'}
                  size={24}
                />
              }
              colors={[Colors.parisGreen, Colors.limedSpruce]}
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
