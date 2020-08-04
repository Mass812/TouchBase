const authReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_SIGNED_IN_USER_ID':
			return { ...state, getCurrentSignedInUserId: action.getCurrentSignedInUserId }
		default:
			return state
	}
}

export default authReducer
