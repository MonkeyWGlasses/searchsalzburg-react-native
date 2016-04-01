'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Component,
  NavigatorIOS,
  ListView,
  Image
} = React;


var TableView = require('react-native-tableview');
var Section = TableView.Section;
var Item = TableView.Item;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  }, name: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
}, });

class Detail extends React.Component{


  handleChangePage() {
    this.props.toggleNavBar();
    this.props.navigator.push({
      title: "Detail",
      component: detail,
      passProps:{
        toggleNavBar: this.props.toggleNavBar,
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.currentParkingSpace.title}</Text>
      </View>
    );
  }
}

module.exports = Detail;
