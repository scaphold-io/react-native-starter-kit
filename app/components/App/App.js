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

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showRegister: true
    };
    this._switchLoginOrRegister = this._switchLoginOrRegister.bind(this);
    this.openAbout = this.openAbout.bind(this);
    this.openScaphold = this.openScaphold.bind(this);
    this.openSlack = this.openSlack.bind(this);
  }

  openAbout(event) {
    const newRoute = navigatorRoutes.aboutNavigatorRoute();
    this.props.navigator.push(newRoute);
  }

  _switchLoginOrRegister(event) {
    this.setState({showRegister: !this.state.showRegister});
  }

  openScaphold() {
    Linking.openURL("https://scaphold.io").catch(err => console.error('An error occurred', err));
  }

  openSlack() {
    Linking.openURL("https://scapholdslackin.herokuapp.com/").catch(err => console.error('An error occurred', err));
  }

  render() {
    var registerOrLogin;
    var switchText;
    if (this.state.showRegister) {
      registerOrLogin = <Register navigator={this.props.navigator} />;
      switchText = "Have an account already?";
    }
    else {
      registerOrLogin = <Login navigator={this.props.navigator} />;
      switchText = "Don't have an account yet?";
    }

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Welcome!</Text>
        <Text style={styles.subtitle}>Scaphold.io's React-Native Relay Template</Text>
        {registerOrLogin}
        <Button
          style={styles.formSwitchButton}
          styleDisabled={{color: 'red'}}
          onPress={this._switchLoginOrRegister}
        >
          {switchText}
        </Button>
        <View style={styles.spacing}></View>
        <Button
          style={styles.listItem}
          styleDisabled={{color: 'red'}}
          onPress={this.openAbout}
        >
          About
        </Button>
        <Button
          style={styles.listItem}
          styleDisabled={{color: 'red'}}
          onPress={this.openScaphold}
        >
          Learn More!
        </Button>
        <Button
          style={styles.listItem}
          styleDisabled={{color: 'red'}}
          onPress={this.openSlack}
        >
          Slack Community
        </Button>
      </ScrollView>
    );
  }
}

export default Relay.createContainer(App, {
  initialVariables: {
  },
  fragments: {
  }
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    paddingTop: Platform.OS === 'android' ? undefined : 60,
  },
  header: {
    alignSelf: 'center',
    color: 'black',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
    fontSize: 60,
    fontWeight: 'bold',
  },
  subtitle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '200',
    marginTop: 10,
    marginBottom: 40,
  },
  formSwitchButton: {
    fontSize: 12,
    color: 'rgba(37, 99, 171, 1)',
    marginBottom: 20
  },
  listItem: {
    fontSize: 20,
    color: 'rgba(37, 99, 171, 1)',
    marginBottom: 20
  },
  spacing: {
    padding: 30
  },
});
