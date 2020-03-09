import firebase, { db, auth } from '../../Components/Firebase/firebaseConfig'
import { CREATE_POST, LOADING } from '../types'

export const createFeedPost = (typedPost) => {
	return async (dispatch) => {
		dispatch({ type: LOADING, isLoading: true })

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
						dispatch({ type: LOADING, isLoading: false })
					})
					.catch((err) => {
						console.log('error from action creator', err)
					})
			})
	}
}

export const getFeedPosts = () => {
	return (dispatch) => {
		dispatch({ type: LOADING, isLoading: true })
		let getFeedPosts
		db.collection('posts').limit(10).orderBy('createdAt', 'desc').get().then((snap) => {
			getFeedPosts = snap.docs.map((item) => item.data())
			dispatch({ type: 'GET_FEED_POSTS', getFeedPosts })
			dispatch({ type: LOADING, isLoading: false })
		})
	}
}

export const deletePostAndAllResponses = (postId) => {
	return async (dispatch) => {
		//delete original Post
		dispatch({ type: 'LOADING', isLoading: true })

		await firebase.firestore().collection('posts').doc(postId).delete()

		//authUser.delete()

		const relatedPosts = await firebase
			.firestore()
			.collection('posts')
			.where('relatedId', '==', postId)

		await relatedPosts.get().then((dataPool) => {
			dataPool.forEach((doc) => {
				doc.ref.delete()
				dispatch({ type: 'LOADING', isLoading: false })
			})
		})
	}
}

//LASTWORK
export const editPostAction = (passed, typed) => {
	return async (dispatch) => {
		console.log('passed', passed)
		console.log('In Action', typed)
		await firebase
			.firestore()
			.collection('posts')
			.doc(passed.postId)
			.update({ post: typed })
			.then(() => {
				dispatch({ type: 'EDIT_POST' })
				dispatch(getFeedPosts())
			})
			.then((err) => console.log('error in updating database', err))
	}
}
