import firebase from '../../Components/Firebase/firebaseConfig';

export const createResponsePost = (post, param) => {
	return (dispatch) => {
		firebase
			.firestore()
			.collection('posts')
			.doc(`${param}`)
			.collection('responses')
			.add({
				post,
				userHandle: 'Responder',
				createdAt: new Date().toISOString()
			}).then(docRef=>
				firebase.firestore()
            .collection('posts')
            .doc(`${param}`)
            .collection('responses')
            .doc(docRef.id)
            .update({id: docRef.id})
            )
			.then(() => {
				console.log('post from reducer');
				dispatch({ type: 'CREATE_RESPONSE', payload: post });
			})
			.catch((err) => {
				console.log('error from action creator createResponsePost', err);
				dispatch({ type: 'RESPONSE_ERROR', err });
			});
	};
};

export const getResponsePosts = (param) => {
	return (dispatch) => {
		let data;
		firebase.firestore().collection(`posts/${param}/responses`).get().then((snap) => {
			data = snap.docs.map((item) => item.data());
			dispatch({ type: 'GET_RESPONSES', data });
        })
        .catch((err) => {
            console.log('error from action creator getResponsePosts', err);
            dispatch({ type: 'GET_RESPONSES_ERROR', err });
        });
	};
};
