/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  TabBarIOS,
} from 'react-native';

var Map = require('./map');
var Navigator = require('./navigator.ios');
var Imprint = require('./imprint');

var data = require('./liste.json')

class searchsalzburg_new extends Component {

  constructor (props) {
      super(props);
      this.state = {
        selectedTab: 'list',
        parkingData: data.features,
      };
  }

  render() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'map'}
            icon={require('./images/map.png')}
            title="Map"
            onPress={() => {
                this.setState({
                    selectedTab: 'map',
                });
            }}>
            <Map parkingData={this.state.parkingData} showUserLocation={true}/>
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'list'}
            icon={require('./images/list.png')}
            title="List"
            onPress={() => {
                  this.setState({
                      selectedTab: 'list',
                  });
            }}>
            <Navigator parkingData={this.state.parkingData} />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'imprint'}
            icon={require('./images/info.png')}
            title="Impressum"
            onPress={() => {
                  this.setState({
                      selectedTab: 'imprint',
                  });
            }}>
            <Imprint/>
          </TabBarIOS.Item>
        </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('searchsalzburg_new', () => searchsalzburg_new);
