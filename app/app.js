import React, { Component } from 'react';
import { 
  AsyncStorage,
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  NavigationBar,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import Relay, {
  DefaultNetworkLayer,
  RootContainer,
} from 'react-relay';
import config from '../config';
import App from './components/App/App';
import AppRoute from './routes/AppRoute';
import {appNavigatorRoute} from './navigator/navigatorRoutes';

export function setNetworkLayer() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("currentUser", (err, res) => {
      var store = JSON.parse(res);
      var options = {};
      if (store) {
        options.headers = {
          Authorization: 'Bearer ' + store.scapholdAuthToken
        }
      }
      else {
        options.headers = {};
      }
      Relay.injectNetworkLayer(
        new Relay.DefaultNetworkLayer(config.scapholdUrl, options)
      );
      resolve(options);
    });
  })
}

var NavigationBarRouteMapper = { 
  LeftButton: function( route, navigator, index, navState ){
    return(
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>{ route.leftButton }</Text>
      </TouchableOpacity>
    )
  },
  Title: function( route, navigator, index, navState ){
    return(
      <Text style={[styles.navBarText, styles.navBarTitleText]}>{ route.title }</Text>
    )
  },
  RightButton: function( route, navigator, index, navState ){
    return(
      <TouchableOpacity
        onPress={() => {
          AsyncStorage.removeItem("currentUser", (err, res) => {
            setNetworkLayer();
            navigator.pop();
          })
        }}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>{ route.rightButton }</Text>
      </TouchableOpacity>
    )
  }
}

export function renderRelayScene(route, navigator) {
  const { title, Component, queryConfig } = route;
  return (
    <Relay.RootContainer
      Component={Component}
      route={queryConfig}
      renderFetched={(data) => {
        return (
          <Component
            navigator={navigator}
            name={title}
            {...data}
          />
        );
      }}
    />
  );
}

export default class HackerNewsApp extends React.Component {

  componentWillMount() {
    var navigator = this.props.navigator;
  }

  componentDidMount() {
    setNetworkLayer();
  }

  render() {
    const initialRoute = appNavigatorRoute();
    return (
      <Navigator
        initialRoute={initialRoute}
        renderScene={renderRelayScene}
        configureScene={( route ) => {
          if ( route.sceneConfig ) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.navBar}
            routeMapper={ NavigationBarRouteMapper } 
          />
        } 
      />
    );
  }
}

const styles = {
  navBar: {
    backgroundColor: '#F5F5F5',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10
  },
  navBarTitleText: {
    color: 'black',
    fontWeight: '500',
    marginVertical: 9
  },
  navBarLeftButton: {
    paddingLeft: 10
  },
  navBarRightButton: {
    paddingRight: 10
  },
  navBarButtonText: {
    color: 'blue'
  }
};
