import Relay from 'react-relay';
import RegisterMutation from './../mutations/RegisterMutation';
import LoginMutation from './../mutations/LoginMutation';

export function register(email, password) {
  return new Promise((resolve, reject) => {
    Relay.Store.commitUpdate(new RegisterMutation({
      credentials: {
        basic: {
          email: email,
          password: password
        }
      },
      user: null
    }), {
      onSuccess: (data) => {
        var basicCredentials = data.createUser.changedUser.credentials.basic;
        resolve(login(email, password));
      },
      onFailure: (transaction) => {
        reject(transaction.getError().message);
      }
    });
  })
}

export function login(email, password) {
  return new Promise((resolve, reject) => {
    Relay.Store.commitUpdate(new LoginMutation({
      input: {
        email: email,
        password: password
      },
      user: null
    }), {
      onSuccess: (data) => {
        resolve(data);
      },
      onFailure: (transaction) => {
        reject(transaction.getError().message);
      }
    });
  })
}