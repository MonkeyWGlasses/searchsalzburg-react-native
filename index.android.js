/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native';

var data = require('./liste.json')
var Navigator = require('./navigator');


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex:1,
  }
});

class searchsalzburg_new extends Component {

  constructor (props) {
      super(props);
      this.state = {
        parkingData: data.features,
        currentView: "map",
      };
  }

  render() {
    return (
      <View style={styles.container} >
        <Navigator parkingData={this.state.parkingData}/>
      </View>
    );
  }


}
AppRegistry.registerComponent('searchsalzburg_new', () => searchsalzburg_new);
