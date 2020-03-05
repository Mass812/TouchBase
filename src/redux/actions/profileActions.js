import firebase from '../../Components/Firebase/firebaseConfig'
import { db, auth } from '../../Components/Firebase/firebaseConfig'
import { LOADING } from '../types'
import { GET_USER_INFO } from '../types'

export const getUserDetails = (param) => {
	return async (dispatch) => {
		dispatch({ type: LOADING })
		console.log('in action Param=> ', param)
		let usersInfo, data
		await firebase
			.firestore()
			.collection('posts')
			.doc(param)
			.get()
			.then((snap) => {
				console.log('snap in action', snap)
				usersInfo = snap.data().userId
				console.log('data after snap', usersInfo)
			})
			.then(async () => {
				await firebase
					.firestore()
					.collection('users')
					.doc(usersInfo)
					.get()
					.then((res) => (data = res.data()))
				dispatch({ type: GET_USER_INFO, data })
				console.log('data From getUSerDetails: ', data)
			})
			.catch((err) => console.log(err))
	}
}

export const createUserProfile = (userInfo) => {
	return async (dispatch) => {
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
				console.log('ACTION Profile Exists as: ', profile)
				dispatch({ type: 'STORED_USER_PROFILE',  profile })
			} else {
				checkForUserProfile
					.set(userDetails)
					.then((doc) => {
						profile = doc.data()
						console.log('ACTION Profile Exists after creation: ', profile)
						dispatch({ type: 'STORED_USER_PROFILE',  profile })
					})
					.catch((err) => console.log('error creating profile', err))
			}
		})
	}
}


	const updateUserProfile =(userInfo)=>{
		return (dispatch)=>{
			

		}

	}

//editButton
