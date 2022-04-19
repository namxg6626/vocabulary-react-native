import {decode, encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

if (!global.__reanimatedWorkletInit) {
  global.__reanimatedWorkletInit = () => {};
}

// Avoid using node dependent modules
process.browser = true;
