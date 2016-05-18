import Relay from 'react-relay';

export default class RegisterMutation extends Relay.Mutation {
  static initialVariables = {
    input: null
  };
  // This method should return a GraphQL operation that represents
  // the mutation to be performed. This presumes that the server
  // implements a mutation type named ‘likeStory’.
  getMutation() {
    return Relay.QL`
      mutation {
        createUser
      }
    `;
  }
  // Use this method to prepare the variables that will be used as
  // input to the mutation. Our ‘likeStory’ mutation takes exactly
  // one variable as input – the ID of the story to like.
  getVariables() {
    // console.log("GET VARS");
    // console.log(this.props);
    return {
      credentials: {
        basic: {
          email: this.props.credentials.basic.email,
          password: this.props.credentials.basic.password
        }
      }
    };
  }
  // Use this method to design a ‘fat query’ – one that represents every
  // field in your data model that could change as a result of this mutation.
  // Liking a story could affect the likers count, the sentence that
  // summarizes who has liked a story, and the fact that the viewer likes the
  // story or not. Relay will intersect this query with a ‘tracked query’
  // that represents the data that your application actually uses, and
  // instruct the server to include only those fields in its response.
  getFatQuery() {
    // console.log("getFatQuery");
    // console.log(this.props);
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
  // These configurations advise Relay on how to handle the LikeStoryPayload
  // returned by the server. Here, we tell Relay to use the payload to
  // change the fields of a record it already has in the store. The
  // key-value pairs of ‘fieldIDs’ associate field names in the payload
  // with the ID of the record that we want updated.
  getConfigs() {
    // console.log("getConfigs");
    // console.log(this.props);
    // return [{
    //   type: 'FIELDS_CHANGE',
    //   fieldIDs: {
    //     changedUser: this.props.id
    //   }
    // }];
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
    // console.log("getOptimisticResponse");
    // console.log(this.props);
    return {
      changedUser: {
        credentials: this.props.credentials
      }
    }
  }

  // This mutation has a hard dependency on the story's ID. We specify this
  // dependency declaratively here as a GraphQL query fragment. Relay will
  // use this fragment to ensure that the story's ID is available wherever
  // this mutation is used.
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