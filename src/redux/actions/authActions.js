import { auth } from '../../Components/Firebase/firebaseConfig'

export const getCurrentUserByAuth = () => {
	return (dispatch) => {
		const getCurrentSignedInUserId = auth.currentUser.uid
		dispatch({ type: 'GET_SIGNED_IN_USER_ID', getCurrentSignedInUserId })
	}
}
