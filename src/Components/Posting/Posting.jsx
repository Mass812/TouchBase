import React, { useState } from 'react';
import PostingBody from './PostingBody';

const Posting = () => {
	const [ responsePost, setResponsePost ] = useState('');
	const [ storedResponsePost, setStoredResponsePost ] = useState('');


	const responseMainPost = (e) => {
		setResponsePost(e.target.value);
	};

	const storeThisResponsePost = (e) => {
		if (e.target.value !== '') {
			setStoredResponsePost(e.target.value);
		}
	};

	console.log('stored response', storedResponsePost);

	return (
		<PostingBody
			responseMainPost={responseMainPost}
			responsePost={responsePost}
			storeThisResponsePost={storeThisResponsePost}
            storedResponsePost={storedResponsePost}
		/>
	);
};
export default Posting;
