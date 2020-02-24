

import firebase from '../../Components/Firebase/firebaseConfig'
import { CREATE_POST, LOADING, DONE_LOADING, FETCH_ERROR } from '../types';



export const createFeedPost = (post) => {
	return (dispatch) => {
	dispatch({type: LOADING});
firebase.firestore()
			.collection('posts')
			.add({
				post,
				displayName: 'Samson',
				createdAt: new Date().toISOString()
			}).then(docRef=>
				firebase.firestore()
			.collection('posts').doc(docRef.id).update({id: docRef.id})
			)
			.then(() => {
				console.log('post from reducer', );
				dispatch({ type: CREATE_POST, posted: post });
			})
			.catch((err) => {
				console.log('error from action creator', err);
				dispatch({ type: FETCH_ERROR });
			});
	};
};

export const getFeedPosts = () => {
	return  (dispatch)=>{
		dispatch({type: LOADING})
		let data ;
		firebase.firestore().collection('posts').limit(3)
			.get()
				.then(snap=>{
					data=snap.docs.map(item=> item.data());	
					dispatch({type: 'GET_POSTS', data})
				})
				dispatch({type: DONE_LOADING})
			}
	
	};
