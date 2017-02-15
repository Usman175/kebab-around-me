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
  Image,
  StatusBar,
  ListView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import SplashScreen from 'react-native-splash-screen'
import { Col, Row, Grid } from "react-native-easy-grid";
import Carousel from 'react-native-snap-carousel';
import SliderEntry from './SliderEntry';
import styles from './index.style';
import Compass from './Compass';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Communications from 'react-native-communications';

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
    black: '#1a1917',
    gray: '#888888',
    background1: 'hsl(15, 55%, 50%)',
    background2: 'hsl(230, 30%, 45%)'
};





const entryBorderRadius = 5;

export default class AwesomeProject extends Component {

  componentDidMount() {

    navigator.geolocation.getCurrentPosition( (position) => {
      var initialPosition = JSON.stringify(position);
      this.setState({initialPosition});
    }
    , (error) => console.log(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
    var lastPosition = JSON.stringify(position);
    this.setState({lastPosition: {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
    }});
    });

    setTimeout(() => {
      SplashScreen.hide();
    },2000);
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

  rad(x) {
    return x * Math.PI / 180;
  }

  getDistance(p1, p2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.rad(p2.latitude-p1.latitude);  // deg2rad below
    var dLon = this.rad(p2.longitude-p1.longitude);
    var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.rad(p1.latitude)) * Math.cos(this.rad(p2.latitude)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return Math.round(d); // returns the distance in meter
  }

  constructor(props) {
    super(props);

    this.state = {

      currentPosition: {lat: 0, lon: 0},
      rightActionActivated: false,
      toggle: false,
      lastPosition: {
        latitude: null,
        longitude: null
      },

      markers: [
        {
          key: 0,
          amount: 99,
          title: 'Mister Tacos',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
          opening: 'open',
          phone: '0975123456',
          illustration: 'http://www.petitpaume.com/sites/default/files/styles/page/public/visuel/mister.jpg',
          coordinate: {
          latitude: 23,
          longitude: 120.9935022,
          },
        },
        {
          key: 1,
          amount: 199,
          title: 'Master Tacos',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
          opening: 'close',
          phone: '0975123456',
          illustration: 'https://s3-media1.fl.yelpcdn.com/ephoto/jvT42yLOqRnOndH1oOd6ug/o.jpg',
          coordinate: {
          latitude: 24.7912387,
          longitude: 122,
          },
        },
        {
          key: 2,
          amount: 285,
          title: 'Hammamet',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
          opening: 'open',
          phone: '0975123456',
          illustration: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/56/c6/0c/restaurant-hamamet-tacos.jpg',
          coordinate: {
          latitude: 25,
          longitude: 120.9935022,
          },
        },
      ]
    };
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
    const {rightActionActivated, toggle} = this.state;
    const { region } = this.props;

    return (
      <View style={styles.container}>
        <Swipeable
        leftContent={(
          <View style={[styles.leftSwipeItem, {backgroundColor: 'lightskyblue'}]}>
            <Text>Pull action</Text>
          </View>
        )}
        rightButtons={[
          <TouchableOpacity style={[styles.rightSwipeItem, {backgroundColor: 'lightseagreen'}]}>
            <Text>1</Text>
          </TouchableOpacity>,
          <TouchableOpacity style={[styles.rightSwipeItem, {backgroundColor: 'orchid'}]}>
            <Text>2</Text>
          </TouchableOpacity>
        ]}
      >
        <View style={[styles.listItem, {backgroundColor: '#FBB91A'}]}>
          <Grid>
            <Row>
              <Col size={3}>
                <Text style={styles.listTitle}>{this.state.markers[0].title}</Text>
                <Text style={styles.compassText}>{this.getDistance(this.state.lastPosition,this.state.markers[0].coordinate)}m</Text>
              </Col>
              <Col size={1}>
                <View style={styles.compass}>
                <Compass
                  fromLat={this.state.lastPosition.latitude}
                  fromLon={this.state.lastPosition.longitude}
                  toLat={this.state.markers[0].coordinate.latitude}
                  toLon={this.state.markers[0].coordinate.longitude}
                />
                </View>
              </Col>
            </Row>
          <Row>
            <Col size={3}>
              <Text style={styles.listSubtitle}>{this.state.markers[0].opening.toUpperCase()}</Text>
            </Col>
            <Col size={1}>
            </Col>
          </Row>
        </Grid>
      </View>
    </Swipeable>

      <Swipeable
      leftContent={(
        <View style={[styles.leftSwipeItem, {backgroundColor: 'lightskyblue'}]}>
          <Text>Pull action</Text>
        </View>
      )}
      rightButtons={[
        <TouchableOpacity style={[styles.rightSwipeItem, {backgroundColor: 'lightseagreen'}]}>
          <Text>1</Text>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.rightSwipeItem, {backgroundColor: 'orchid'}]}>
          <Text>2</Text>
        </TouchableOpacity>
      ]}
    >
    <View style={[styles.listItem, {backgroundColor: '#A0BBC5'}]}>
      <Grid>
        <Row>
          <Col size={3}>
            <Text style={styles.listTitle}>{this.state.markers[1].title}</Text>
            <Text style={styles.compassText}>{this.getDistance(this.state.lastPosition,this.state.markers[1].coordinate)}m</Text>
          </Col>
          <Col size={1}>
            <View style={styles.compass}>
            <Compass
              fromLat={this.state.lastPosition.latitude}
              fromLon={this.state.lastPosition.longitude}
              toLat={this.state.markers[1].coordinate.latitude}
              toLon={this.state.markers[1].coordinate.longitude}
            />
            </View>
          </Col>
        </Row>
      <Row>
        <Col size={3}>
          <Text style={styles.listSubtitle}>{this.state.markers[1].opening.toUpperCase()}</Text>
        </Col>
        <Col size={1}>
        </Col>
      </Row>
    </Grid>
  </View>
    </Swipeable>

    <Swipeable

        onRightActionActivate={() => this.setState({rightActionActivated: true})}
        onRightActionDeactivate={() => this.setState({rightActionActivated: false})}
        onRightActionComplete={() => this.setState({toggle: !toggle})}
        onRightActionRelease={() => Communications.phonecall('0975422144', true)}
        rightActionActivationDistance={200}
        rightContent={(
          <View style={[styles.rightSwipeItem, {backgroundColor: rightActionActivated ? 'steelblue' : '#78DCAA'}]}>
            {rightActionActivated ?
              <Icon name="phone" size={32} color="#fff" /> :
              <Icon name="phone" size={32} color="#fff" />}
          </View>
        )}

    leftButtons={[
      <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: '#78DCAA'}]}>
      <Icon name="phone" size={32} color="#fff" />
      </TouchableOpacity>,
      <TouchableOpacity style={[styles.leftSwipeItem, {backgroundColor: '#D92531'}]}>
        <Icon name="heart" size={32} color="#fff" />
      </TouchableOpacity>
    ]}
  >

    <View style={[styles.listItem, {backgroundColor: '#EB8E5B'}]}>
    <Grid>
      <Row>
        <Col size={3}>
          <Text style={styles.listTitle}>{this.state.markers[2].title}</Text>
          <Text style={styles.compassText}>{this.getDistance(this.state.lastPosition,this.state.markers[1].coordinate)}m</Text>
        </Col>
        <Col size={1}>
          <View style={styles.compass}>
          <Compass
            fromLat={this.state.lastPosition.latitude}
            fromLon={this.state.lastPosition.longitude}
            toLat={this.state.markers[2].coordinate.latitude}
            toLon={this.state.markers[2].coordinate.longitude}
          />
          </View>
        </Col>
      </Row>
    <Row>
      <Col size={3}>
        <Text style={styles.listSubtitle}>{this.state.markers[2].opening.toUpperCase()}</Text>
      </Col>
      <Col size={1}>
      </Col>
    </Row>
  </Grid>
    </View>
  </Swipeable>
</View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
