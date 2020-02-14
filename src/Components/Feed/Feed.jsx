import React from 'react';
import './Feed.scss';
import Navbar from '../Navbar/Navbar';
import TouchBaseCard from '../TouchBaseCard/TouchBaseCard';
import { useSelector } from 'react-redux';

const Feed = (props) => {
	const feedList = useSelector(state => state.feed.posts);
	console.log(props);

	const displayFeed = feedList.map((n, idx)=>(
		<TouchBaseCard
		sidebar={true}
		key={n.id}
		body={n.post}
		userHandle={n.userHandle}
		id={n.id}
		picture={n.picture}
		to={'/personal_profile'}
	/>
	))



	return (
		<div className='feed-container'>
			<Navbar />
			{displayFeed}
			
		</div>
	);
};


export default Feed;
