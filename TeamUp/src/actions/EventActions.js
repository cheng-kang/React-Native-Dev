import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { Event } from '../Constants';

export const getMyEventList = () => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		// prepare user's name for later usage
		firebase.database().ref(`/users/${currentUser.uid}/name`)
			.on('value', snapshot => {
				dispatch({ type: Event.GetNameSuccess, payload: snapshot.val() });
			});
		firebase.database().ref(`/users/${currentUser.uid}/events`)
			.on('value', snapshot => {
				const events = _.map(snapshot.val(), (val, id) => {
					return { ...val, id };
				});
				dispatch({ type: Event.GetMyEventListSuccess, payload: events });
			});
	};
};

export const updateCurrentEvent = (event) => {
	return {
		type: Event.UpdateCurrentEvent,
		payload: event
	};
};

export const resetActionMsg = () => {
	return {
		type: Event.ResetActionMsg
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

export const registerEvent = (id, title, name) => {
	const { currentUser } = firebase.auth();
	const date = (new Date()).toUTCString();
	const updates = {};
	updates[`/events/${id}/registeredUser/${currentUser.uid}`] = {
		regDate: date,
		name
	};
	updates[`/users/${currentUser.uid}/events/${id}`] = {
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
	updates[`/users/${currentUser.uid}/events/${id}`] = null;

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

export const selectUser = (id) => {
	return {
		type: Event.SelectUser,
		payload: id
	};
};

export const deselectUser = () => {
	return {
		type: Event.DeselectUser,
		payload: null
	};
};
