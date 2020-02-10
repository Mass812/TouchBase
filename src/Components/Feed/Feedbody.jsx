import React from 'react';
import './Feed.scss';

const FeedBody = () => {
	const defaultImage = require('../../Assets/default.png');

	return (
		<div className='feed-body-container'>
			<div className='tb-card-original-post'>
				<div className='postingPicture'>
					<img
						src={defaultImage}
						alt={'default logo'}
						className='default-user-image'
					/>
				</div>
				<div className='postersName'> Posting Author / User Here </div>

				<div className='originalPosting'>
					Pull data from the firestore and throw out th information and map more
				</div>
				<div className='like-span'>Like heart Icons</div>
			</div>
				<div className='side-rail'>Comment on Post</div>
		</div>
	);
};
export default FeedBody;
