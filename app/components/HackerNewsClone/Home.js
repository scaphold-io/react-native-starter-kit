import React from 'react';
import Relay from 'react-relay';
import { TouchableOpacity, ScrollView, View, Text, StyleSheet, Platform, RefreshControl } from 'react-native';
import {Card, List, ListItem} from 'react-native-elements';
import {Toolbar} from 'react-native-material-ui';
import moment from 'moment';
import * as navigatorRoutes from './../../navigator/navigatorRoutes';


export class Home extends React.Component {
  constructor(props, context) {
    super(props, context)
      this.state = {
        refreshing: false,
      };

    this._onRefresh = this._onRefresh.bind(this);
  }

  routeToIncentive(perke) {
    const perkeId = perke.id;
    const newRoute = navigatorRoutes.incentiveNavigatorRoute(perkeId);
    this.props.navigator.push(newRoute);
  }

  _onRefresh(){
    this.setState({refreshing: true})
    this.props.relay.forceFetch();
    this.setState({refreshing: false});
  }

  render() {
    const incentives = this.props.allHackerNewsItems.allIncentiveCampaigns.edges.map(perke => ({
      id: perke.node.id,
      name: perke.node.name,
      description: perke.node.description,
      rewardType: perke.node.reward.type,
      items: perke.node.items.edges.map(item => ({
        name: item.node.name,
        displayMakeup: item.node.displayMakeup,
        description: item.node.description,
        pic: item.node.pictureFile ? {uri : item.node.pictureFile.url} : require('./../../img/CheddrHeader.png'),
      })),
      dateRange: moment(perke.node.startDate).format('MM-DD-YYYY') + ' till ' + moment(perke.node.endDate).format('MM-DD-YYYY'),
    }));
    return (
      <View style={styles.container}>
        <Toolbar
          leftElement='menu'
          onLeftElementPress={() => {this.context.drawer.open()}}
          centerElement='Incentives'
          searchable={{
             autoFocus: true,
             placeholder: 'Search Locations or Incentives',
           }}

        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              tintColor='#f93666'
              colors={['#fdb729', '#008650', '#427abc']}
              progressBackgroundColor='#fff'
            />
          }
        >
          <List containerStyle={{paddingTop: 0, paddingBottom: 0, borderBottomWidth: 0, borderTopWidth: 0 }}>
            {
              incentives.map(perke => (
                <TouchableOpacity onPress={() => this.routeToIncentive(perke) } >
                <Card title={perke.name}>
                  <Text>{perke.description}</Text>
                  <Text>{perke.rewardType}</Text>
                  <Text>Products:</Text>
                  <List containerStyle={{paddingBottom: 15, paddingTop: 0, marginTop: 2.5, borderBottomWidth: 0, borderTopWidth: 0}}>
                    {
                      perke.items.map(item => (
                        <ListItem
                          title={item.name}
                          subtitle={item.description}
                          avatar={item.pic}
                        />
                      ))
                    }
                  </List>
                  <Text>{perke.dateRange}</Text>
                </Card>
                </TouchableOpacity>
              ))
            }
          </List>
        </ScrollView>
      </View>
    );
  }
}

Home.contextTypes = {
  drawer: React.PropTypes.object.isRequired,
};


export default Relay.createContainer(Home, {
  initialVariables: {
    orderBy: null
  },
  fragments: {
    allHackerNewsItems: (variables) => {
      return Relay.QL `
        fragment on Viewer {
          allIncentiveCampaigns (first: 50, orderBy: $orderBy) {
            edges {
              node {
                createdAt,
                id,
                name,
                description,
                startDate,
                endDate,
                maxBudget,
                distributors(first: 100, orderBy: $orderBy) {
                  edges {
                    node {
                      id,
                      createdAt,
                      name
                    }
                  }
                },
                items(first: 100, orderBy: $orderBy) {
                  edges {
                    node {
                      id,
                      createdAt,
                      type,
                      name,
                      displayMakeup,
                      description,
                      pictureFile {
                        url
                      }
                    }
                  }
                },
                reward {
                  id,
                  type,
                  flatReward {
                    qualifier,
                    dollarsPerUnit
                  },
                  tieredReward {
                    tierItems(first: 100) {
                      edges {
                        node {
                          id,
                          qualifier,
                          dollarsPerUnit
                        }
                      }
                    }
                  }
                },
                whereToSell {
                  categories
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
