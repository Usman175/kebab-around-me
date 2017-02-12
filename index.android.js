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
import Carousel from 'react-native-snap-carousel';
import SliderEntry from './SliderEntry';
import styles from './index.style';

const { width, height } = Dimensions.get('window');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.4;
const slideWidth = wp(75);

export const sliderWidth = viewportWidth;
export const itemHorizontalMargin = wp(2);
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const ASPECT_RATIO = width / height;
const CENTER_LAT_OFFSET = 0;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const markers = [
  {
    key: 0,
    amount: 99,
    title: 'Mister Tacos',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'http://i.imgur.com/SsJmZ9jl.jpg',
    coordinate: {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    },
  },
  {
    key: 1,
    amount: 199,
    title: 'Master Tacos',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'http://i.imgur.com/5tj6S7Ol.jpg',
    coordinate: {
    latitude: LATITUDE + 0.004,
    longitude: LONGITUDE - 0.004,
    },
  },
  {
    key: 2,
    amount: 285,
    title: 'Hammamet',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat',
    illustration: 'http://i.imgur.com/pmSqIFZl.jpg',
    coordinate: {
    latitude: LATITUDE - 0.004,
    longitude: LONGITUDE - 0.004,
    },
  },
];

const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: 'hsl(15, 55%, 50%)',
    background2: 'hsl(230, 30%, 45%)'
};


const entryBorderRadius = 5;

export default class AwesomeProject extends Component {

  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    },1500);
  }

  getSlides (entries) {
      if (!entries) {
          return false;
      }

      return entries.map((entry, index) => {
          return (
              <SliderEntry
                key={`carousel-entry-${index}`}
                even={(index + 1) % 2 === 0}
                {...entry}
              />
          );
      });
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

  _centerMapOnMarker (markerIndex) {
    const mapRef = this.map;
    const markerData = markers[markerIndex];

    if (!markerData || !mapRef) {
        return;
    }
    mapRef.animateToRegion({
        latitude: markerData.coordinate.latitude,
        longitude: markerData.coordinate.longitude,
        latitudeDelta: 0.0315,
        longitudeDelta: 0.0258
    });
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
          ref={ref => { this.map = ref; }}
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
        <View>
          <Carousel
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            firstItem={1}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.6}
            enableMomentum={false}
            enableSnap={true}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContainer}
            showsHorizontalScrollIndicator={false}
            snapOnAndroid={true}
            removeClippedSubviews={false}
            style={styles.carousel}
            onSnapToItem={(index, markers) => this._centerMapOnMarker(index)}
          >
            { this.getSlides(markers) }
          </Carousel>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
