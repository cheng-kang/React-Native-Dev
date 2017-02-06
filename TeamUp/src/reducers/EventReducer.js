import { Event } from '../Constants';

const INITIAL_STATE = {
	myEvents: null,
	currentEvent: null,
	events: null
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
		default:
			return state;
	}
};
