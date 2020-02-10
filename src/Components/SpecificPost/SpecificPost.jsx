import React from 'react';
import './SpecificPost.scss';
import Navbar from '../Navbar/Navbar';
import Posting from '../Posting/Posting';

const SpecificPost = () => {
	return (
		<div className='specific -post-container'>
			<Navbar />
			<Posting />
		</div>
	);
};
export default SpecificPost;
