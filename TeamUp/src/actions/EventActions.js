import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { Event } from '../Constants';

export const getMyEventList = () => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/events`)
			.on('value', snapshot => {
				const events = _.map(snapshot.val(), (val, id) => {
					return { ...val, id };
				});
				dispatch({ type: Event.GetMyEventListSuccess, payload: events });
			});
	};
};

export const getEvent = (id) => {
	return (dispatch) => {
		firebase.database().ref(`/events/${id}`)
			.on('value', snapshot => {
				dispatch({ 
					type: Event.GetEventDetailSuccess, 
					payload: { ...snapshot.val(), id: snapshot.key } 
				});
			});
	};
};

export const getEventList = () => {
	return (dispatch) => {
		firebase.database().ref('/events')
			.on('value', snapshot => {
				const events = _.map(snapshot.val(), (val, id) => {
					return { ...val, id };
				});
				dispatch({ type: Event.GetEventListSuccess, payload: events });
			});
	};
};
