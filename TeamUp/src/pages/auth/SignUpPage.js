import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	View, 
	Image, 
	Text,
	ActivityIndicator
} from 'react-native';
import { CMDInput, CMDButton } from '../../components/';
import { 
	emailChanged, 
	passwordChanged, 
	confirmPasswordChanged, 
	signUp, 
	beginSignUp 
} from '../../actions';

class SignUpPage extends Component {
	componentWillMount() {
		this.props.beginSignUp();
	}
	TitleLbl() {
		return (
			<Image 
				source={require('../../images/teamup.png')}
				style={{ width: 300, height: 160, alignSelf: 'center', marginLeft: -10 }}
				resizeMode="contain"
			/>

		);
	}

	EmailInput() {
		const { email } = this.props;
		return (
			<CMDInput 
				label="email"
				value={email}
				placeholder="your email"
				onChangeText={(text) => { this.props.emailChanged(text); }}
				keyboardType="email-address"
			/>
		);
	}

	PasswordInput() {
		const { password } = this.props;
		return (
			<CMDInput 
				label="password"
				value={password}
				placeholder="8 digit password"
				secureTextEntry
				onChangeText={(text) => { this.props.passwordChanged(text); }}
			/>
		);
	}

	ConfirmPasswordInput() {
		const { confirmPassword } = this.props;
		return (
			<CMDInput 
				label="Confirm"
				value={confirmPassword}
				placeholder="confirm your password"
				secureTextEntry
				onChangeText={(text) => { this.props.confirmPasswordChanged(text); }}
			/>
		);
	}

	ErrorMessage() {
		const { error } = this.props;
		if (error !== '') {
			return (
				<Text style={{ color: 'red', paddingLeft: 10, height: 30, fontWeight: '500' }} >
					Error: { error }
				</Text>
			);
		} else {
			return (
				<View style={{ height: 30 }} />
			);
		}
	}

	SignUpButton() {
		const { email, password, confirmPassword, loading } = this.props;
		if (!loading) {
			return (
				<CMDButton 
					onPress={() => { this.props.signUp({ email, password, confirmPassword }); }}
					titleStyle={{ fontSize: 18 }}
				>
				sign up
				</CMDButton>
			);
		}
	}

	LoadingIndicator() {
		const { loading } = this.props;
		if (loading) {
			return (
				<ActivityIndicator
					style={{ alignItems: 'center', justifyContent: 'center', padding: 8 }}
					color="white"
				/>
			);
		}
	}

	render() {
		const pageStyle = {
			backgroundColor: '#121619',
			flexDirection: 'column',
			flex: 1,
			paddingBottom: 30
		};

		return (
			<View style={pageStyle} >
				{this.TitleLbl()}
				{this.EmailInput()}
				{this.PasswordInput()}
				{this.ConfirmPasswordInput()}
				{this.ErrorMessage()}
				<View style={{ justifyContent: 'center' }}>
					{this.SignUpButton()}
					{this.LoadingIndicator()}
				</View>
			</View>

		);
	}
}

const mapStateToProps = ({ auth }) => {
	const { email, password, confirmPassword, error, loading } = auth;
	return { email, password, confirmPassword, error, loading };
};

export default connect(mapStateToProps, {
	emailChanged, passwordChanged, confirmPasswordChanged, signUp, beginSignUp
})(SignUpPage);
