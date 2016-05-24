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
      credentials: {
        basic: {
          email: this.props.credentials.basic.email,
          password: this.props.credentials.basic.password
        }
      }
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on _CreateUserPayload {
        changedUser {
          credentials {
            basic {
              email,
              password
            }
          },
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
            credentials {
              basic {
                email,
                password
              }
            },
            createdAt,
            modifiedAt
          }
        }
      `]
    }]
  }

  getOptimisticResponse() {
   return {
      changedUser: {
        credentials: this.props.credentials
      }
    }
  }

  static fragments = {
    user: () => Relay.QL`
      fragment on _CreateUserPayload {
        changedUser {
          credentials {
            basic {
              email,
              password
            }
          },
          createdAt,
          modifiedAt
        }
      }
    `,
  };
}