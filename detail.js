'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Component,
  NavigatorIOS,
  ListView,
  Image,
  MapView,
} = React;

var Map = require('./map');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  map: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  details: {
    flex: 1,
  },
  });

class Detail extends React.Component{

  render() {
    return (
      <View style={styles.container}>
        <Map parkingData={this.props.currentParkingSpace} followUserLocation={false}/>
        <View style={styles.details}><Text>Details</Text></View>
      </View>
    );
  }
}

module.exports = Detail;
