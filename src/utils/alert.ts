import {Alert} from 'react-native';

export const yesNoAlert = (
  title: string,
  message: string,
  onYes: () => void,
  onNo = () => {},
) => {
  Alert.alert(title, message, [
    {
      text: 'No',
      onPress: onNo,
    },
    {
      text: 'Sure',
      onPress: onYes,
    },
  ]);
};
