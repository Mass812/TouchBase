import firebase from '../../Components/Firebase/firebaseConfig';
import {
	CREATE_RESPONSE,
	LOADING,
	DONE_LOADING,
	FETCH_ERROR
} from '../types';

export const createResponsePost = (post, param) => {
	return (dispatch) => {
		dispatch({ type: LOADING });
		firebase
			.firestore()
			.collection('posts')
			.doc(`${param}`)
			.collection('responses')
			.add({
				post,
				displayName: 'Responder',
				createdAt: new Date().toISOString()
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
				dispatch({ type: CREATE_RESPONSE, payload: post });
				dispatch({ type: DONE_LOADING });
			})
			.catch((err) => {
				console.log('error from action creator createResponsePost', err);
				dispatch({ type: FETCH_ERROR });
			});
	};
};

export const getResponsePosts = (param) => {
	return (dispatch) => {
		dispatch({ type: LOADING });
		let data;
		firebase
			.firestore()
			.collection(`posts/${param}/responses`)
			.get()
			.then((snap) => {
				data = snap.docs.map((item) => item.data());
				dispatch({ type: 'GET_RESPONSES', data });
				dispatch({ type: DONE_LOADING });
			})
			.catch((err) => {
				console.log('error from action creator getResponsePosts', err);
				dispatch({ type: FETCH_ERROR });
			});
	};
};
