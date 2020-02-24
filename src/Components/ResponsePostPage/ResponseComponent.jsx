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
import firebase from '../Firebase/firebaseConfig';

const Response = () => {
	const [ data, setData ] = useState([]);
	const param = useParams().id;
	const originalPost = useSelector((state) => state.feed.posts);
	console.log(originalPost);
	const postResponses = useSelector((state) => state.response.responses);
	console.log(postResponses);
	const dispatch = useDispatch();
	const [ responsePost, setResponsePost ] = useState('');
	const [ storedUserComment, setStoredUserComment ] = useState('');

	useEffect(
		() => {
			dispatch(getFeedPosts());
		},
		[ dispatch ]
	);

	useEffect(
		() => {
			dispatch(getResponsePosts(param));
		},
		[ dispatch, param ]
	);

	useEffect(
		() => {
			let data = [];
			firebase
				.firestore()
				.collection(`posts/${param}/responses`)
				.get()
				.then((snap) => {
					data = snap.docs.map((item) => item.data());
					setData(data);
				});
		},
		[ param ]
	);

	console.log(data);

	const typedResponse = (e) => {
		setResponsePost(e.target.value);
	};

	const storeResponse = (e) => {
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

	(() => {
		if (storedUserComment) {
			dispatch(createResponsePost(storedUserComment, param));
		}
	})();

	const displayFeed = originalPost
		? originalPost.filter((n) => n.id === param).map((n, idx) => (
				<div>
					<TouchBaseCard
						sidebar={false}
						key={n.id}
						post={n.post}
						displayName={n.displayName}
						id={n.id}
						picture={n.picture}
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
		data &&
		data.map((n, idx) => (
			<TouchBaseCard
				sidebar={false}
				key={n.id}
				post={n.post}
				displayName={n.displayName}
				id={n.id}
				picture={n.picture}
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
								{storedUserComment ? (
									<span className='post-success'>
										Posted Successfully!
									</span>
								) : null}
								<button onClick={storeResponse} className='nav-button'>
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
