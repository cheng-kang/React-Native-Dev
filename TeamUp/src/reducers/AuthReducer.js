import { Auth } from '../Constants';

const INITIAL_STATE = {
	email: '',
	password: '',
	confirmPassword: '',
	user: null,
	error: '',
	loading: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Auth.EmailChanged:
			return { ...state, email: action.payload };
		case Auth.PasswordChanged:
			return { ...state, password: action.payload };
		case Auth.ConfirmPasswordChanged:
			return { ...state, confirmPassword: action.payload };
		case Auth.PasswordNotMatch:
			return { 
				...state, 
				loading: false, 
				password: '', 
				confirmPassword: '', 
				error: 'Passwords don\'t match.' 
			};
		case Auth.SignIn:
			return { ...state, loading: true, error: '' };
		case Auth.SignInSuccess:
			return { ...state, ...INITIAL_STATE, user: action.payload };
		case Auth.SignInFail:
			return { ...state, loading: false, error: 'Authentication Failed.', password: '' };
		case Auth.BeginSignUp:
			return { ...state, ...INITIAL_STATE };
		case Auth.SignUp:
			return { ...state, loading: true, error: '' };
		case Auth.SignUpSuccess:
			return { ...state, ...INITIAL_STATE, user: action.payload };
		case Auth.SignUpFail:
			return { 
				...state, 
				...INITIAL_STATE, 
				error: 'Failed to sign up with your email and password.' 
			};
		case Auth.SignOutSuccess:
			return {
				...state,
				...INITIAL_STATE,
				error: 'You have just signed out.'
			};
		case Auth.SignOutFail:
			return {
				...state,
				error: 'Something went wrong you you tried to sign out.'
			};
		default:
			return state;
	}
};
