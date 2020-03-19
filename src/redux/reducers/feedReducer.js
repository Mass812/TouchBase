import { CREATE_POST, GET_FEED_POSTS, GET_POST_LIKES,  } from '../types'

const initialState = {}

const feedReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_POST:
			return { ...state, createPost: action.typedPost }
		case GET_FEED_POSTS:
			return { ...state, getFeedPosts: action.getFeedPosts }
		case GET_POST_LIKES:
			return { ...state, getPostLikes: action.getPostLikes }
	
		case 'GET_LIKE_NOTIFICATION_VALUES':
			return { ...state, likeNotificationValues: action.likeNotificationValues }

		case 'EDIT_POST':
			return { ...state }

		default:
			return state
	}
}

export default feedReducer
