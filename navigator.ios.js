'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Component,
  NavigatorIOS
} = React;


var List = require('./list');
var Detail = require('./detail');

var styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
});

class Navigator extends React.Component {


  onForward(currentParkingSpace){
    this.refs['nav'].push({
      title: currentParkingSpace.properties.ADRESSE,
      component: Detail,
      passProps:{
        currentParkingSpace: currentParkingSpace,
      }
    })
  }


  render() {
    return (
      <NavigatorIOS
        ref="nav"
        style={styles.navigator}
        initialRoute={{
          title: 'List',
          component: List,
          passProps:{
            parkingData: this.props.parkingData,
            onForward: (currentParkingSpace) => { this.onForward(currentParkingSpace) },
          }
        }}
        />
    );
  }
}



module.exports = Navigator;
