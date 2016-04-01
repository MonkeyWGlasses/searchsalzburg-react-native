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


var TableView = require('react-native-tableview');
var Section = TableView.Section;
var Item = TableView.Item;

var detail = require('./detail.ios');

var styles = StyleSheet.create({
  rowContainer: {
    height: 50,
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

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class List extends React.Component{

  constructor (props) {
      super(props);
      this.handleChangePage = this.handleChangePage.bind(this);
      this.renderRow = this.renderRow.bind(this);
      this.state = {
        dataSource: ds.cloneWithRows(this.props.parkingData),
        currentIndex: 0,
      }
  }

  handleChangePage(rowData) {
    this.props.toggleNavBar();
    this.props.navigator.push({
      title: rowData.properties.ADRESSE,
      component: detail,
      passProps:{
        toggleNavBar: this.props.toggleNavBar,
        currentParkingSpace: rowData,
      }
    })
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
      <TouchableHighlight underlayColor='#D9D9D9' onPress={ () => this.handleChangePage(rowData) }>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>{rowData.properties.ADRESSE}</Text>
          <Text style={styles.subtitle}>Anzahl {rowData.properties.ANZAHL_PLAETZE}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

// <ListView
// dataSource={this.state.dataSource}
// renderRow={this.renderRow}
// />
// <TableView style={{flex:1,paddingTop: 35}}
//                  allowsToggle={true}
//                  allowsMultipleSelection={true}
//                  tableViewStyle={TableView.Consts.Style.Grouped}
//                  tableViewCellStyle={TableView.Consts.CellStyle.Value1}
//                  onPress={this.handleChangePage.bind(this)}>
//           <Section arrow={true}>
//               <Item value="1" detail="Anzahl 3" >Item 1</Item>
//               <Item value="2" detail="Anzahl 2" >Item 3</Item>
//               <Item value="2" detail="Anzahl 2" >Item 2</Item>
//           </Section>
//       </TableView>


module.exports = List;
