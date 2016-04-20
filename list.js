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
  TouchableHighlight
} = React;

var detail = require('./detail');
var Distance = require('./distance');

var styles = StyleSheet.create({
  rowContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  left:{
    flex: 10,
  },
  right:{
    flex: 2,
    marginRight: 10,
  },
  arrow:{
    flex: 1,
    opacity: 0.2,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#CCCCCC',
    marginLeft: 8,
  },
  title: {
    fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 14,
  },
  subtitle: {
    fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 11,
    marginTop: 2,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
}, });


class List extends React.Component{

  constructor (props) {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      super(props);
      this.state = {
        dataSource: ds.cloneWithRows(this.props.parkingData),
      }
  }

  render() {
    return (
      <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderRow.bind(this)}
      renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
      />
    );
  }

  renderRow(rowData){
    return (
      <TouchableHighlight underlayColor='#D9D9D9' onPress={ () => this.props.onForward(rowData) }>
        <View style={styles.rowContainer}>
          <View style={styles.left}>
            <Text style={styles.title}>{rowData.properties.ADRESSE}</Text>
            <Text style={styles.subtitle}>Anzahl {rowData.properties.ANZAHL_PLAETZE}</Text>
          </View>
          <View style={styles.right}>
            <Distance position={rowData.geometry.coordinates}/>
          </View>
          <View style={styles.arrow}>
            <Image source={require('./images/ic_chevron_right.png')}/>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = List;
