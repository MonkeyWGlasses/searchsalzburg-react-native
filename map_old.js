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
  map: {
    flex: 1,
  }
});

class Map extends Component {

  constructor(props){
    super(props);
    this.state = {
      markers: [],
      data: this.props.parkingData,
      region: {},
      followUserLocation:this.props.followUserLocation,
    };
    this.loadMarkers();
  }

  loadMarkers(){
    debugger
    if(Array.isArray(this.state.data)) {
      this.state.data.map(function(parkingLot) {
        this.state.markers.push( this._extractCoordinates(parkingLot))
      }, this)
      this.state.region = {
        longitude: 13.04,
        latitude: 47.79,
        longitudeDelta: 0.15,
        latitudeDelta: 0.15,
      };
    } else {
      var coordinates = this._extractCoordinates(this.state.data);
      this.state.markers.push(coordinates)
      this.state.region = {
        longitude: coordinates.longitude,
        latitude: coordinates.latitude + 0.001,
        longitudeDelta: 0.007,
        latitudeDelta: 0.007,
      };
    }

  }


   _extractCoordinates(parkingLot){
    return({
      latitude: parkingLot.geometry.coordinates[1],
      longitude: parkingLot.geometry.coordinates[0],
      title: parkingLot.properties.ADRESSE,
      subtitle: 'Anzahl: ' + parkingLot.properties.ANZAHL_PLAETZE,
    })
  }

  render() {
    return (
      <MapView  style={styles.map}
            showsUserLocation={true}
            followUserLocation={this.state.followUserLocation}
            showsCompass={true}
            annotations={this.state.markers}
            region={this.state.region}
      />
    );
  }
}

module.exports = Map;
