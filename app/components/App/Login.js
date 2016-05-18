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
		console.log("LOGIN");
		console.log(this);

		Auth.login(this.state.loginEmail, this.state.loginPassword)
	      .then((result) => {
	        config.userToken = result.loginUser.token;

	        let loggedInUser = {
	        	id: result.loginUser.id,
	        	userToken: config.userToken,
	        	email: this.state.loginEmail
	        };

	        AsyncStorage.setItem("currentUser", JSON.stringify(loggedInUser), () => {
			  // AsyncStorage.mergeItem("currentUser", JSON.stringify(UID123_delta), () => {
			    AsyncStorage.getItem("currentUser", (err, res) => {
			      	const newRoute = navigatorRoutes.homeNavigatorRoute({email: loggedInUser.email});
	       			this.props.navigator.push(newRoute);
			    });
			  // });
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
		console.log("Login.props");
		console.log(this.props);
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
