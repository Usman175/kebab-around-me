/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import SplashScreen from 'react-native-splash-screen'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const markers = [
  {
    id: 0,
    amount: 99,
    coordinate: {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    },
  },
  {
    id: 1,
    amount: 199,
    coordinate: {
    latitude: LATITUDE + 0.004,
    longitude: LONGITUDE - 0.004,
    },
  },
  {
    id: 2,
    amount: 285,
    coordinate: {
    latitude: LATITUDE - 0.004,
    longitude: LONGITUDE - 0.004,
    },
  },
];
const styles = StyleSheet.create({
  container: {
   ...StyleSheet.absoluteFillObject,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

export default class AwesomeProject extends Component {

  componentDidMount() {
      SplashScreen.hide();
  }

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },

      markers: [{
        id: 0,
        amount: 99,
        coordinate: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        },
      },
      {
        id: 1,
        amount: 199,
        coordinate: {
        latitude: LATITUDE + 0.004,
        longitude: LONGITUDE - 0.004,
        },
      },
      {
        id: 2,
        amount: 285,
        coordinate: {
        latitude: LATITUDE - 0.004,
        longitude: LONGITUDE - 0.004,
        },
      }]
    };
  }

  render() {
    const { region } = this.props;
    console.log(region);
    return (
      <View style={styles.container}>
        <StatusBar
        backgroundColor="#d76736"
        barStyle="light-content"
        />
        <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    scrollEnabled={true}
                    zoomEnabled={true}
                    pitchEnabled={false}
                    rotateEnabled={false}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}
        >
          {this.state.markers.map(marker => (

              <MapView.Marker
              image={{uri: "kebab_pin" + marker.id}}
              coordinate={marker.coordinate}
              title="This is a title"
              description="This is a description"
              />
          ))}
        </MapView>
      </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
