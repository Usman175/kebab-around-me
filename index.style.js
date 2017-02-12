import { StyleSheet } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: 'hsl(15, 55%, 50%)',
    background2: 'hsl(230, 30%, 45%)'
};

export default StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
      flex: 1
    },
    container: {
        backgroundColor: colors.background1,
        flex: 1,
        flexDirection: 'column'
    },
    colorsContainer: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row'
    },
    listContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 20
    },
    separator: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: '#FFFFFF',
    },
    carousel: {
      flex: 0
    },
    listTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#FFFFFF'
    },

    listSubtitle: {
      fontSize: 14,
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
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        marginTop: 5,
        marginBottom: 15,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
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
