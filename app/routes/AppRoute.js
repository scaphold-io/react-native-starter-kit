import Relay from 'react-relay';

export default class AppRoute extends Relay.Route {
  static routeName = 'AppRoute';
  static queries = {
    // user: (Component, variables) => Relay.QL`
    //   query {
    //     user {
    //       ${Component.getFragment('user', {userID: variables.userID})}
    //     }
    //   }
    // `
  };
  static paramDefinitions = {
    // userID: {required: true},
  };
}
