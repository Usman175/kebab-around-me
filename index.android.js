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
import Compass from './compass';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Communications from 'react-native-communications';
import StarRating from 'react-native-star-rating';

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
    gold: '#FBB91A',
    silver: '#A0BBC5',
    bronze: '#EB8E5B'}

const entryBorderRadius = 5;

class Card extends Component {

  rad(x) {
    return x * Math.PI / 180;
  }

  getDistance(p1, p2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.rad(p2.latitude-p1.latitude);  // deg2rad below
    var dLon = this.rad(p2.longitude-p1.longitude);
    var lat1 = this.rad(p1.latitude);
    var lat2 = this.rad(p2.latitude);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    console.log(d);
    return Math.round(d*1000); // returns the distance in meter
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
          rating: 4,
          coordinate: {
          latitude: 24.7947253,
          longitude: 120.9932316,
          },
        },
        {
          key: 1,
          amount: 199,
          title: 'Master Tacos',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
          opening: 'closed',
          phone: '0975123456',
          rating: 3.5,
          illustration: 'https://s3-media1.fl.yelpcdn.com/ephoto/jvT42yLOqRnOndH1oOd6ug/o.jpg',
          coordinate: {
          latitude: 24.7890674,
          longitude: 120.99926340000002,
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
          rating: 4.5,
          coordinate: {
          latitude: 24.794252,
          longitude: 121.00048600000002,
          },
        },
      ]
    };
  }

  componentDidMount(){
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
      console.log("GPS: " + this.state.lastPosition);
    });
  }

  render(){
    const {rightActionActivated, leftActionActivated, toggle} = this.state;
    return (
      <Swipeable

          onRightActionActivate={() => this.setState({rightActionActivated: true})}
          onRightActionDeactivate={() => this.setState({rightActionActivated: false})}
          onRightActionComplete={() => this.setState({toggle: !toggle})}
          onRightActionRelease={() => Communications.web('geo:?q=' + this.state.markers[this.props.index].coordinate.latitude + ',' + this.state.markers[this.props.index].coordinate.longitude)}
          rightActionActivationDistance={100}

          rightContent={(
            <View style={[styles.rightSwipeItem, {backgroundColor: rightActionActivated ? '#4682b4' : '#fff'}]}>
              {rightActionActivated ?
                <Icon name="map" size={32} color="#fff" /> :
                <Icon name="map" size={32} color="#4682b4" />}
            </View>
          )}

          onLeftActionActivate={() => this.setState({leftActionActivated: true})}
          onLeftActionDeactivate={() => this.setState({leftActionActivated: false})}
          onLeftActionComplete={() => this.setState({toggle: !toggle})}
          onLeftActionRelease={() => Communications.phonecall(this.state.markers[this.props.index].phone,true)}
          rightLeftActivationDistance={100}

          leftContent={(
            <View style={[styles.leftSwipeItem, {backgroundColor: leftActionActivated ? '#78DCAA' : '#fff'}]}>
              {leftActionActivated ?
                <Icon name="phone" size={32} color="#fff" /> :
                <Icon name="phone" size={32} color="#78DCAA" />}
            </View>
          )}
    >

      <View style={[styles.listItem, {backgroundColor: this.props.color}]}>
      <Grid>
        <Row>
          <Col size={3}>
            <Text style={styles.listTitle}>{this.state.markers[this.props.index].title}</Text>
            <Text style={styles.compassText}>{this.getDistance(this.state.lastPosition,this.state.markers[this.props.index].coordinate)}m</Text>
          </Col>
          <Col size={1}>
            <View style={styles.compass}>
            <Compass
              fromLat={this.state.lastPosition.latitude}
              fromLon={this.state.lastPosition.longitude}
              toLat={this.state.markers[this.props.index].coordinate.latitude}
              toLon={this.state.markers[this.props.index].coordinate.longitude}
            />
            </View>
          </Col>
        </Row>
      <Row>
        <Col size={3}>
          <Text style={styles.listSubtitle}>{this.state.markers[this.props.index].opening.toUpperCase()}</Text>
        </Col>
        <Col size={1}>
          <View style={styles.rating}>
            <StarRating
              disabled={true}
              maxStars={5}
              starSize={16}
              starColor="#fff"
              emptyStarColor="#fff"
              rating={this.state.markers[this.props.index].rating}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
          </View>
        </Col>
      </Row>
    </Grid>
      </View>
    </Swipeable>
    );
  }
}

export default class KebabAroundMe extends Component {

  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    },1000);
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
