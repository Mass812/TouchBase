import authReducer from './authReducer';
import feedReducer from './feedReducer';
import responseReducer from './responseReducer';
import { combineReducers } from 'redux';



const rootReducer = combineReducers({
	auth: authReducer,
	feed: feedReducer,
	response: responseReducer
});

export default rootReducer;
