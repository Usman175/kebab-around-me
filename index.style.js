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
  },
  cards: {
    height: (height-ExtraDimensions.get('STATUS_BAR_HEIGHT'))*0.3333,
    padding: 30
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },
  card : {
    width: 300,
    height: 180,
    backgroundColor: 'red',
    borderRadius: 8,
    marginVertical: 6,
    borderWidth: 0.5
  },
  backgroundImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  compass: {
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems: 'center'
  },
  rating: {
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 5
  },
  ratingText: {
    color: colors.gray
  },
  distance: {
    color: colors.gray,
    fontSize: 16
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white
  },
  schedule: {
    fontSize: 16,
    color: colors.gray,
    position: 'absolute',
    bottom: 0,
    fontFamily: "Roboto"
  },
  subtitle: {
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: 'transparent',
    color: colors.background2,
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center'
  }
});
