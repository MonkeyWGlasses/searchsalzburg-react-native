'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Component,
  TouchableOpacity,
  Platform,
} = React;

var MapView = require('react-native-maps');
var NavigationButton = require('./navigationButton');

var styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    fontWeight: '500',
    fontSize: 14,
  },
  left: {
    marginRight: 7,
  }
});

class Map extends Component {

  constructor(props){
    super(props);
    this.state = {
      markers: [],
      data: this.props.parkingData,
      region: {
        longitude: 13.04,
        latitude: 47.79,
        longitudeDelta: 0.15,
        latitudeDelta: 0.15
      },
      followUserLocation:this.props.followUserLocation,
    };
    this.loadMarkers();
  }

  loadMarkers(){
    this.state.data.map(function(parkingLot) {
      this.state.markers.push({
        id: parkingLot.id,
        latlng: {
            latitude: parkingLot.geometry.coordinates[1],
            longitude: parkingLot.geometry.coordinates[0]
        },
        title: parkingLot.properties.ADRESSE,
        description: 'Anzahl: ' + parkingLot.properties.ANZAHL_PLAETZE,
      });
    }, this)

    if(this.state.data.length == 1){
      this.state.region = {
        longitude: this.state.markers[0].latlng.longitude,
        latitude: this.state.markers[0].latlng.latitude,
        longitudeDelta: 0.007,
        latitudeDelta: 0.007,
      }
    }
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
              coordinate={marker.latlng}>
              <MapView.Callout>
                <View style={styles.container}>
                  <View style={styles.left}>
                    <Text style={styles.title}>{marker.title}</Text>
                    <Text>{marker.description}</Text>
                  </View>
                  <View>
                    {(() => { if(Platform.OS === 'ios') {
                        return <NavigationButton coordinates={marker.latlng}/>
                        }
                    })()}
                  </View>
                </View>
              </MapView.Callout>
              </MapView.Marker>
          ))}
        </MapView>
      );
    }
  }

  module.exports = Map;
