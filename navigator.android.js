'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Component,
  Navigator,
  ToolbarAndroid,
  DrawerLayoutAndroid,
  TouchableOpacity,
  TouchableHighlight,
  Image
} = React;


var List = require('./list');
var Detail = require('./detail');
var Map = require('./map')
var Imprint = require('./imprint');


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex:1,
  },
  toolbar: {
    backgroundColor: '#9E9E9E',
    height: 56,
  },
  drawerItem:{
    height: 48,
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  drawerLink:{
    marginLeft: 15,
    fontSize: 15,
    textAlign: 'left',
  },
  drawerHeader:{
    height: 120,
    padding: 15,
    backgroundColor: '#088cff',
  },
  drawerIcon:{
    textAlign: 'left',
    marginRight: 20,
  },
});


class NavigatorAndroid extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
        parkingData: this.props.parkingData,
        currentView: "list",
        title: "Listenansicht",
        navIcon: require('./images/menu.png'),
      };
  }


  render() {

    var navigationView = (
       <View style={{flex: 1, backgroundColor: '#fff'}}>
         <View style={styles.drawerHeader}>
           <Image source={require('./images/ic_accessible.png')}/>
           <Text>Behindertenparkplatzsuche Salzburg</Text>
         </View>
         <TouchableOpacity onPress={ () => this.handleNavigationClick({name: 'map', title: 'Kartenansicht', index: 0}) }>
           <View style={styles.drawerItem}>
             <Image source={require('./images/ic_map.png')}/>
             <Text style={styles.drawerLink}>
               Mapansicht
             </Text>
            </View>
          </TouchableOpacity>
         <TouchableOpacity onPress={ () => this.handleNavigationClick({name: 'list', title: 'Listenansicht', index: 0}) }>
           <View style={styles.drawerItem}>
             <Image source={require('./images/ic_list.png')}/>
             <Text style={styles.drawerLink}>
               Listenansicht
             </Text>
          </View>
        </TouchableOpacity>
         <TouchableOpacity onPress={ () => this.handleNavigationClick({name: 'imprint', title: 'Impressum', index: 0}) }>
           <View style={styles.drawerItem}>
             <Image source={require('./images/ic_info_outline.png')}/>
             <Text style={styles.drawerLink}>
               Impressum
             </Text>
           </View>
        </TouchableOpacity>
       </View>
     );


    return (
      <DrawerLayoutAndroid
         ref={'DRAWER'}
         drawerWidth={200}
         renderNavigationView={ () => navigationView }>
           <ToolbarAndroid
           style={styles.toolbar}
           navIcon={ this.state.navIcon}
           subtitle={this.state.title}
           onIconClicked={this.onActionSelected.bind(this)}/>
            <Navigator
              ref={'NAVIGATOR'}
              initialRoute={{name: 'list', index: 0}}
              renderScene={this.renderScene.bind(this)}/>
    </DrawerLayoutAndroid>
    );
  }

  renderScene (route, navigator) {
    switch (route.name) {
      case 'list':
        return (
          <List
            name={route.name}
            currentOS="android"
            parkingData={this.props.parkingData}
            onForward={(currentParkingSpace) => {
              this.setState({currentView: 'detail', title: currentParkingSpace.properties.ADRESSE, navIcon: require('./images/ic_arrow_back.png')})
              var nextIndex = route.index + 1;
              navigator.push({
                name: 'detail',
                index: nextIndex,
                currentParkingSpace: currentParkingSpace,
              });
            }}
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
            />
        )
      case 'detail':
        return <Detail currentParkingSpace={route.currentParkingSpace}/>
      case 'map':
        return  <Map parkingData={this.state.parkingData} followUserLocation={true}/>
      case 'imprint':
        return  <Imprint/>
    }
  }


 onActionSelected() {
   if(this.state.currentView == 'detail')
   {
     console.log('detail');
     this.setState({currentView: 'list', title: 'Listenansicht', navIcon: require('./images/menu.png')})
     this.refs['NAVIGATOR'].pop();
   } else {
     this.refs['DRAWER'].openDrawer();
   }
 }

 handleNavigationClick(route) {
   this.setState({currentView: route.name, title: route.title})
   this.refs['NAVIGATOR'].replace(route);
   this.refs['DRAWER'].closeDrawer();
 }

}

module.exports = NavigatorAndroid;
