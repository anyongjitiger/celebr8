function getFileName(path: string) {
  const arr = path.split('/');
  const fn = arr[arr.length - 1];
  console.log('fn', fn);
  return fn;
}
export { Keyboard, PermissionsAndroid } from 'react-native';
/* Form helpers */
export { getFileName };
export { default as validator } from 'validator';
export { default as SvgUri } from './svgUri';
export { default as AsyncStorage } from '@react-native-community/async-storage'
export { default as RNFetchBlob } from 'rn-fetch-blob';
