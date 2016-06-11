import React from 'react';
import Relay from 'react-relay';
import { StyleSheet, View, Text } from 'react-native';

class HackerNewsItem extends React.Component {
  render() {
    let item = this.props.hnItem.node;
    let time = new Date(item.createdAt);
    time = time.toString();

    return (
      <View>
        <Text style={styles.index}>{this.props.num + 1}. {item.title}</Text>
        <Text>{item.score} points by {item.author.username}</Text>
        <Text>at {time}</Text>
      </View>
    );
  }
}

export default Relay.createContainer(HackerNewsItem, {
  fragments: {
  },
});

var styles = StyleSheet.create({
  index: {
    fontSize: 20,
    fontStyle: 'italic'
  }
});
