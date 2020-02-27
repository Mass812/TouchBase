import firebase, { db, auth } from '../../Components/Firebase/firebaseConfig';
import { CREATE_POST, LOADING, DONE_LOADING, FETCH_ERROR } from '../types';

export const createFeedPost = (post) => {
	return async (dispatch) => {
		dispatch({ type: LOADING });
		//get user auth uid
		const userRef = auth.currentUser.uid;
		//get the users profile
		const userProfile = await firebase
			.firestore()
			.collection('users')
			.doc(userRef)
			.get()
			.then((snap) => snap.data());

		console.log('userRef= ', userRef, 'userProfile = ', userProfile);
		firebase
			.firestore()
			.collection('posts')
			.add({
				post,
				displayName: userProfile.displayName,
				createdAt: new Date().toISOString(),
				userId: userRef,
				url: userProfile.url
			})
			.then((docRef) =>
				firebase
					.firestore()
					.collection('posts')
					.doc(docRef.id)
					.update({ id: docRef.id })
			)
			.then(() => {
				console.log('post from reducer');
				dispatch({ type: CREATE_POST, posted: post });
			})
			.catch((err) => {
				console.log('error from action creator', err);
				dispatch({ type: FETCH_ERROR });
			});
	};
};

export const getFeedPosts = () => {
	return (dispatch) => {
		dispatch({ type: LOADING });
		let data;
		db
			.collection('posts')
			.limit(3)
			.orderBy('createdAt', 'desc')
			.get()
			.then((snap) => {
				data = snap.docs.map((item) => item.data());
				dispatch({ type: 'GET_POSTS', data });
			});
		dispatch({ type: DONE_LOADING });
	};
};
