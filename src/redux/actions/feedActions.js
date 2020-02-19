

import firebase from '../../Components/Firebase/firebaseConfig'



export const createFeedPost = (post) => {
	return (dispatch) => {
firebase.firestore()
			.collection('posts')
			.add({
				post,
				userHandle: 'Samson',
				createdAt: new Date().toISOString()
			}).then(docRef=>
				firebase.firestore()
			.collection('posts').doc(docRef.id).update({id: docRef.id})
			)
			.then(() => {
				console.log('post from reducer', );
				dispatch({ type: 'CREATE_POST', payload: post });
			})
			.catch((err) => {
				console.log('error from action creator', err);
				dispatch({ type: 'POST_ERROR', err });
			});
	};
};

export const getFeedPosts = () => {
	return  (dispatch)=>{
		let data ;
		firebase.firestore().collection('posts')
			.get()
				.then(snap=>{
					data=snap.docs.map(item=> item.data());	
					dispatch({type: 'GET_POSTS', data})
				})
			}
	
	};
