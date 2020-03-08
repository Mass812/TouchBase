import React, { useState, useEffect } from 'react'
import './Feed.scss'
import '../../App.scss'
import Navbar from '../Navbar/Navbar'
import TouchBaseCard from '../TouchBaseCard/TouchBaseCard'
import { useSelector, useDispatch } from 'react-redux'
import { getFeedPosts, createFeedPost } from '../../redux/actions/feedActions'
import { getBasicUserDetails } from '../../redux/actions/profileActions'
import { LOADING } from '../../redux/types'
import { useHistory } from 'react-router-dom'

//TODO gsap annimate new post in from left

const Feed = (props) => {
	const history = useHistory()
	const feedList = useSelector((state) => state.feed.getFeedPosts)
	const basicUserInfo = useSelector((state) => state.profile.basicUserInfo)
	console.log('basic info on feed: ', basicUserInfo)

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

	const submit = async (e) => {
		await setSubmitted(true)
		dispatch({ type: LOADING })
		await dispatch(createFeedPost(typedPost))
		await setTypedPost('')
		setTimeout(() => {
			setSubmitted(false)
		}, 1000)
	}

	const onKeyPress = async (event) => {
		if (event.which === 13 || event.keyCode === 13) {
			await setSubmitted(true)
			console.log('onKeyPress Fired')
			await dispatch(createFeedPost(typedPost))
			//event.target.blur();
			await setTypedPost('')
			setTimeout(() => {
				setSubmitted(false)
			}, 1000)
		}
	}

	//create a user profile pic
	//reducer
	//action
	//implement

	//TODO Cache data

	//TODO count area, update with actions and reducers

	// const [
	// 	likeCount,
	// 	setLikeCount
	// ] = useState(0)
	// const [
	// 	commentedCount,
	// 	setCommentedCount
	// ] = useState(0)
	// const [
	// 	angeredCount,
	// 	setAngeredCount
	// ] = useState(0)
	// const [
	// 	heartedCount,
	// 	setHeartedCount
	// ] = useState(0)

	// const liked = (e, idx) => {
	// 	setLikeCount((prev) => prev + 1)
	// }
	// const commentCount = () => {
	// 	setCommentedCount(
	// 		(prev) => prev + 1
	// 	)
	// }
	// const angryCount = () => {
	// 	setAngeredCount(
	// 		(prev) => prev + 1
	// 	)
	// }
	// const heartCount = () => {
	// 	setHeartedCount(
	// 		(prev) => prev + 1
	// 	)
	// }
	// console.log(
	// 	'feedlist ids ',
	// 	feedList.map((n, idx) => n)
	// )
	// //
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
						id={n.id}
						picture={`${n.url}`}
						toPost={`/specific_post/${n.postId}`}
						to={`/personal_profile/${n.postId}`}
						//from comp
					/>
				))
		: null

	return (
		<div className='feed-container-component'>
			<Navbar />
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
								onClick={() =>
									history.push(`/edit_personal_profile/${basicUserInfo.userId}`)}
								className='default-user-image'
								src={basicUserInfo.url ? basicUserInfo.url : defaultPic}
								alt={basicUserInfo.displayName}
							/>
						</div>
						{basicUserInfo.displayName}
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
	)
}

export default Feed
