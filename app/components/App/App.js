import React from 'react';
import Relay from 'react-relay';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  Image
} from 'react-native';
import {Button} from 'react-native-elements';
import * as navigatorRoutes from './../../navigator/navigatorRoutes';
import Register from './Register';
import Login from './Login';

export class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showRegister: false
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
    Linking.openURL("https://cheddr.com").catch(err => console.error('An error occurred', err));
  }

  openSlack() {
    Linking.openURL("https://cheddr.slack.com/").catch(err => console.error('An error occurred', err));
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
        <Image source={require('../../img/Cheddr-BELOW-Green.png')} resizeMode="contain" style={{margin: 15, width: 125, alignSelf: 'center', height: 125}} />
        {registerOrLogin}
        <Button
          textStyle={styles.formSwitchButton}
          onPress={this._switchLoginOrRegister}
          title={switchText}
          backgroundColor='transparent'
        />
        <View style={styles.spacing}></View>

        <Button
          small
          onPress={this.openScaphold}
          title='Learn More!'
          backgroundColor='#fdb729'
        />
        <Button
        small
          onPress={this.openSlack}
          backgroundColor='#427abc'
          buttonStyle={{marginTop: 5}}
          title='Slack Community'
        />
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
    paddingTop: 15
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
