import React from 'react';
import Relay from 'react-relay';
import { StyleSheet, ScrollView, ListView, View, Text, TouchableHighlight } from 'react-native';
import HackerNewsItem from './HackerNewsItem';

class HackerNewsItems extends React.Component {

  constructor(props, context) {
    super(props, context);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows(['row 1'])
    };
    this._pressRow = this._pressRow.bind(this);
  }

  _pressRow() {
    console.log("PRESSED!");
  }

  render() {
    console.log("HackerNewsItems.props");
    console.log(this.props);

    let items = this.props.allHackerNewsItems.edges.map(
      (hnItem, idx) => 
        <TouchableHighlight onPress={() => this._pressRow()}>
          <View style={styles.row}>
            <HackerNewsItem hnItem={hnItem} num={idx} key={idx} />
          </View>
        </TouchableHighlight>
    );
    
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={() => <View>{items}</View>}
      />
    );
  }
}

export default Relay.createContainer(HackerNewsItems, {
  fragments: {
  },
});

var styles = StyleSheet.create({
  row: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    borderColor: '#CCCCCC',
    borderWidth: 5,
    borderStyle: 'solid',
  },
});
