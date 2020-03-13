import firebase, { auth } from '../../Components/Firebase/firebaseConfig'
import { CREATE_RESPONSE, LOADING } from '../types'

export const createResponsePost = (post, param) => {
	return async (dispatch) => {
		dispatch({ type: LOADING, isLoading: true })

		//get user auth uid
		const userRef = auth.currentUser.uid
		//get the users profile
		const userProfile = await firebase
			.firestore()
			.collection('users')
			.doc(userRef)
			.get()
			.then((snap) => snap.data())

		firebase
			.firestore()
			.collection('posts')
			// .doc(`${param}`)
			// .collection('responses')
			//related Id is param, whiich is original doc number
			.add({
				post,
				displayName: userProfile.displayName,
				createdAt: new Date().toISOString(),
				userId: userRef,
				url: userProfile.url,
				relatedId: param
			})
			.then((docRef) =>
				firebase
					.firestore()
					.collection('posts')
					.doc(docRef.id)
					.update({ postId: docRef.id, relatedId: param })
			)
			.then(() => {
				console.log('post from reducer')
				dispatch({ type: CREATE_RESPONSE, createResponsePost })
				dispatch({ type: LOADING, isLoading: false })
			})
			.catch((err) => {
				console.log('error from action creator createResponsePost', err)
			})
	}
}

//TODO
export const getResponsePosts = (param) => {
	return (dispatch) => {
		dispatch({ type: LOADING, isLoading: true })

		let getResponses = []
		firebase
			.firestore()
			//	.collection(`posts/${param}/responses`)
			.collection('posts')
			.where('relatedId', '==', param)
			.orderBy('createdAt', 'desc')
			.get()
			.then((snap) => {
				console.log('getResponse Data ===> ', snap)
				getResponses = snap.docs.map((item) => item.data())
				console.log(getResponses, ' from action')
				dispatch({ type: 'GET_RESPONSES', getResponses })
				dispatch({ type: LOADING, isLoading: false })
			})
			.catch((err) => {
				console.log('error from action creator getResponsePosts', err)
			})
	}
}

export const notifyUserOfResponseMade = () => {
	return (dispatch) => {}
}

//commentcount take in relatedId, userId
