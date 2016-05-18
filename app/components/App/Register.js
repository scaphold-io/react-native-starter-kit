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
import RegisterMutation from './../../mutations/RegisterMutation';
import config from './../../../config';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			registerEmail: undefined,
			registerPassword: undefined
		}
		this._handleRegisterEmailChange = this._handleRegisterEmailChange.bind(this);
		this._handleRegisterPasswordChange = this._handleRegisterPasswordChange.bind(this);
		this.registerUser = this.registerUser.bind(this);
	}

	registerUser() {
		console.log("REGISTER");
		console.log(this);

		Auth.register(this.state.registerEmail, this.state.registerPassword)
	      .then((result) => {
	        config.userToken = result.loginUser.token;

	        let loggedInUser = {
	        	id: result.loginUser.id,
	        	userToken: config.userToken,
	        	email: this.state.registerEmail
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
	_handleRegisterEmailChange(text) {
		this.state.registerEmail = text;
	}
	_handleRegisterPasswordChange(text) {
		this.state.registerPassword = text;
	}
	render() {
		console.log("Register.props");
		console.log(this.props);
		return (
			<View>
				<Text style={styles.formTitle}>Register Here!</Text>
				<TextInput
					style={styles.form}
					placeholder=" Email"
					onChangeText={this._handleRegisterEmailChange}
			        onSubmitEditing={this._handleSubmitEditing}
			    />
			    <TextInput
					style={styles.form}
					placeholder=" Password"
					onChangeText={this._handleRegisterPasswordChange}
			        onSubmitEditing={this.registerUser}
			        secureTextEntry={true}
			    />
			    <Button
		          style={styles.submitButton}
		          styleDisabled={{color: 'red'}}
		          onPress={this.registerUser}
		        >
		          Let's Go!
		        </Button>
			</View>
		);
	}
}

export default Relay.createContainer(Register, {
  fragments: {
  }
});

const styles = StyleSheet.create({
	formTitle: {
		fontSize: 20,
		marginBottom: 10,
		alignSelf: 'center',
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
