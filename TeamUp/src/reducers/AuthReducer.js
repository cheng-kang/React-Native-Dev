import { Auth } from '../Constants';

const INITIAL_STATE = {
	email: '',
	password: '',
	confirmPassword: '',
	user: null,
	error: 'test',
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
		case Auth.SignIn:
			return { ...state, loading: true, error: '' };
		case Auth.SignInSuccess:
			return { ...state, ...INITIAL_STATE, user: action.payload };
		case Auth.SignInFail:
			return { ...state, loading: false, error: 'Authentication Failed.', password: '' };
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
		default:
			return state;
	}
};
