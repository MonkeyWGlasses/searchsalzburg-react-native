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
    backgroundColor: '#FFFFFF',
  },
  map: {
    flex: 1.7
  },
  details: {
    flex: 1,
    margin: 15,
  },
  item: {
    flexDirection: 'row',
    marginTop: 5,
  },
  headline: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    color: 'orange',
    marginTop: 7,
  },
  leftValue: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Helvetica',
    fontWeight: '100',
  },
  rightValue: {
    flex: 1,
    textAlign: 'right',
    fontSize: 13,
    fontFamily: 'Helvetica',
    fontWeight: '100',
    color: '#383838',
  },

  });

class Detail extends React.Component{

  constructor (props) {
      super(props);
      this.state = {
        details: {},
      };
      this.parseHtmlDetails(this.props.currentParkingSpace.properties.ANMERKUNG_HTML)
  }

  parseHtmlDetails(string){
    var results = string.match(/<i>(.*?)(?:<\/i>)/g)

    var regEx = /(<i>|<\/i>)/g
    if(results != null && results.length == 5){
      this.state.details = {
        orientation: results[0].replace(regEx,''),
        width: results[1].replace(regEx,''),
        distance: results[3].replace(regEx,''),
        eurokey: results[4].replace(regEx,''),
        count: this.props.currentParkingSpace.properties.ANZAHL_PLAETZE,
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.map}>
          <Map parkingData={this.props.currentParkingSpace} followUserLocation={false}/>
        </View>
        <View style={styles.details}>
          <Text style={styles.headline}>ANZAHL</Text>
          <View style={styles.item}>
            <Text style={styles.leftValue}>{this.state.details.count}</Text>
          </View>
          <Text style={styles.headline}>NOTIZEN</Text>
          <View style={styles.item}>
            <Text style={styles.leftValue}>Lage</Text>
            <Text style={styles.rightValue}>{this.state.details.orientation}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.leftValue}>Breite</Text>
            <Text style={styles.rightValue}>{this.state.details.width}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.leftValue}>Entfernung</Text>
            <Text style={styles.rightValue}>{this.state.details.distance}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.leftValue}>Euroschlüssel</Text>
            <Text style={styles.rightValue}>{this.state.details.eurokey}</Text>
          </View>
        </View>
      </View>
    );
  }
}

module.exports = Detail;
