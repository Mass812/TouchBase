import React, { useState, useEffect } from 'react'
import './Feed.scss'
import '../../App.scss'
import Navbar from '../Navbar/Navbar'
import TouchBaseCard from '../TouchBaseCard/TouchBaseCard'
import { useSelector, useDispatch } from 'react-redux'
import {
	getFeedPosts,
	createFeedPost,
	deletePostAndAllResponses
} from '../../redux/actions/feedActions'
import { getBasicUserDetails } from '../../redux/actions/profileActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faTrash,
	faComment,
	faBriefcase,
	faEdit,
	faMapMarkedAlt
} from '@fortawesome/free-solid-svg-icons'
import { LOADING } from '../../redux/types'
import { useHistory } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'

//TODO gsap animate new post in from left

const Feed = (props) => {
	const history = useHistory()
	const feedList = useSelector((state) => state.feed.getFeedPosts)
	const basicUserInfo = useSelector((state) => state.profile.basicUserInfo)
	const isLoading = useSelector((state) => state.loading.isLoading)

	const dispatch = useDispatch()
	const [
		typedPost,
		setTypedPost
	] = useState('')

	const [
		submitted,
		setSubmitted
	] = useState(false)

	useEffect(
		() => {
			dispatch(getBasicUserDetails())
			dispatch(getFeedPosts())
		},
		[
			submitted
		]
	)
	const defaultPic = require('../../Assets/default.png')

	const onChange = (e) => {
		setTypedPost(e.target.value)
	}

	const submit = (e) => {
		setSubmitted(true)
		dispatch({ type: LOADING, isLoading: true })
		dispatch(createFeedPost(typedPost))
		setTypedPost('')
		setTimeout(() => {
			setSubmitted(false)
			dispatch({ type: LOADING, isLoading: false })
		}, 1000)
	}

	const onKeyPress = (event) => {
		if (event.which === 13 || event.keyCode === 13) {
			setSubmitted(true)
			dispatch(createFeedPost(typedPost))
			//event.target.blur();
			setTypedPost('')
			setTimeout(() => {
				setSubmitted(false)
			}, 1000)
		}
	}

	const handleDelete = (postId) => {
		const deleteThisOne = feedList.filter((n) => n.postId === postId)
		return (
			dispatch(deletePostAndAllResponses(deleteThisOne[0].postId)), dispatch(getFeedPosts())
		)
	}

	const isEditHandler = (postId, userId) => {
		const authThisIf = feedList.filter((n) => n.userId === basicUserInfo.userId && n.postId === postId)
		return(
			console.log('authThisIf', authThisIf)
		)
	}

	const displayFeed = feedList
		? feedList
				.filter((f) => {
					return f.postId === f.relatedId
				})
				.map((n, idx) => (
					<TouchBaseCard
						sidebar={true}
						key={n.postId + idx}
						post={n.post}
						displayName={n.displayName}
						id={n.postId}
						picture={`${n.url}`}
						toPost={`/specific_post/${n.postId}`}
						to={`/personal_profile/${n.postId}`}
						delete={() => handleDelete(n.postId, n.userId)}
						authed={basicUserInfo.userId === n.userId}
						edit={()=>isEditHandler(n.postId, n.userId)}

						//from comp
					/>
				))
		: null

	return (
		<div className='feed-container-component'>
			<Navbar />
			{!isLoading ? (
				<div className='feed-large-screen-block'>
					<div className='feed-throw-post-block'>
						<div className='tb-posting-title'>
							<span
								style={{
									fontSize: '24px'
								}}>
								<span
									style={{
										color: 'teal'
									}}>
									Touch {''}
								</span>
								Base
								<span
									style={{
										color: 'teal',
										fontFamily: 'SansSerif'
									}}
								/>
							</span>
							<div>
								<div>
									<img
										className='header-user-image'
										src={basicUserInfo.url ? basicUserInfo.url : defaultPic}
										alt={basicUserInfo.displayName}
									/>
								</div>
								<div className='header-user-name'>{basicUserInfo.displayName}</div>
							
							</div>
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
			) : (
				<Spinner />
			)}
		</div>
	)
}

export default Feed
