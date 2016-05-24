import React from 'react';
import Relay from 'react-relay';
import { View, Text, StyleSheet, Platform } from 'react-native';
import HackerNewsItems from './HackerNewsItems';

export default class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.user}</Text>
        <Text style={styles.welcome}>Hi, {this.props.email}!</Text>
        <HackerNewsItems allHackerNewsItems={this.props.allHackerNewsItems.allHackerNewsItems} />
      </View>
    );
  }
}

export default Relay.createContainer(Home, {
  initialVariables: {
    orderBy: null
  },
  fragments: {
    allHackerNewsItems: (variables) => {
      return Relay.QL `
        fragment on Viewer {
          allHackerNewsItems (first: 10, orderBy: $orderBy) {
            edges {
              node {
                id,
                createdAt,
                modifiedAt,
                title,
                score,
                url,
                author {
                  id,
                  credentials {
                    basic {
                      email,
                      password
                    }
                  }
                }
              }
            }
          }
        }
      `
    },
  }
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? undefined : 60,
  },
  navBar: {
    backgroundColor: '#F5F5F5',
  },
  welcome: {
    fontSize:30,
    marginBottom:10,
    alignSelf: 'center'
  }
});
