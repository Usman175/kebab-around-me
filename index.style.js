import { StyleSheet, Dimensions } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';

const { width, height } = Dimensions.get('window');

export const colors = {
  black: '#333',
  white: '#fff',
  gray: '#fff',
  background1: '#fff',
  background2: '#d76736'
};

export default StyleSheet.create({
  container: {
    flex: 1
  }
});
