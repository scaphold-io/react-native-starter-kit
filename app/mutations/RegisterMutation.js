import Relay from 'react-relay';

export default class RegisterMutation extends Relay.Mutation {
  static initialVariables = {
    input: null
  };

  getMutation() {
    return Relay.QL`
      mutation {
        createUser
      }
    `;
  }

  getVariables() {
    return {
      username: this.props.input.username,
      password: this.props.input.password
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on _CreateUserPayload {
        changedUser {
          username,
          createdAt,
          modifiedAt
        }
      }
    `
  }

  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [Relay.QL `
        fragment on _CreateUserPayload {
          changedUser {
            username,
            createdAt,
            modifiedAt
          }
        }
      `]
    }]
  }

  // getOptimisticResponse() {
  //  return {
  //     changedUser: {
  //       username: this.props.username
  //     }
  //   }
  // }

  static fragments = {
    user: () => Relay.QL`
      fragment on _CreateUserPayload {
        changedUser {
          username,
          createdAt,
          modifiedAt
        }
      }
    `,
  };
}