import React, { useState } from 'react';
import PostingBody from './PostingBody';
import Navbar from '../Navbar/Navbar';
import './PostingBody.scss';

const Posting = () => {
	const [ responsePost, setResponsePost ] = useState('');
	const [ storedUserComment, setStoredUserComment ] = useState('');

	const responseMainPost = (e) => {
		setResponsePost(e.target.value);
	};

	const storeThisResponsePost = (e) => {
		if (e.target.value.trim() !== '') {
			setStoredUserComment(e.target.value);
			e.target.value = '';
		}
	};

	const onEnter = (event) => {
		if (event.which === 13 || event.keyCode === 13) {
			console.log('onEnter Fired');
			setStoredUserComment(responsePost);
			event.target.blur();
		}
	};

	console.log('stored response', storedUserComment);

	return (
		<div>
			<Navbar />
			<PostingBody
				responseMainPost={responseMainPost}
				responsePost={responsePost}
				storeThisResponsePost={storeThisResponsePost}
				storedUserComment={storedUserComment}
				onEnter={onEnter}
			/>
		</div>
	);
};
export default Posting;
