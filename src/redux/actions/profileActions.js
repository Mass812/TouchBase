import firebase from '../../Components/Firebase/firebaseConfig'
import { db, auth } from '../../Components/Firebase/firebaseConfig'
import { LOADING, DONE_LOADING } from '../types'
import { GET_USER_INFO } from '../types'
import { useHistory } from 'react-router-dom'

export const getUserDetailsFromPostId = (param) => {
	return async (dispatch) => {
		dispatch({ type: LOADING })
		let userId, data
		await firebase
			.firestore()
			.collection('posts')
			.doc(param)
			.get()
			.then((snap) => {
				userId = snap.data().userId
			})
			.then(async () => {
				await firebase
					.firestore()
					.collection('users')
					.doc(userId)
					.get()
					.then((res) => (data = res.data()))
				dispatch({ type: GET_USER_INFO, data })
				dispatch({ type: DONE_LOADING })
			})
			.catch((err) => console.log(err))
	}
}

export const createUserProfileAutomatically = (userInfo) => {
	return async (dispatch) => {
		dispatch({ type: LOADING })
		let userDetails = {
			userId: userInfo.userId,
			displayName: userInfo.displayName,
			work: 'Edit Work',
			location: 'Edit Location',
			hobbies: 'Edit Hobbies',
			bio: 'Edit Bio.'
		}

		let profile

		const checkForUserProfile = firebase
			.firestore()
			.collection('userProfile')
			.doc(userInfo.userId)
		checkForUserProfile.get().then((doc) => {
			if (doc.exists) {
				profile = doc.data()
				console.log('Profile already auto created as: ', profile)
				dispatch({ type: 'STORED_USER_PROFILE', profile })
			} else {
				checkForUserProfile
					.set(userDetails)
					.then((doc) => {
						profile = doc.data()
						console.log('Profile automatic creation: ', profile)
						dispatch({ type: 'STORED_USER_PROFILE', profile })
						dispatch({ type: DONE_LOADING })
					})
					.catch((err) => console.log('error creating profile', err))
			}
		})
	}
}

export const updateUserProfile = (userInfo, newProfileData) => {
	return (dispatch) => {
		const { work, bio, location, hobbies } = newProfileData
		//see inner values
		dispatch({ type: LOADING })
		let updatedProfile
		if (auth.currentUser.uid === userInfo.id) {
			const refUserAndUpdatedInfo = firebase
				.firestore()
				.collection('userProfile')
				.doc(userInfo.userId)

			refUserAndUpdatedInfo.update({
				work: work,
				location: location,
				bio: bio,
				hobbies: hobbies
			})

			firebase
				.firestore()
				.collection('userProfile')
				.doc(userInfo.userId)
				.get()
				.then((doc) => {
					updatedProfile = doc.data()
					console.log('updatedUserProfile Action Value', updatedProfile)
					dispatch({ type: 'GET_NEW_USER_PROFILE_DATA', updatedProfile })
					dispatch({ type: DONE_LOADING })
				})
		} else {
			return
		}
	}
}

//editButton
