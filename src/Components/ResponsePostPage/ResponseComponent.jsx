import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import './PostingBody.scss';
import TouchBaseCard from '../Feed/TouchBaseCard/TouchBaseCard';
import {
	createResponsePost,
	getResponsePosts
} from '../../redux/actions/responseActions';
import { useParams } from 'react-router-dom';
import { getFeedPosts } from '../../redux/actions/feedActions';

const Response = () => {
	const param = useParams().id;
	const originalPost = useSelector((state) => state.feed.posts);
	const getResponses = useSelector((state) => state.response.getResponses);

	const dispatch = useDispatch();
	const [ responsePost, setResponsePost ] = useState('');
	const [ displayButton, setDisplayButton ] = useState(true);

	console.log('postResponses', getResponses);
	console.log('originalPost', originalPost);

	useEffect(() => {
		dispatch(getFeedPosts());
	}, []);

	useEffect(
		() => {
			dispatch(getResponsePosts(param));
		},
		[ param ]
	);

	// useEffect(
	// 	() => {
	// 		let data = [];
	// 		firebase
	// 			.firestore()
	// 			.collection(`posts/${param}/responses`)
	// 			.get()
	// 			.then((snap) => {
	// 				data = snap.docs.map((item) => item.data());
	// 				setData(data);
	// 			});
	// 	},
	// 	[ param ]
	// );

	const typedResponse = (e) => {
		setResponsePost(e.target.value);
	};

	const storeResponse = (e) => {
		if (e.target.value.trim() !== '') {
			// setStoredUserComment(e.target.value);
			dispatch(createResponsePost(e.target.value, param));
			e.target.value = '';
			setDisplayButton(false);
		}
	};

	const onEnter = (event) => {
		if (event.which === 13 || event.keyCode === 13) {
			console.log('onEnter Fired');
			// setStoredUserComment(responsePost);
			dispatch(createResponsePost(responsePost, param));
			event.target.blur();
			setDisplayButton(false);
		}
	};

	// (() => {
	// 	if (displayButton) {
	// 		dispatch(createResponsePost(displayButton, param));
	// 	}
	// })();

	const displayFeed = originalPost
		? originalPost.filter((n) => n.id === param).map((n, idx) => (
				<div>
					<TouchBaseCard
						sidebar={false}
						key={n.id + idx}
						post={n.post}
						displayName={n.displayName}
						id={n.id}
						picture={n.url}
						to={'/personal_profile'}
					/>
					<div className='tb-posting-title'>
						<span>
							<span style={{ color: 'teal' }}>Touch {''}</span>
							Base with{' '}
							<span style={{ color: 'darkBlue' }}>{n.displayName}</span>
						</span>
					</div>
				</div>
			))
		: null;

	const displayResponses =
		getResponses &&
		getResponses.map((n, idx) => (
			<TouchBaseCard
				sidebar={false}
				key={n.id + idx}
				post={n.post}
				displayName={n.displayName}
				id={n.id}
				picture={n.url}
				to={'/personal_profile'}
			/>
		));

	return (
		<div>
			<Navbar />
			<div className='edge-case-large'>
				<div className='original-sticky'> {displayFeed}</div>
				<div className='tb-card-container'>
					<div className='response-input-container'>
						<div>
							<div className='typed-post'> {responsePost} </div>

							<div className='comment-on-post'>
								<input
									className='input-field-posts'
									placeholder='Enter a new post here'
									type='textArea'
									onChange={typedResponse}
									onBlur={storeResponse}
									onKeyPress={onEnter}
								/>
							</div>
							<div className='post-comment-button'>
								{displayButton ? (
									<span className='post-success'>
										Posted Successfully!
									</span>
								) : null}
								<button
									style={
										displayButton ? (
											{ opacity: '1' }
										) : (
											{ opacity: '.4' }
										)
									}
									disabled={!displayButton}
									onClick={storeResponse}
									className='nav-button'>
									Post
								</button>
							</div>
						</div>
					</div>
					<div className='previous-comments-block'>{displayResponses}</div>
				</div>
			</div>
			);
		</div>
	);
};
export default Response;
