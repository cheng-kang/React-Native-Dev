import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EventReducer from './EventReducer';
import LauchScreenReducer from './LaunchScreenReducer';

export default combineReducers({
	auth: AuthReducer,
	event: EventReducer,
	launch: LauchScreenReducer
});
