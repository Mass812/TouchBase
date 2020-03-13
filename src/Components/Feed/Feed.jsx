import React, { useState, useEffect } from 'react'
import './Feed.scss'
import '../../App.scss'
import Navbar from '../Navbar/Navbar'
//import TouchBaseCard from '../TouchBaseCard/TouchBaseCard'
import { useHistory } from 'react-router-dom'
import TouchBaseCard from '../TouchBaseCard/TouchBaseCard'
import { useSelector, useDispatch } from 'react-redux'
import {
	getFeedPosts,
	createFeedPost,
	deletePostAndAllResponses,
	editPostAction,
	addLikesToPost
} from '../../redux/actions/feedActions'
import { getBasicUserDetails } from '../../redux/actions/profileActions'
import UserNotificationGem from './UserNotificationGem.jsx/UserNotificationGem'
import FeedDumb from './FeedDumb'

//TODO gsap animate new post in from left

const Feed = (props) => {
	const feedList = useSelector((state) => state.feed.getFeedPosts)

	const basicUserInfo = useSelector((state) => state.profile.basicUserInfo)
	const isLoading = useSelector((state) => state.loading.isLoading)

	const dispatch = useDispatch()
	const history = useHistory()

	//useReducer
	const [
		typedPost,
		setTypedPost
	] = useState('')

	const [
		isEditExpandedValue,
		setIsEditExpandedValue
	] = useState(false)
	const [
		asTypedEdit,
		setAsTypedEdit
	] = useState('')
	console.log('astyped in feed', asTypedEdit)

	const [
		editSubmitted,
		setEditSubmitted
	] = useState(false)
	const [
		submitted,
		setSubmitted
	] = useState(false)

	const [
		holdPostId,
		setHoldPostId
	] = useState({ postDoc: '', userText: '' })

	useEffect(
		() => {
			dispatch(getBasicUserDetails())
			dispatch(getFeedPosts())
		},
		[
			submitted
		]
	)

	const onChange = (e) => {
		setTypedPost(e.target.value)
	}

	const onEditAsTyped = (e) => {
		setAsTypedEdit(e.target.value)
	}

	const submit = (e) => {
		setSubmitted(true)
		dispatch(createFeedPost(typedPost))
		setTypedPost('')
		setTimeout(() => {
			setSubmitted(false)
		}, 1000)
	}

	const handleDelete = (postId) => {
		const deleteThisOne = feedList.filter((n) => n.postId === postId)
		return (
			dispatch(deletePostAndAllResponses(deleteThisOne[0].postId)), dispatch(getFeedPosts())
		)
	}

	const isEditBox = (post, user) => {
		setIsEditExpandedValue((prev) => setIsEditExpandedValue(!prev))

		let onlyEditPostIfAuthed = feedList.filter(
			(n) => n.userId === basicUserInfo.userId && n.postId === post
		)
		setHoldPostId({ ...holdPostId, postDoc: onlyEditPostIfAuthed[0] })
	}

	const handleEditChange = (e) => {
		setHoldPostId({ ...holdPostId, userText: e.target.value })
	}

	const submitEdit = () => {
		setEditSubmitted(true)
		dispatch(editPostAction(holdPostId.postDoc, holdPostId.userText))
		setInterval(() => {
			setEditSubmitted(true)
			setIsEditExpandedValue(false)
		}, 300)
	}

	const handleLike = (e, post, user) => {
		e.preventDefault()
		dispatch({ type: 'LOADING, isLoading: true' })
		dispatch(addLikesToPost(post, user))
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
						edit={() => isEditBox(n.postId, n.userId)}
						editBoxValue={isEditExpandedValue}
						placeholder={n.postId}
						EditOnKeyPress={(e) =>
							e.which === 13 || e.keyCode === 13 ? (e) => handleEditChange(e) : null}
						submitEdit={submitEdit}
						onEditAsTyped={onEditAsTyped}
						asTypedEdit={asTypedEdit}
						handleEditChange={handleEditChange}
						likeAction={(e) => handleLike(e, n.postId, n.userId)}
						likes={n.likes.length}
					/>
				))
		: null

	return (
		<div className='feed-container-component'>
			<Navbar />
			<UserNotificationGem />
			<FeedDumb
				isLoading={isLoading}
				typedPost={typedPost}
				onChange={onChange}
				onKeyPress={(event) =>
					event.which === 13 || event.keyCode === 13 ? submit() : null}
				value={typedPost}
				submitted={submitted}
				onClick={submit}
				displayFeed={displayFeed}
			/>
		</div>
	)
}

export default Feed
