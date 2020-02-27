import firebase, { auth } from '../../Components/Firebase/firebaseConfig';
import { CREATE_RESPONSE, LOADING, DONE_LOADING, FETCH_ERROR } from '../types';

export const createResponsePost = (post, param) => {
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
		firebase
			.firestore()
			.collection('posts')
			.doc(`${param}`)
			.collection('responses')
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
					.doc(`${param}`)
					.collection('responses')
					.doc(docRef.id)
					.update({ id: docRef.id })
			)
			.then(() => {
				console.log('post from reducer');
				dispatch({ type: CREATE_RESPONSE, payload: createResponsePost });
				dispatch({ type: DONE_LOADING });
			})
			.catch((err) => {
				console.log('error from action creator createResponsePost', err);
				dispatch({ type: FETCH_ERROR });
			});
	};
};

//TODO
export const getResponsePosts = (param) => {
	return (dispatch) => {
		dispatch({ type: LOADING });
		let getResponses = [];
		firebase
			.firestore()
			.collection(`posts/${param}/responses`)
			.get()
			.then((snap) => {
				getResponses = snap.docs.map((item) => item.data());
				console.log(getResponses, ' from action');
				dispatch({ type: 'GET_RESPONSES', getResponses });
				dispatch({ type: DONE_LOADING });
			})
			.catch((err) => {
				console.log('error from action creator getResponsePosts', err);
				dispatch({ type: FETCH_ERROR });
			});
	};
};
