import Relay from 'react-relay';

export default class HomeRoute extends Relay.Route {
  static routeName = 'HomeRoute';
  static queries = {
    allHackerNewsItems: (Component, variables) => {
      return Relay.QL `
        query {
          viewer {
            ${Component.getFragment('allHackerNewsItems', {orderBy: variables.orderBy})}
          }
        }
      `
    }
  };
  static paramDefinitions = {
    email: {required: true},
    orderBy: {required: true},
  };
}