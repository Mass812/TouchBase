import authReducer from './authReducer';
import postReducer from './postReducer';
import feedReducer from './feedReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	auth: authReducer,
	post: postReducer,
	feed: feedReducer
});

export default rootReducer;
