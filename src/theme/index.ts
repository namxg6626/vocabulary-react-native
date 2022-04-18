import {extendTheme} from 'native-base';

const nativeBaseConfig = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};
export const theme = extendTheme({config: nativeBaseConfig});
