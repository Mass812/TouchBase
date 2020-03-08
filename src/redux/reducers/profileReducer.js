import { GET_BASIC_USER_INFO } from '../types'









const profileReducer = (state = {}, action) => {
	switch (action.type) {


		case 'GET_BASIC_USER_INFO':
			return { ...state, basicUserInfo: action.basicUserInfo }
		case 'GET_USER_INFO_OFF_POST_BY_USER_ID':
			return { ...state, usersDocFromPic: action.usersDocFromPic }
		case 'GET_PROFILE_DATA':
			return { ...state, getProfile: action.getProfile }
	
		
		default:
			return state
	}
}


export default profileReducer
