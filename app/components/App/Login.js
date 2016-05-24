import React, {
	PropTypes,
} from 'react';
import {
	StyleSheet, AsyncStorage, View, Text, TextInput
} from 'react-native';
import Relay from 'react-relay';
import Button from 'react-native-button';
import * as Auth from './../../auth/Auth';
import * as navigatorRoutes from './../../navigator/navigatorRoutes';
import LoginMutation from './../../mutations/LoginMutation';
import config from './../../../config';
import * as AppBase from './../../app';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginEmail: undefined,
			loginPassword: undefined
		}
		this._handleLoginEmailChange = this._handleLoginEmailChange.bind(this);
		this._handleLoginPasswordChange = this._handleLoginPasswordChange.bind(this);
		this.loginUser = this.loginUser.bind(this);
	}

	loginUser() {
		Auth.login(this.state.loginEmail, this.state.loginPassword)
	      .then((result) => {
	        let loggedInUser = {
	        	id: result.loginUser.id,
	        	scapholdAuthToken: result.loginUser.token,
	        	email: this.state.loginEmail
	        };

	        AsyncStorage.setItem("currentUser", JSON.stringify(loggedInUser), () => {
			    AsyncStorage.getItem("currentUser", (err, res) => {
			    	AppBase.setNetworkLayer();
			      	const newRoute = navigatorRoutes.homeNavigatorRoute({email: loggedInUser.email});
	       			this.props.navigator.push(newRoute);
			    });
			});
	      }).catch((error) => {
	        this.setState({errors: "Error: " + error});
	      });
	}
	_handleLoginEmailChange(text) {
		this.state.loginEmail = text;
	}
	_handleLoginPasswordChange(text) {
		this.state.loginPassword = text;
	}
	render() {
		return (
			<View>
				<Text style={styles.formTitle}>Login Here!</Text>
				<TextInput
					style={styles.form}
					placeholder=" Email"
					onChangeText={this._handleLoginEmailChange}
			        onSubmitEditing={this.loginUser}
			    />
			    <TextInput
					style={styles.form}
					placeholder=" Password"
					onChangeText={this._handleLoginPasswordChange}
			        onSubmitEditing={this.loginUser}
			        secureTextEntry={true}
			    />
			    <Button
		          style={styles.submitButton}
		          styleDisabled={{color: 'red'}}
		          onPress={this.loginUser}
		        >
		          Let's Go!
		        </Button>
			</View>
		);
	}
}

export default Relay.createContainer(Login, {
  fragments: {
  }
});

const styles = StyleSheet.create({
	formTitle: {
		fontSize: 20,
		marginBottom: 10,
		alignSelf: 'center'
	},
	form: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 0.5,
		margin: 10
	},
	submitButton: {
		fontSize: 20,
		marginTop: 10,
		marginBottom: 10,
		color: 'green'
	}
});
