'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Component,
  MapView,
  Linking,
  TouchableNativeFeedback,
  TouchableHighlight
} = React;

var NavigationButton = require('./navigationButton');

var styles = StyleSheet.create({
  headline: {
    fontSize: 35,
    textAlign: 'center',
  },
  subline: {
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
  },
  info: {
    marginTop: 7,
    fontSize: 15,
    textAlign: 'center',
  },
  email: {
    marginTop: 3,
    fontSize: 11,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 5,
  },
  map: {
    flex: 1,
    alignSelf: 'stretch',
  }
});

class Imprint extends Component {

  render() {
    return (
       <View style={styles.container}>
         <Text style={styles.headline}>Impressum</Text>
         <Text style={styles.subline}>Diese App wurde im Rahmen des Praktischen Teils der Bachelorarbeit 2 an der Fachhochschule Salzburg erstellt.</Text>
         <Text style={styles.info}>Datenquelle: Open-Data Portal data.gv.at</Text>
         <Text style={styles.info}>Simon Hintersonnleitner</Text>
         <Text style={styles.email}>shintersonnleitner.mmt-b2013@fh-salzburg.ac.at</Text>
       </View>

    );
  }
}


module.exports = Imprint;
