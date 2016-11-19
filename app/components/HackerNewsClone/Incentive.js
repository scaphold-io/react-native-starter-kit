import React from 'react';
import Relay from 'react-relay';
import { ScrollView, View, Text, StyleSheet, Platform, RefreshControl } from 'react-native';
import {Card, List, ListItem} from 'react-native-elements';
import {Toolbar} from 'react-native-material-ui';
import moment from 'moment';


export class Incentive extends React.Component {
  constructor(props, context) {
    super(props, context)
      this.state = {
        refreshing: false,
      };

    this._onRefresh = this._onRefresh.bind(this);
  }

  _onRefresh(){
    this.setState({refreshing: true})
    this.props.relay.forceFetch();
    this.setState({refreshing: false});
  }

  render() {
    const items = this.props.allItems.items.edges.map(item => ({
        name: item.node.name,
        displayMakeup: item.node.displayMakeup,
        description: item.node.description,
        pic: item.node.pictureFile ? {uri : item.node.pictureFile.url} : require('./../../img/CheddrHeader.png'),
    }));
    return (
      <View style={styles.container}>
        <Toolbar
          leftElement='arrow-back'
          onLeftElementPress={() => {this.props.navigator.pop()}}
          centerElement={this.props.allItems.name}
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
          <List containerStyle={{paddingBottom: 15, paddingTop: 0, marginTop: 2.5, borderBottomWidth: 0, borderTopWidth: 0}}>
            {
              items.map(item => (
                <Card title={item.name} image={item.pic}>
                  <Text>{item.description}</Text>
                </Card>
              ))
            }
          </List>
        </ScrollView>
      </View>
    );
  }
}


export default Relay.createContainer(Incentive, {
  initialVariables: {
  },
  fragments: {
    allItems: (variables) => {
      return Relay.QL `
        fragment on IncentiveCampaign {
          createdAt,
          id,
          name,
          description,
          startDate,
          endDate,
          maxBudget,
          distributors(first: 100) {
            edges {
              node {
                id,
                createdAt,
                name
              }
            }
          },
          items(first: 100) {
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
