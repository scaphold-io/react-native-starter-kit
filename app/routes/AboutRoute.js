import Relay from 'react-relay';

export default class AboutRoute extends Relay.Route {
  static routeName = 'AboutRoute';
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
