import { Event } from '../Constants';

const INITIAL_STATE = {
	myEvents: null,
	currentEvent: null,
	events: null,
	actionMsg: null,
};

export default (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case Event.GetMyEventListSuccess:
			return {
				...state,
				myEvents: payload
			};
		case Event.GoToEventDetail:
			return {};
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
		default:
			return state;
	}
};
