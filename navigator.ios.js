'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Component,
  NavigatorIOS
} = React;


var List = require('./list.ios');

var styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
  });

class Navigator extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
          navigationBarHidden: false,
        };
    }

    toggleNavBar() {
      this.setState({
        navigationBarHidden: !this.state.navigationBarHidden
      });
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
              toggleNavBar: this.toggleNavBar.bind(this),
              parkingData: this.props.parkingData,
            }
          }}
          />
      );
    }
  }

  module.exports = Navigator;
