import { Event } from '../Constants';

const INITIAL_STATE = {
	name: null,
	myEvents: null,
	events: null,
	currentEvent: null,
	actionMsg: null,
	selectedUserId: null
};

export default (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case Event.GetNameSuccess:
			return {
				...state,
				name: payload
			};
		case Event.GetMyEventListSuccess:
			return {
				...state,
				myEvents: payload
			};
		case Event.UpdateCurrentEvent:
			return { ...state, currentEvent: payload };
		case Event.ResetActionMsg:
			return { ...state, actionMsg: null };
		case Event.GetEventDetailSuccess:
			return { ...state, currentEvent: payload };
		case Event.GetEventListSuccess:
			return { ...state, events: payload };
		case Event.RegisterEventSuccess:
			return { ...state, actionMsg: payload };
		case Event.UnregisterEventSuccess:
			return { ...state, actionMsg: payload };
		case Event.RegisterEventFail:
			return { ...state, actionMsg: payload };
		case Event.UnregisterEventFail:
			return { ...state, actionMsg: payload };
		case Event.SelectUser:
			return { ...state, selectedUserId: payload };
		case Event.DeselectUser:
			return { ...state, selectedUserId: payload };
		default:
			return state;
	}
};
