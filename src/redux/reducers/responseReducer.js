import {
	CREATE_RESPONSE,
	RESPONSE_ERROR,
	GET_RESPONSES,
	GET_RESPONSES_ERROR
} from '../types';

const initialState = {};

const responseReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_RESPONSE:
			console.log('created response successfully', action.createResponse);
			return { ...state, storedUserComment: action.storedUserComment };
		case RESPONSE_ERROR:
			console.log('Post Failed:  error: ');
			return { ...state, response: action.data };
		case GET_RESPONSES:
			console.log('Posting response reducer fired');
			return { ...state, getResponses: action.getResponses };
		case GET_RESPONSES_ERROR:
			return { ...state, error: action.data };
		default:
			return state;
	}
};

export default responseReducer;
