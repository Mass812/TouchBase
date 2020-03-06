



const profileReducer = (state ={}, action) => {
	switch (action.type) {
		case 'GET_USER_INFO':
			return { ...state, data: action.data }
		case 'CREATE_USER_PROFILE':
			return state
		case 'STORED_USER_PROFILE':
			return { ...state, profile: action.profile }
		case 'GET_NEW_USER_PROFILE_DATA':
			return { ...state, value: action.updatedProfile }
		case 'NEW_USER_PROFILE':
			return { ...state, newProfile: action.newProfile }
		case 'UPDATE_USER_PROFILE':
			return state
		default:
			return state
	}
}


export default profileReducer
