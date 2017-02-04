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

export const signIn = ({ email, password }) => {
	return (dispatch) => {
		dispatch({ type: Auth.SignIn });

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => dispatch({ type: Auth.SignInSuccess, payload: user }))
			.catch(() => dispatch({ type: Auth.SignInFail }));
	};
};
