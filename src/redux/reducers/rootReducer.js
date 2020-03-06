import profileReducer from './profileReducer';
import feedReducer from './feedReducer';
import responseReducer from './responseReducer';
import loadingReducer from './loadingReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	auth: authReducer,
	profile: profileReducer,
	feed: feedReducer,
	response: responseReducer,
	loading: loadingReducer
});

export default rootReducer;
