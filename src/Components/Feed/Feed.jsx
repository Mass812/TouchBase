import React, { useState, useEffect } from 'react';
import './Feed.scss';
import Navbar from '../Navbar/Navbar';
import TouchBaseCard from './TouchBaseCard/TouchBaseCard';
import { useSelector, useDispatch } from 'react-redux';
import { getFeedPosts, createFeedPost } from '../../redux/actions/feedActions';

const Feed = (props) => {
	const feedList = useSelector((state) => state.feed.posts);
	const dispatch = useDispatch();
	const [ typedPost, setTypedPost ] = useState('');
	const [ post, setPost ] = useState('');

	const onChange = (e) => {
		setTypedPost(e.target.value);
	};

	(() => {
		if (post) {
			dispatch(createFeedPost(post));
		}
	})();

	const submit = (e) => {
		if (e.target.value.trim() !== '') {
			setPost(typedPost);
		}
	};

	const onKeyPress = (event) => {
		if (event.which === 13 || event.keyCode === 13) {
			setPost(typedPost);
			//	props.createPost(post);
			event.target.blur();
		}
	};

	useEffect(() => {
	dispatch(getFeedPosts());	

	}, [dispatch]);

	


	const displayFeed = (feedList ? feedList.map((n, idx) => (
		<TouchBaseCard
			sidebar={true}
			key={n.id}
			post={n.post}
			userHandle={n.userHandle}
			id={n.id}
			picture={n.picture}
			to={'/personal_profile'}
		/>
	)): null )

	return (
		<div className='feed-container'>
			<Navbar />
			<div className='feed-throw-post-block'>
				<div className='feed-inner-post-block'>
					<div className='feed-show-typed'> {typedPost} </div>
					<div className='feed-input-form-block'>
						<input
							className='feed-input'
							placeholder='Enter a new post here'
							type='textArea'
							onChange={onChange}
							onBlur={submit}
							onKeyPress={onKeyPress}
						/>
					</div>
					<div className='feed-post-comment-button'>
						{post ? (
							<span className='feed-post-success'>
								Posted Successfully!
							</span>
						) : null}
						<button onClick={submit} className='nav-button'>
							Post
						</button>
					</div>
				</div>
			</div>
			<div className='db-posts'>{displayFeed}</div>
		</div>
	);
};

export default Feed;
