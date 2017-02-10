import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { Event } from '../Constants';

export const getMyEventList = () => {
	console.log('Get My Event List');
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
	console.log('Update Current Event');
	console.log(event);
	return {
		type: Event.UpdateCurrentEvent,
		payload: event
	};
};

export const resetCurrentEvent = () => {
	console.log('Reset Current Event');
	return {
		type: Event.ResetCurrentEvent
	};
};

export const resetActionMsg = () => {
	console.log('Reset Action Message');
	return {
		type: Event.ResetActionMsg
	};
};

export const getEvent = (id) => {
	console.log(`Get Event: ${id}`);
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
	console.log('Get Event List');
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
	console.log(`Register Event: ${id} - ${title} - ${name}`);
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
	console.log(`Unregister Event: ${id} - ${title}`);
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
	console.log(`Select User: ${id}`);
	return {
		type: Event.SelectUser,
		payload: id
	};
};

export const deselectUser = () => {
	console.log('Deselect User');
	return {
		type: Event.DeselectUser,
		payload: null
	};
};

export const setProfile = (profile) => {
	console.log('Set Profile');
	console.log(profile);
	return {
		type: Event.SetProfile,
		payload: profile
	};
};

export const resetProfile = () => {
	console.log('Reset Profile');
	return {
		type: Event.ResetProfile
	};
};

export const exitProfilePage = () => {
	console.log('Exit Profile Page');
	return {
		type: Event.ExitProfilePage
	};
};

export const saveProfile = (id, profile) => {
	console.log(`Save profile: ${id}`);
	console.log(profile);

	const { currentUser } = firebase.auth();
	const updates = {};
	updates[`/events/${id}/registeredUser/${currentUser.uid}`] = profile;
	return (dispatch) => {
		firebase.database().ref()
			.update(updates)
			.then(
				dispatch({
					type: Event.SaveProfileSuccess,
					payload: profile
				})
			)
			.catch(
				dispatch({
					type: Event.SaveProfileFail
				})
			);
	};
};

export const editProfile = () => {
	console.log('Edit Profile');
	return {
		type: Event.EditProfile
	};
};


export const resetIsEditingProfile = () => {
	console.log('Reset isEditingProfile');
	return {
		type: Event.ResetIsEditingProfile,
	};
};

export const getChatsNotification = () => {
	console.log('Get Chats Notifications List');
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/chatsNotification/${currentUser.uid}`)
			.on('value', snapshot => {
				let unreadCount = 0;
				const chatsNotif = _.map(snapshot.val(), (val, id) => {
					unreadCount += val.unreadCount;
					return { ...val, id };
				});
				console.log(unreadCount);
				dispatch({ 
					type: Event.GetChatsNotificationSuccess, 
					payload: {
						chatsNotif,
						unreadCount
					} });
			});
	};
};

export const getChat = (id) => {
	console.log('Get Chats Notifications List');
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/chatsHistory/${currentUser.uid}/${id}`)
			.on('value', snapshot => {
				dispatch({ 
					type: Event.GetChatSuccess, 
					payload: snapshot.val()
				});
			});
	};
};

export const clearChatUnreadCount = (id) => {
	const { currentUser } = firebase.auth();
	console.log(`Clear unread count for chat: currentUser ${currentUser} with ${id}`);

	const updates = {};
	updates[`/chatsNotification/${currentUser.uid}/${id}/unreadCount`] = 0;
	return (dispatch) => {
		firebase.database().ref()
			.update(updates)
			.then(
				dispatch({
					type: Event.ClearUnreadMsgSuccess
				})
			)
			.catch(
				dispatch({
					type: Event.ClearUnreadMsgFail
				})
			);
	};
};
