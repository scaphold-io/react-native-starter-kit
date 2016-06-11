import Relay from 'react-relay';
import RegisterMutation from './../mutations/RegisterMutation';
import LoginMutation from './../mutations/LoginMutation';

export function register(username, password) {
  return new Promise((resolve, reject) => {
    Relay.Store.commitUpdate(new RegisterMutation({
      input: {
        username: username,
        password: password
      },
      user: null
    }), {
      onSuccess: (data) => {
        resolve(login(username, password));
      },
      onFailure: (transaction) => {
        reject(transaction.getError().message);
      }
    });
  })
}

export function login(username, password) {
  return new Promise((resolve, reject) => {
    Relay.Store.commitUpdate(new LoginMutation({
      input: {
        username: username,
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