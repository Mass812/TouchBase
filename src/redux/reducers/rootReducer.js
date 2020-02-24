import authReducer from './authReducer';
import feedReducer from './feedReducer';
import responseReducer from './responseReducer';
import loadingReducer from './loadingReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	auth: authReducer,
	feed: feedReducer,
	response: responseReducer,
	loading: loadingReducer
});

export default rootReducer;
