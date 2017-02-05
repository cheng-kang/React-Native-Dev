import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { Event } from '../Constants';
import figlet from 'figlet';

export const getMyEventList = () => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/events`)
			.on('value', snapshot => {
				const events = _.map(snapshot.val(), (val, id) => {
					return { ...val, id };
				});
				console.log('-------------');
				console.log(events);
				dispatch({ type: Event.GetMyEventListSuccess, payload: events });
			});
	};
};
