import React from 'react';
import './Feed.scss';
import Navbar from '../Navbar/Navbar';
import TouchBaseCard from '../TouchBaseCard/TouchBaseCard';

const Feed = () => {
	return (
		<div className='feed-container'>
			<Navbar />
			<TouchBaseCard bar={true} />
		</div>
	);
};
export default Feed;
