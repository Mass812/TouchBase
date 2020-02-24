import { CREATE_POST, GET_POSTS } from '../types';

const initialState = {};

const feedReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_POST:
			return { ...state, posted: action.post };

		case GET_POSTS:
			return { ...state, posts: action.data };

		default:
			return state;
	}
};

export default feedReducer;
