import {extendTheme} from 'native-base';

const nativebaseConfig = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};
export const theme = extendTheme({config: nativebaseConfig});
