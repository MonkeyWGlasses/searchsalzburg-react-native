'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Component
} = React;

var MapView = require('react-native-maps');

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
        longitude: coordinates.latlng.longitude,
        latitude: coordinates.latlng.latitude + 0.001,
        longitudeDelta: 0.007,
        latitudeDelta: 0.007,
      };
    }
  }

  _extractCoordinates(parkingLot){
    return({
      id: parkingLot.id,
      latlng:
        {
          latitude: parkingLot.geometry.coordinates[1],
          longitude: parkingLot.geometry.coordinates[0],
        },
      title: parkingLot.properties.ADRESSE,
      description: 'Anzahl: ' + parkingLot.properties.ANZAHL_PLAETZE,
      })
    }

    render() {
      return (
        <MapView
          style={styles.map}
          region={this.state.region}
          showsUserLocation={true}
          followUserLocation={this.state.followUserLocation}>
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.id}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              />
          ))}
        </MapView>
      );
    }
  }

  module.exports = Map;
