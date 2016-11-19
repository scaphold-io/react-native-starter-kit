import Relay from 'react-relay';

export default class IncentivesRoute extends Relay.Route {
  static routeName = 'IncentiveRoute';
  static queries = {
    allItems: (Component, variables) => {
      return Relay.QL `
        query {
          getIncentiveCampaign(id: $id) {
            ${Component.getFragment('allItems', {})}
          }
        }
      `
    }
  };
  static paramDefinitions = {
    id: {required: true},
  };
}
