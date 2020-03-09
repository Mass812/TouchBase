import { CREATE_POST, GET_FEED_POSTS, GET_BASIC_USER_INFO } from '../types'

const initialState = {}

const feedReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_POST:
			return { ...state, createPost: action.typedPost }

		case GET_FEED_POSTS:
			return { ...state, getFeedPosts: action.getFeedPosts }
		case 'EDIT_POST':
			return { ...state}

		default:
			return state
	}
}

export default feedReducer
