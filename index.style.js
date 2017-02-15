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
    map: {
      ...StyleSheet.absoluteFillObject,
      flex: 1
    },
    container: {
      flex: 1,
      //paddingTop: 20
    },
    listItem: {
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
    colorsContainer: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row'
    },
    listContainer: {
      backgroundColor: colors.background1,
      margin: 10,
      borderRadius: 8,
      borderBottomColor: colors.background2,
      borderBottomWidth: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    listPadding: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },

    carousel: {
      flex: 0
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
    },

    ratingText: {
      color: colors.gray
    },
    compassText: {
      color: colors.gray,
      fontSize: 16
    },
    listTitle: {
      fontFamily: 'Roboto',
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.white
    },
    rowBack: {
      backgroundColor: 'transparent'
    },
    listSubtitle: {
      fontSize: 16,
      color: colors.gray,
      position: 'absolute',
      bottom: 0,
      fontFamily: "Roboto"
    },

    color1: {
        flex: 1,
        backgroundColor: colors.background1
    },
    color2: {
        flex: 1,
        backgroundColor: colors.background2
    },
    scrollview: {
        flex: 1,
        paddingTop: 50
    },
    title: {
        marginTop: 15,
        backgroundColor: 'transparent',
        color: colors.background2,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        marginTop: 5,
        marginBottom: 15,
        backgroundColor: 'transparent',
        color: colors.background2,
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginBottom: 30
    },
    sliderContainer: {
    }
});
