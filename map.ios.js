'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Component
} = React;

var styles = StyleSheet.create({
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#123456',
  }
});

class Map extends Component {

  // _renderContent (color: string, pageText: string, num?: number) {
  //   return (
  //     <View style={[styles.tabContent, {backgroundColor: color}]}>
  //       <MapView
  //       style={styles.map}
  //       region={this.state.mapRegion}
  //       annotations={this.state.annotations}
  //     />
  //     </View>
  //   );
  // }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Insert Map-View here!
        </Text>
      </View>
    );
  }
}

module.exports = Map;
