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


// var TableView = require('react-native-tableview');
// var Section = TableView.Section;
// var Item = TableView.Item;
var detail = require('./detail');
var Distance = require('./distance');

var styles = StyleSheet.create({
  rowContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left:{
    flex: 2,
  },
  right:{
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 14,
    marginLeft: 8,
    marginTop: 10,
  },
  subtitle: {
    fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 11,
    marginLeft: 8,
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
      this.renderRow = this.renderRow.bind(this);
      this.state = {
        dataSource: ds.cloneWithRows(this.props.parkingData),
        currentIndex: 0,
        currentOS: this.props.currentOS,
      }
  }

  render() {
    return (
      <ListView
      dataSource={this.state.dataSource}
      renderRow={this.renderRow}
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
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = List;
