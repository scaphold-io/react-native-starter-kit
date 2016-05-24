import Relay from 'react-relay';

export default class LoginMutation extends Relay.Mutation {
  static initialVariables = {
    input: null
  };

  getMutation() {
    return Relay.QL`
      mutation {
        loginUser
      }
    `;
  }

  getVariables() {
    return {
      email: this.props.input.email,
      password: this.props.input.password
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on _LoginUserPayload {
        id,
        token
      }
    `
  }

  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [Relay.QL `
        fragment on _LoginUserPayload {
          id,
          token
        }
      `]
    }]
  }

  getOptimisticResponse() {
    return {
      loginUser: this.props.loginUser
    }
  }

  static fragments = {
    user: () => Relay.QL`
      fragment on _LoginUserPayload {
          id,
          token
        }
    `,
  };
}