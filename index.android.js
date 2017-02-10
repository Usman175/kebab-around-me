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
  ScrollView,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import SplashScreen from 'react-native-splash-screen'
import { Col, Row, Grid } from "react-native-easy-grid";

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const markers = [
  {
    key: 0,
    amount: 99,
    coordinate: {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    },
  },
  {
    key: 1,
    amount: 199,
    coordinate: {
    latitude: LATITUDE + 0.004,
    longitude: LONGITUDE - 0.004,
    },
  },
  {
    key: 2,
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
    setTimeout(() => {
      SplashScreen.hide();
    },1500);
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
        key: 0,
        amount: 99,
        coordinate: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        },
      },
      {
        key: 1,
        amount: 199,
        coordinate: {
        latitude: LATITUDE + 0.004,
        longitude: LONGITUDE - 0.004,
        },
      },
      {
        key: 2,
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
        <Grid>
          <StatusBar
          backgroundColor="#d76736"
          barStyle="light-content"
          />
          <Row size={4}>
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
                  key={marker.key}
                  image={{uri: "kebab_pin" + marker.key}}
                  coordinate={marker.coordinate}
                  title="This is a title"
                  description="This is a description"
                  />
              ))}
            </MapView>
          </Row>
          <Row size={1}>
            <ScrollView horizontal={true}>
              <Text style={{fontSize:80}}>TOUCHED LIKE NEVER CHANGE</Text>
            </ScrollView>
          </Row>
        </Grid>
      </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
