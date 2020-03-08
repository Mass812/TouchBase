import firebase from '../../Components/Firebase/firebaseConfig'
import { db, auth } from '../../Components/Firebase/firebaseConfig'
import { LOADING } from '../types'
import { GET_USER_INFO_OFF_POST_BY_USER_ID, GET_BASIC_USER_INFO } from '../types'

export const getBasicUserDetails = () => {
	return async (dispatch) => {
		dispatch({ type: LOADING })
		//get user auth uid

		firebase.auth().onAuthStateChanged(async (user) => {
			if (user) {
				dispatch({ type: LOADING, isLoading: true })

				//user is signed in
				const userRef = auth.currentUser.uid
				let basicUserInfo
				await firebase
					.firestore()
					.collection('users')
					.doc(userRef)
					.get()
					.then((snap) => {
						basicUserInfo = snap.data()

						dispatch({ type: GET_BASIC_USER_INFO, basicUserInfo })
						dispatch({ type: LOADING, isLoading: false })

						console.log('Basic User Info: ', basicUserInfo)
					})
					.catch((err) => console.log(err))
			}
		})

		//get the users profile
	}
}

export const getUserDetailsFromPostId = (param) => {
	return async (dispatch) => {
		dispatch({ type: LOADING, isLoading: true })

		let userId, usersDocFromPic

		await firebase
			.firestore()
			.collection('posts')
			.doc(param)
			.get()
			.then((snap) => {
				userId = snap.data().userId
				console.log(snap.data().userId)
			})
			.then(async () => {
				await firebase.firestore().collection('users').doc(userId).get().then((res) => {
					usersDocFromPic = res.data()
					console.log('userDocsFromPic Value', usersDocFromPic)
					dispatch({ type: GET_USER_INFO_OFF_POST_BY_USER_ID, usersDocFromPic })
					dispatch({ type: LOADING, isLoading: false })
				})
			})
			.catch((err) => console.log(err))
	}
}

export const updateAndReturnUserProfile = (id, newProfileData) => {
	return (dispatch) => {
		const { work, bio, location, hobbies } = newProfileData
		//see inner values
		dispatch({ type: LOADING, isLoading: true })

		let getProfile
		if (auth.currentUser.uid === id) {
			const refUserAndUpdatedInfo = firebase.firestore().collection('users').doc(id)

			refUserAndUpdatedInfo.update({
				work: work,
				location: location,
				bio: bio,
				hobbies: hobbies
			})

			firebase.firestore().collection('users').doc(id).get().then((doc) => {
				getProfile = doc.data()
				console.log('updatedUserProfile Action Value', getProfile)
				dispatch({ type: 'GET_PROFILE_DATA', getProfile })
				dispatch({ type: LOADING, isLoading: false })
			})
		} else {
			return
		}
	}
}

//editButton
export const editFormData = () => {}
