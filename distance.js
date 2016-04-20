'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Component,
} = React;


var geolib = require('geolib');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#414141',
  },
  distance: {
    fontFamily: 'Helvetica',
    fontWeight: '100',
    color: 'orange',
    fontSize: 11,
    marginLeft: 8,
    marginTop: 2,
    textAlign: 'right',
  }
});

class Distance extends Component {

  constructor (props) {
      super(props);
      this.state = {
        targetPositon: {
          latitude: this.props.position[1],
          longitude: this.props.position[0],
        },
        distance: 0,
      }
  }

  componentDidMount() {
   navigator.geolocation.getCurrentPosition(
     (position) => {
       var initialPosition = position;
       var distance = geolib.getDistance(position.coords, this.state.targetPositon)
       this.setState({ distance: distance})
    },
     (error) => console.log(error.message),
     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
   );

   this.watchID = navigator.geolocation.watchPosition((position) => {
      var distance = geolib.getDistance(position.coords, this.state.targetPositon)
      this.setState({ distance: distance})
    });
  }

  render() {
    var distance = (this.state.distance/1000).toFixed(2);
    return (<Text style={styles.distance}>{distance} km</Text>);
  }
}

Distance.watchID = null


module.exports = Distance;
