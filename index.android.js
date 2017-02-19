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
import Card from './card';
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
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
const colors = {
    gold: 'rgba(232,160,5,0.8)',
    silver: 'rgba(135,160,168,0.8)',
    bronze: 'rgba(188,107,76,0.8)'}

const entryBorderRadius = 5;

export default class KebabAroundMe extends Component {

  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    },1250);
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

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  fitAllMarkers() {
    this.map.fitToCoordinates([this.state.markers[0].coordinate, this.state.markers[1].coordinate, this.state.markers[2].coordinate], {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
    console.log("fitToCoordinates : " + this.state.markers[0].coordinate);
  }

  _centerMapOnMarker (markerIndex) {
    const mapRef = this.map;
    const markerData = this.state.markers[markerIndex];

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

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
        />
        <Card color={colors.gold} index="0" />
        <Card color={colors.silver} index="1" />
        <Card color={colors.bronze} index="2" />
      </View>
    );
  }
}

AppRegistry.registerComponent('KebabAroundMe', () => KebabAroundMe);
