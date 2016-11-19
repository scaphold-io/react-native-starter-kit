import React, { Component } from 'react';
import {
  AsyncStorage,
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
  Linking,
  Navigator,
  NavigationBar,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import Relay, {
  DefaultNetworkLayer,
  RootContainer,
} from 'react-relay';
import config from '../config';
import App from './components/App/App';
import AppRoute from './routes/AppRoute';
import {appNavigatorRoute} from './navigator/navigatorRoutes';
import { ThemeProvider } from 'react-native-material-ui';
import Drawer from 'react-native-drawer';
import {List, ListItem, SocialIcon} from 'react-native-elements';

console.disableYellowBox = true;

const uiTheme = {
  palette: {
    primaryColor: '#fdb729',
    secondaryColor: '#008650',
  },
  toolbar: {
    container: {
      height: 50
    },
    titleText: {
      fontSize: 15,
    }
  },
};

var w = Dimensions.get('window').width;

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


export function renderRelayScene(route, navigator) {
  const { title, Component, queryConfig } = route;
  return (
    <Relay.RootContainer
      Component={Component}
      route={queryConfig}
      forceFetch={true}
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

  linkToBlog() {
    this._drawer.close.bind(this);
    Linking.openURL("https://www.cheddr.com").catch(err => console.error('An error occurred', err));
  }
  linkToFacebook() {
    this._drawer.close.bind(this);
    Linking.openURL("https://www.facebook.com/cheddr").catch(err => console.error('An error occurred', err));
  }
  linkToSlack(){
    this._drawer.close.bind(this);
    Linking.openURL("https://cheddr.slack.com").catch(err => console.error('An error occured', err));
  }
  linkToTwitter() {
    this._drawer.close.bind(this);
    Linking.openURL("https://www.twitter.com/cheddr").catch(err => console.error('An error occurred', err));
  }

  routeToCastingCalls() {
    this._drawer.close.bind(this);
  }
  routeToSubmissions() {
    this._drawer.close.bind(this);
  }
  routeToProfile() {
    this._drawer.close.bind(this);
  }

  render() {
    const list = [
      {
        name: 'Search Incentives',
        icon: 'search',
      },
      {
        name: 'Sales',
        icon: 'attach-money',
      },
      {
        name: 'Stats',
        icon: 'pie-chart',
      },
      {
        name: 'Settings',
        icon: 'settings',
      },
      {
        name: 'Sign Out',
        icon: 'account-circle',
      },

    ];
    const MenuComponent = (
      <View style={{flex: 1, backgroundColor: '#000', paddingTop: 0,}}>
        <Image source={require('./img/CheddrHeader.png')} resizeMode='cover' style={{width: w*.8, height: w*0.5}} />
         <List containerStyle={{marginBottom: 20, borderTopWidth: 0, borderBottomWidth: 0, backgroundColor: 'transparent'}}>
         {
           list.map((l, i) => (
             <ListItem
               leftIcon={{name: l.icon, color: '#fff'}}
               onPress={() => console.log('something')}
               key={i}
               hideChevron
               title={l.name}
               titleStyle={{marginLeft: 10, fontSize: 16, color: '#fff', fontWeight: '500'}}
               containerStyle={{padding: 30, borderTopColor: 'transparent', borderBottomColor: 'transparent', height: 55, justifyContent: 'center',  backgroundColor: 'transparent'}}
               onPress={l.onPress}
            />
           ))
         }
         </List>
         <Text onPress={this.linkToSlack} style={{fontSize: 14, flex: 0.25, marginLeft: 30, color: '#fdb729', fontWeight: '400', alignSelf: 'flex-start', textAlign: 'left',}}>Feedback</Text>
         <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
           <SocialIcon type='twitter' onPress={this.linkToTwitter}/>
           <SocialIcon type='facebook' onPress={this.linkToFacebook}/>
        </View>
       </View>
    );

    const initialRoute = appNavigatorRoute();
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Drawer
          type="overlay"
          ref={(ref) => this._drawer = ref}
          content={MenuComponent}
          tapToClose={true}
          openDrawerOffset={0.2} // 20% gap on the right side of drawer
          panCloseMask={0.2}
          closedDrawerOffset={-3}
          styles={drawerStyles}
          tweenHandler={(ratio) => ({
            main: { opacity:(5-ratio)/2 }
          })}
          >
          <Navigator
            initialRoute={initialRoute}
            forceFetch={true}
            ref={(navigator) => this.navigator = navigator}
            renderScene={renderRelayScene}
            configureScene={( route ) => {
              if ( route.sceneConfig ) {
                return route.sceneConfig;
              }
              return Platform.OS === 'ios' ? Navigator.SceneConfigs.PushFromRight : Navigator.SceneConfigs.FadeAndroid;
            }}
          />
        </Drawer>
      </ThemeProvider>
    );
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3, opacity: 1},

};

const styles = {
  navBar: {
    backgroundColor: 'transparent',
    elevation: 1,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10
  },
  navBarTitleText: {
    color: '#f93666',
    fontWeight: '300',
    marginVertical: 9
  },
  navBarLeftButton: {
    paddingLeft: 10,
    alignSelf: 'center',
    marginVertical: 1,
  },
  navBarLeftButtonRaised: {
    marginLeft: 10,
    marginTop: 0,
    width: 40,
    height: 40,
    borderRadius: 20
  },
  navBarRightButton: {
    paddingRight: 10,
    alignSelf: 'center',
    marginVertical: 1.5
  },
  navBarButtonText: {
    color: '#777'
  },
  logoTitle: {
    height: 30,
    widht: 30,
    alignSelf: 'center',
    marginVertical: -1.5
  }
};
