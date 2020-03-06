


const authReducer = (state = {}, action) => {
	switch (action.type) {
		case 'SIGNED_IN_USER':
			return { ...state, signedInUser: action.signedInUser }
		default:
			 return state
	}
}

export default authReducer
