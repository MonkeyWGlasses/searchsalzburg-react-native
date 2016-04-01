'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Component,
  MapView,
} = React;

var styles = StyleSheet.create({
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  map: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#123456',
  }
});
//            showsUserLocation={true}

class Map extends Component {

  constructor(props){
    super(props);
  }

  loadMarkers(){
    var markers = [];
    var data = this.props.parkingData;

    data.map(function(parkingLot) {
      markers.push(
        {
          latitude: parkingLot.geometry.coordinates[1],
          longitude: parkingLot.geometry.coordinates[0],
          title: parkingLot.properties.ADRESSE,
          subtitle: 'Anzahl: ' + parkingLot.properties.ANZAHL_PLAETZE,
        })
    });

    return markers
  }

  render() {
    return (
      <MapView  style={styles.map}
            showsUserLocation={true}
            followUserLocation={true}
            showsCompass={true}
            annotations={this.loadMarkers()}
      />
    );
  }
}

module.exports = Map;
