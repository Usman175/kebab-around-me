import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  View
} from 'react-native';
import styles from './styles.js';
import Compass from '../Compass';
import Swipeable from 'react-native-swipeable';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Communications from 'react-native-communications';
import StarRating from 'react-native-star-rating';
import { Col, Row, Grid } from "react-native-easy-grid";

export default class Card extends Component {

  //convert to radian
  rad(x) {
    return x * Math.PI / 180;
  }

  //distance between 2 points (longitude/latitude)
  getDistance(p1, p2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.rad(p2.latitude-p1.latitude);  // deg2rad below
    var dLon = this.rad(p2.longitude-p1.longitude);
    var lat1 = this.rad(p1.latitude);
    var lat2 = this.rad(p2.latitude);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    //console.log(d);
    return Math.round(d*1000); // returns the distance in meter
  }

  getShop() {
    fetch('http://e839e94a.ngrok.io/kam?long=4.897194099999979&lat=45.770803')
       .then(function(response) {
         //return response.json();
         console.log("fetch:")
         //console.log(response._bodyInit);
       })
       .catch((error) => {
         console.error(error);
    });

    return [
        {
          key: 0,
          amount: 99,
          title: 'Mister Tacos',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
          opening: 'open',
          phone: '0975189425',
          illustration: 'http://www.petitpaume.com/sites/default/files/styles/page/public/visuel/mister.jpg',
          rating: 4.5,
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
          opening: 'closing soon',
          phone: '0975189425',
          rating: 4,
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
          phone: '0975189425',
          illustration: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/56/c6/0c/restaurant-hamamet-tacos.jpg',
          rating: 4,
          coordinate: {
          latitude: 24.794252,
          longitude: 121.00048600000002,
          },
        },
      ];
     }

  constructor(props) {
    super(props);

    this.state = {
      currentPosition: {lat: 0, lon: 0},
      rightActionActivated: false,
      toggle: false,
      shops: [],
      lastPosition: {
        latitude: null,
        longitude: null
      },
      markers: this.getShop()
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
    });
  }

  render(){
    const {rightActionActivated, leftActionActivated, toggle} = this.state;
    //console.log("Shops:");
    console.log(this.state.markers.length);
    return (
      <Image
        style={{
          flex: 1,
          alignSelf: 'stretch',
          width: undefined,
          height: undefined
        }}
        //source={{uri: this.state.markers[this.props.index].icon}}
      >
        <Swipeable
          onRightActionActivate={() => this.setState({rightActionActivated: true})}
          onRightActionDeactivate={() => this.setState({rightActionActivated: false})}
          onRightActionComplete={() => this.setState({toggle: !toggle})}
          onRightActionRelease={() => Communications.web('geo:?q=' + this.state.markers[this.props.index].coordinate.latitude + ',' + this.state.markers[this.props.index].coordinate.longitude)}
          rightActionActivationDistance={100}

          rightContent={(
            <View style={[styles.rightSwipeItem, {backgroundColor: rightActionActivated ? '#CC4211' : '#CC4211'}]}>
              {rightActionActivated ?
                <Icon name="map" size={32} color="#fff" /> :
                <Icon name="map" size={32} color="#fff" />}
            </View>
          )}

          onLeftActionActivate={() => this.setState({leftActionActivated: true})}
          onLeftActionDeactivate={() => this.setState({leftActionActivated: false})}
          onLeftActionComplete={() => this.setState({toggle: !toggle})}
          onLeftActionRelease={() => Communications.phonecall(this.state.markers[this.props.index].phone,true)}
          rightLeftActivationDistance={100}

          leftContent={(
            <View style={[styles.leftSwipeItem, {backgroundColor: leftActionActivated ? '#A1C33B' : '#A1C33B'}]}>
              {leftActionActivated ?
                <Icon name="phone" size={32} color="#fff" /> :
                <Icon name="phone" size={32} color="#fff" />}
            </View>
          )}
        >
          <View style={[styles.cards, {backgroundColor: this.props.color}]}>
            <Grid>
              <Row>
                <Col size={3}>
                  <Text style={styles.title}>{this.state.markers[this.props.index].name}</Text>
                  <Text style={styles.distance}>{this.getDistance(this.state.lastPosition,this.state.markers[this.props.index].coordinate)}m</Text>
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
                <Text style={styles.schedule}>{this.state.markers[this.props.index].opening.toUpperCase()}</Text>
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
    </Image>
    );
  }
}
