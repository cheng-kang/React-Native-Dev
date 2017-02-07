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

export const registerEvent = (id, title) => {
	const { currentUser } = firebase.auth();
	const date = (new Date()).toUTCString();
	const updates = {};
	updates[`/events/${id}/registeredUser/${currentUser.uid}`] = {
		regDate: date
	};
	updates[`/users/events/${id}`] = {
		date,
		title
	};

	return (dispatch) => {
		firebase.database().ref()
			.update(updates)
			.then(() => {
				dispatch({ 
					type: Event.RegisterEventSuccess, 
					payload: { 
						title, 
						command: 'register', 
						children: `Success: registered for event ${title}` 
					}
				});
			})
			.catch(() => {
				dispatch({ 
					type: Event.RegisterEventFail, 
					payload: { 
						title, 
						command: 'register', 
						children: `Fail: attempted to register for event ${title}` 
					}
				});
			});
	};
};

export const unregisterEvent = (id, title) => {
	const { currentUser } = firebase.auth();
	const updates = {};
	updates[`/events/${id}/registeredUser/${currentUser.uid}`] = null;
	updates[`/users/events/${id}`] = null;

	return (dispatch) => {
		firebase.database().ref()
			.update(updates)
			.then(() => {
				dispatch({ 
					type: Event.UnregisterEventSuccess, 
					payload: { 
						title, 
						command: 'unregister', 
						children: `Success: unregistered for event ${title}` }
				});
			})
			.catch(() => {
				dispatch({ 
					type: Event.UnregisterEventFail, 
					payload: { 
						title, 
						command: 'unregister', 
						children: `Fail: attempted to register for event ${title}` 
					}
				});
			});
	};
};
