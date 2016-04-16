'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Component,
  Linking,
  TouchableOpacity,
  Image,
  Platform
  } = React;


var styles = StyleSheet.create({
  iconIOS: {
    flex: 1 ,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 5,
    borderRadius: 7,
  },
  iconAndroid: {
    flex: 1 ,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 5,
    width: 38,
    borderRadius: 2,
    opacity: 0.8,
    elevation: 10,
  },
  navText:{
    fontSize: 14,
    fontFamily: 'Helvetica',
    fontWeight: '100',
    color: '#383838',
  }
});


class NavigationButton extends Component {

  handleClick() {
    var lat = this.props.coordinates.latitude
    var long = this.props.coordinates.longitude

    if(Platform.OS === 'ios'){
      var url = `http://maps.apple.com/maps?saddr=Current%20Location&daddr=${lat},${long}`
    } else {
      var url = `http://maps.google.com/maps?daddr=${lat},${long}`
    }

    Linking.canOpenURL(url).then(supported => {
     if (supported) {
       Linking.openURL(url);
     } else {
       console.log('Don\'t know how to open URI: ' + this.props.url);
     }
   });
  }

  render() {
    return (
      <TouchableOpacity onPress={this.handleClick.bind(this)}>
        <View style={(Platform.OS === 'ios') ? styles.iconIOS : styles.iconAndroid} elevation={1}>
            <Image source={require('./images/ic_navigation.png')}/>
        </View>
      </TouchableOpacity>
    );
  }
}

//
module.exports = NavigationButton;
