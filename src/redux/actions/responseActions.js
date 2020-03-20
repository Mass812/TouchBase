import firebase, { auth, db } from '../../Components/Firebase/firebaseConfig'
import { CREATE_RESPONSE, LOADING } from '../types'

export const createResponsePost = (post, param) => {
	return async (dispatch) => {
		dispatch({ type: LOADING, isLoading: true })

		//get user auth uid
		let commentCount = []
		const userRef = auth.currentUser.uid
		//get the users profile
		const userProfile = await db
			.collection('users')
			.doc(userRef)
			.get()
			.then((snap) => snap.data())

		db
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
				likes: [],
			
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
			.then(() => {
				const relatedPosts = firebase
					.firestore()
					.collection('posts')
					.where('relatedId', '==', param)

				relatedPosts.get().then((dataPool) => {
					dataPool
						.forEach((doc) => {
							commentCount.push(doc.data().userId)
							console.log('commentCount', commentCount)
						})
					})
					.then(() => {
						console.log('aram in final', param)
						const pushCommentArray = firebase
							.firestore()
							.collection('posts')
							.doc(param)

						pushCommentArray.update({ comments: commentCount })
					})
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
		db
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
