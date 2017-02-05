import { Actions } from 'react-native-router-flux';
import { Auth } from '../Constants';

export const updateAuthState = (signedIn) => {
	console.log(signedIn);
	return (dispatch) => {
		dispatch({
		type: Auth.UpdateAuthState,
		payload: signedIn
		});

			Actions.refresh();
		if (signedIn) {
			console.log('event');
			Actions.refresh();
		} else {
			console.log('auth');
			// Actions.auth();
			Actions.refresh();
		}
	};
};
