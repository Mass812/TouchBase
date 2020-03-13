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
						likes: [
							
						],
						createdAt: new Date().toISOString()
					})
					.then((docRef) => {
						//can create any associated docs with post creation here

						firebase
							.firestore()
							.collection('posts')
							.doc(docRef.id)
							.update({ postId: docRef.id, relatedId: docRef.id })
					})
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
			})
		})
		await firebase
			.firestore()
			.collection('likes')
			.doc(postId)
			.delete.then(() => dispatch({ type: 'LOADING', isLoading: false }))
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

export const addLikesToPost = (postId, userId) => {
	return async (dispatch) => {
		let values = []
	
		let reviewer = auth.currentUser.uid
		let likeNotificationValues = [
			postId,
			userId,
			reviewer
		]
		dispatch({ type: 'GET_LIKE_NOTIFICATION_VALUES', likeNotificationValues })

		let addToArray = firebase.firestore.FieldValue.arrayUnion
		let removeFromArray = firebase.firestore.FieldValue.arrayRemove
		let likeCountRef = firebase.firestore().collection('posts').doc(postId)

	
			//create one and add reviewer
			await likeCountRef
				.get()
				.then(doc => values = doc.data().likes)

				if (values.includes(reviewer) ) {
				await	likeCountRef.get().then(likes => likes.data().likes.length).then(() => {
						likeCountRef.update({ likes: removeFromArray(reviewer) })
						.then(()=>{
							dispatch(getFeedPosts())
						})
						//get updated doc
						})
				}
				else{
				await	likeCountRef.get().then(likes => likes.data().likes.length).then(() => {
						likeCountRef.update({ likes: addToArray(reviewer) })
						})
						.then(()=>{
							dispatch(getFeedPosts())
						})
				
				}

		console.log('final doc likes after fx', values)
		dispatch({ type: 'LIKE_ARRY', values })
	}
}


