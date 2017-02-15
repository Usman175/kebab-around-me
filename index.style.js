import { StyleSheet, Dimensions } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';

const { width, height } = Dimensions.get('window');

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    gold: '#FBB91A',
    silver: '#A0BBC5',
    bronze: '#EB8E5B',
    background1: '#d76736',
    background2: 'hsl(230, 30%, 45%)'
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
      height: ExtraDimensions.get('REAL_WINDOW_HEIGHT')*0.32,
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

    opening: {
      color: '#fff'
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
      backgroundColor: '#fff',
      margin: 10,
      borderRadius: 8,
      borderBottomColor: '#d76736',
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

    compassText: {
      color: "#fff",
      fontSize: 16
    },
    listTitle: {
      fontFamily: 'Helvetica',
      fontSize: 32,
      fontWeight: 'bold',
      color: '#fff'
    },
    rowBack: {
      backgroundColor: 'transparent'
    },
    listSubtitle: {
      fontSize: 16,
      color: "#fff",
      position: 'absolute',
      bottom: 0
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
        color: '#d76736',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        marginTop: 5,
        marginBottom: 15,
        backgroundColor: 'transparent',
        color: '#d76736',
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
