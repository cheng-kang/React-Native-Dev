import { Auth } from '../Constants';

const INITIAL_STATE = {
	signedIn: null
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Auth.UpdateAuthState:
			return { ...state, signedIn: action.payload };
		default:
			return state;
	}
};
