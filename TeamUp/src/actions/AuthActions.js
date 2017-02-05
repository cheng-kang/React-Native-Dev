import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { Auth } from '../Constants';

export const emailChanged = (text) => {
	return {
		type: Auth.EmailChanged,
		payload: text
	};
};

export const passwordChanged = (text) => {
	return {
		type: Auth.PasswordChanged,
		payload: text
	};
};

export const confirmPasswordChanged = (text) => {
	return {
		type: Auth.ConfirmPasswordChanged,
		payload: text
	};
};

export const signIn = ({ email, password }) => {
	return (dispatch) => {
		dispatch({ type: Auth.SignIn });

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => dispatch({ type: Auth.SignInSuccess, payload: user }))
			.catch(() => dispatch({ type: Auth.SignInFail }));
	};
};

export const beginSignUp = () => {
	return {
		type: Auth.BeginSignUp
	};
};

export const signUp = ({ email, password, confirmPassword }) => {
	return (dispatch) => {
		dispatch({ type: Auth.SignUp });
		if (password !== confirmPassword) {
			dispatch({ type: Auth.PasswordNotMatch });
		} else {
			firebase.auth().createUserWithEmailAndPassword(email, password)
				.then(user => dispatch({ type: Auth.SignUpSuccess, payload: user }))
				.catch(() => dispatch({ type: Auth.SignUpFail }));
		}
	};
};

export const signOut = () => {
	return (dispatch) => {
		firebase.auth().signOut()
			.then(() => {
				dispatch({ type: Auth.SignOutSuccess });
			})
			.catch(() => {
				dispatch({ type: Auth.SignOutFail });
			});
	};
};
