import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	View, 
	Text, 
	Image,
	ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { CMDInput, CMDButton } from '../../components/';
import { emailChanged, passwordChanged, signIn } from '../../actions';

class SignInPage extends Component {
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
				placeholder="name@example.com"
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
				placeholder="********"
				secureTextEntry
				onChangeText={(text) => { this.props.passwordChanged(text); }}
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

	SignInButton() {
		const { email, password, loading } = this.props;
		if (!loading) {
			return (
				<CMDButton
					onPress={() => { this.props.signIn({ email, password }); }}
					titleStyle={{ fontSize: 18 }}
				>
				sign in
				</CMDButton>
			);
		}
	}

	SignUpButton() {
		const { loading } = this.props;
		if (!loading) {
			return (
				<CMDButton 
					onPress={() => { Actions.signup(); }}
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
				{this.ErrorMessage()}
				<View style={{ justifyContent: 'center' }}>
					{this.SignInButton()}
					{this.LoadingIndicator()}
				</View>
				<View style={{ flexGrow: 1 }} />
				{this.SignUpButton()}
				<KeyboardSpacer />
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
