import React from 'react';
import Relay from 'react-relay';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking
} from 'react-native';
import Button from 'react-native-button';
import * as navigatorRoutes from './../../navigator/navigatorRoutes';
import Register from './Register';
import Login from './Login';

export default class About extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
    console.log("About.props");
    console.log(this.props);

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.section}>React-Native</Text>
        <Text style={styles.body}>This React-Native boilerplate helps developers create modern, performant, and clean web apps with the help of Scaphold.io.</Text>
        <Text style={styles.section}>React-Relay</Text>
        <Text style={styles.body}>Leverage the simplicity and power of Relay and GraphQL to manage your application's data store.</Text>
        <Text style={styles.section}>Scaphold.io</Text>
        <Text style={styles.body}>Get started with your GraphQL server by using Scaphold.io and integrate it seemlessly with this boilerplate.</Text>
      </ScrollView>
    );
  }
}

export default Relay.createContainer(About, {
  initialVariables: {
    // userID: null
  },
  fragments: {
    // user: (variables) => Relay.QL `
    //   fragment on UserQuerySet {
    //     get (id: $userID) {
    //       id,
    //       credentials {
    //         basic {
    //           email
    //         }
    //       },
    //       createdAt
    //     }
    //   }
    // `
  }
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? undefined : 60,
    paddingLeft: 20
  },
  section: {
    // alignSelf: 'center',
    color: 'black',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    fontSize: 30,
    fontWeight: 'bold',
  },
  body: {
    // alignSelf: 'center',
    fontSize: 20,
    fontWeight: '200',
    marginTop: 10,
    marginBottom: 40,
    marginLeft: 10,
    marginRight: 10
  },
  spacing: {
    padding: 30
  },
});
