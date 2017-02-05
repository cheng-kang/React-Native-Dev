import { Event } from '../Constants';

const INITIAL_STATE = {
	myEvents: [],
	event: null,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case Event.GetMyEventListSuccess:
			return {
				...state,
				myEvents: action.payload
			};
		case Event.GoToEventDetail:
			return {};
		case Event.GetEventDetailSuccess:
			return {};
		default:
			return state;
	}
};
