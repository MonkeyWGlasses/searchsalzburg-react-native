/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  TabBarIOS,
  Image,
} from 'react-native';

var Map = require('./map.ios');
var Navigator = require('./navigator.ios');
var Imprint = require('./imprint.ios');

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
            parkingData={this.state.data}
            selected={this.state.selectedTab === 'map'}
            icon={require('./images/852-map.png')}
            title="Map"
            onPress={() => {
                this.setState({
                    selectedTab: 'map',
                });
            }}>
            <Map parkingData={this.state.parkingData} />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            selected={this.state.selectedTab === 'list'}
            icon={require('./images/854-list.png')}
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
            icon={require('./images/724-info.png')}
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
