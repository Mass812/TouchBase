import React, { useState, useEffect } from 'react';
import './Feed.scss';
import Navbar from '../Navbar/Navbar';
import TouchBaseCard from '../TouchBaseCard/TouchBaseCard';
import { useSelector, useDispatch } from 'react-redux';
import {
	getFeedPosts,
	createFeedPost,
} from '../../redux/actions/feedActions';
import { LOADING } from '../../redux/types';

//TODO gsap annimate new post in from left

const Feed = (props) => {
	const feedList = useSelector((state) => state.feed.posts);
	const userInfo = useSelector((state) => state.feed.userInfo);
	const dispatch = useDispatch();
	const [ typedPost, setTypedPost ] = useState('');
	const [ submitted, setSubmitted ] = useState(false);

	const onChange = (e) => {
		setTypedPost(e.target.value);
	};

	const submit = async (e) => {
		await setSubmitted(true);
		dispatch({type: LOADING})
		await dispatch(createFeedPost(typedPost));
		await setTypedPost('');
		setTimeout(() => {
			setSubmitted(false);
		}, 1000);
	};

	const onKeyPress = async (event) => {
		if (event.which === 13 || event.keyCode === 13) {
			await setSubmitted(true);
			console.log('onKeyPress Fired');
			await dispatch(createFeedPost(typedPost));
			//event.target.blur();
			await setTypedPost('');
			setTimeout(() => {
				setSubmitted(false);
			}, 1000);
		}
	};

	//create a user profile pic
	//reducer
	//action
	//implement

	//TODO Cache data

	useEffect(
		() => {
			dispatch(getFeedPosts());
		},
		[ submitted, dispatch ]
	);

	const displayFeed = feedList
		? feedList.map((n, idx) => (
				<TouchBaseCard
					sidebar={true}
					key={n.id + idx}
					post={n.post}
					displayName={n.displayName}
					id={n.id}
					picture={`${n.url}`}
					comment={'/personal_profile'}
					
				/>
			))
		: null;

	const userHeaderArea =(<div>
								<div>
									<img className='default-user-image' src={userInfo.url} alt={userInfo.displayName} />
								</div>
										{userInfo.displayName}
								</div>);
			
									console.log(userInfo.displayName);



			return (
				<div className='feed-container-component'>
			<Navbar />
			<div className='feed-throw-post-block'>
				<div className='tb-posting-title'>
				
					<span style={{fontSize: '24px'}}>
						<span style={{ color: 'teal' }}>Touch {''}</span>
						Base
				{userHeaderArea}
						<span
							style={{
								color: 'teal',
								fontFamily: 'SansSerif',
								
							}}>
						
						</span>
					</span>
				</div>
				<div className='feed-inner-post-block'>
					<div className='feed-show-typed'> {typedPost} </div>

					<div className='feed-input-form-block'>
						<input
							className='feed-input'
							placeholder='Enter a new post here'
							type='textArea'
							onChange={onChange}
							onKeyPress={onKeyPress}
							value={typedPost}
						/>
					<div className='feed-post-comment-button'>
						{submitted ? (
							<span className='post-success'>Posted Successfully!</span>
						) : null}
						<button onClick={submit} className='nav-button'>
							Post
						</button>
					</div>
					</div>

				</div>
			</div>
			<div className='db-posts'>{displayFeed}</div>
		</div>
	);
};

export default Feed;
