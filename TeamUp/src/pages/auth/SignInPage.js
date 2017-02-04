import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import CMDInput from '../../components/CMDInput';
import CMDButton from '../../components/CMDButton';
import { emailChanged, passwordChanged, signIn } from '../../actions';

class SignInPage extends Component {

	TitleLbl() {
		const stl = {
			fontSize: 30,
			textAlign: 'center',
			color: 'white'
		};

		return (
			<Text style={stl}>Team Up</Text>

		);
	}

	EmailInput() {
		return (
			<CMDInput 
				label="email"
				placeholder="name@example.com"
				onChangeText={(text) => { this.props.emailChanged(text); }}
			/>
		);
	}

	PasswordInput() {
		return (
			<CMDInput 
				label="password"
				placeholder="********"
				secureTextEntry
				onChangeText={(text) => { this.props.passwordChanged(text); }}
			/>
		);
	}

	ErrorMessage() {
		const { error } = this.props;
		return (
			<Text style={{ color: '#e74c3c' }}>
				{ error }
			</Text>
		);
	}

	SignInButton() {
		const { email, password } = this.props;
		return (
			<CMDButton
				onPress={() => { this.props.signIn({ email, password }); }}
			>
			sign in
			</CMDButton>
		);
	}

	SignUpButton() {
		return (
			<CMDButton>
			sign up
			</CMDButton>
		);
	}

	render() {
		const stl = {
			backgroundColor: '#000',
			flex: 1
		};

		return (
			<View style={stl} >
				{this.TitleLbl()}
				{this.EmailInput()}
				{this.PasswordInput()}
				{this.ErrorMessage()}
				<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
					{this.SignInButton()}
					<Text style={{ color: 'white' }}> | </Text>
					{this.SignUpButton()}
				</View>
			</View>

		);
	}
}

const mapStateToProps = ({ auth }) => {
	const { email, password, error, loading } = auth;
	return { email, password, error, loading };
};

export default connect(mapStateToProps, {
	emailChanged, passwordChanged, signIn
})(SignInPage);
