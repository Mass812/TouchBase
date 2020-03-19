import { GET_BASIC_USER_INFO, GET_NOTIFICATIONS,GET_MASTER_POSTS } from '../types'

const profileReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_BASIC_USER_INFO:
			return { ...state, basicUserInfo: action.basicUserInfo }
		case 'FIND_USER_INFO':
			return { ...state, discoveredUserInfo: action.discoveredUserInfo }
		case GET_MASTER_POSTS:
			return { ...state, getMasterPosts: action.getMasterPosts }
		case GET_NOTIFICATIONS:
			return { ...state, getNotifications: action.notifications }

		default:
			return state
	}
}

export default profileReducer
