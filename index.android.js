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

import SplashScreen from 'react-native-splash-screen'
import Card from './card';
import styles from './index.style';

const { width, height } = Dimensions.get('window');

const colors = {
  gold: 'rgba(232,160,5,0.8)',
  silver: 'rgba(135,160,168,0.8)',
  bronze: 'rgba(188,107,76,0.8)'
}

export default class KebabAroundMe extends Component {

  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    },1250);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
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
