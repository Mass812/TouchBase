import firebase from '../../Components/Firebase/firebaseConfig'
import { db, auth } from '../../Components/Firebase/firebaseConfig'
import { LOADING } from '../types'
import { GET_BASIC_USER_INFO, GET_NOTIFICATIONS, GET_MASTER_POSTS } from '../types'

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
					})
					.catch((err) => console.log(err))
			}
		})

		//get the users profile
	}
}

export const findUserInfo = (userId) => {
	return async (dispatch) => {
		dispatch({ type: LOADING, isLoading: true })
		let discoveredUserInfo = []

		await db.collection('users').doc(userId).get().then((snap) => {
			discoveredUserInfo = snap.data()
			dispatch({ type: 'FIND_USER_INFO', discoveredUserInfo })
			dispatch({ type: LOADING, isLoading: false })
		})
	}
}

export const updateAndReturnUserProfile = (id, newProfileData) => {
	return (dispatch) => {
		const { work, bio, location, hobbies } = newProfileData
		//see inner values
		dispatch({ type: LOADING, isLoading: true })

		let getProfile
		if (auth.currentUser.uid === id) {
			const refUserAndUpdatedInfo = db.collection('users').doc(id)

			refUserAndUpdatedInfo.update({
				work: work,
				location: location,
				bio: bio,
				hobbies: hobbies
			})

			firebase
				.firestore()
				.collection('users')
				.doc(id)
				.get()
				.then((doc) => {
					getProfile = doc.data()
					console.log('updatedUserProfile Action Value', getProfile)
					dispatch({ type: 'GET_PROFILE_DATA', getProfile })
					dispatch({ type: LOADING, isLoading: false })
				})
				.catch(function(error) {
					console.log('Error getting documents: ', error)
				})
		} else {
			return
		}
	}
}

export const getNotifications = (userId) => {
	return (dispatch) => {
		//reference all master posts
		console.log('ACTION NOTIFICATION FIRED')
		let notifications,
			masterPosts = []
		const postMasters = db.collection('posts').where('master', '==', true)

		//get all master posts
		postMasters
			.get()
			.then((main) => {
				console.log(main)
				main.forEach((doc) => {
					masterPosts.push(doc.data())
					console.log('Master Posts Action', doc.data())

					dispatch({ type: GET_MASTER_POSTS, masterPosts })
				})
			})
			.catch(function(error) {
				console.log('Error getting documents: ', error)
			})

		masterPosts.map((masterPost, i) => {
			db.collection('posts').doc(masterPost.postId).onSnapshot((doc) => {
				console.log('MASTER DOC CHANGED', doc.data())
				notifications.push(doc.data())
				dispatch({ type: GET_NOTIFICATIONS, notifications })
			})
		})
	}
}

export const deleteAllUserRelatedInfo = () => {
	return async (dispatch) => {
		//delete original Post


		dispatch({ type: 'LOADING', isLoading: true })

		let user = auth.currentUser.uid
		let removeFromArray = firebase.firestore.FieldValue.arrayRemove

		//delete user doc
		
		//delete user posts
		
		const relatedPosts = firebase.firestore().collection('posts').where('userId', '==', user)
		
		console.log('where delete related posts ', relatedPosts)
		
		await relatedPosts.get().then((dataPool) => {
			console.log('dataPool get delted Posts ', dataPool)
			dataPool.forEach((doc) => {
				console.log('single deleted posts forEach ', doc)
				doc.ref.delete()
			})
		})

		const relatedLikeArrays = db.collection('posts').where('likes', 'array-contains', user)
		
		

		await relatedLikeArrays.get().then((dataPool) => {
			console.log('likes delete dataPool', dataPool)

			dataPool.forEach((doc) => {
				console.log('each delete like', doc)

				doc.ref.update({ likes: removeFromArray(user) })
			})
		})
	
		

		localStorage.clear();
		
		dispatch({ type: 'LOADING', isLoading: false })
	}
}
