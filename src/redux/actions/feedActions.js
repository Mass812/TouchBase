import firebase, { db, auth } from '../../Components/Firebase/firebaseConfig'
import { CREATE_POST, LOADING, DONE_LOADING, FETCH_ERROR } from '../types'

export const createFeedPost = (typedPost) => {
	return async (dispatch) => {
		dispatch({ type: LOADING })

		const userRef = auth.currentUser.uid
		let addThisData
		await firebase
			.firestore()
			.collection('users')
			.doc(userRef)
			.get()
			.then((doc) => {
				console.log('from createPost Action', doc.data())
				addThisData = doc.data()
			})
			.then(() => {
				const { url, displayName } = addThisData
				firebase
					.firestore()
					.collection('posts')
					.add({
						post: typedPost,
						displayName,
						url,
						userId: userRef,
						createdAt: new Date().toISOString()
					})
					.then((docRef) =>
						firebase
							.firestore()
							.collection('posts')
							.doc(docRef.id)
							.update({ postId: docRef.id, relatedId: docRef.id })
					)
					.then(() => {
						dispatch({ type: CREATE_POST, posted: typedPost })
					})
					.catch((err) => {
						console.log('error from action creator', err)
						dispatch({ type: FETCH_ERROR })
					})
			})
	}
}

export const getFeedPosts = () => {
	return (dispatch) => {
		dispatch({ type: LOADING })
		let getFeedPosts
		db.collection('posts').limit(10).orderBy('createdAt', 'desc').get().then((snap) => {
			getFeedPosts = snap.docs.map((item) => item.data())
			dispatch({ type: 'GET_FEED_POSTS', getFeedPosts })
		})
		dispatch({ type: DONE_LOADING })
	}
}
