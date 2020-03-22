import React, { useState, useEffect, Fragment } from 'react'
import './Feed.scss'
import '../../App.scss'
import Navbar from '../Navbar/Navbar'
//import TouchBaseCard from '../TouchBaseCard/TouchBaseCard'
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
import ExpandEdit from '../TouchBaseCard/ExpandEdit'

//TODO gsap animate new post in from left
//TODOD **enter function on edit to submit post, I did move button up
//fix profile profile nav should direct to normal, add children element to profile if auth with button to edit Profile

const Feed = (props) => {
	const feedList = useSelector((state) => state.feed.getFeedPosts)

	const basicUserInfo = useSelector((state) => state.profile.basicUserInfo)
	const isLoading = useSelector((state) => state.loading.isLoading)

	const dispatch = useDispatch()

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
		editSubmitted,
		setEditSubmitted
	] = useState(false)
	const [
		submitted,
		setSubmitted
	] = useState(false)

	const [
		asTypedEdit,
		setAsTypedEdit
	] = useState({ userText: '', postDoc: '' })

	useEffect(
		() => {
		//	dispatch(getBasicUserDetails())
			dispatch(getFeedPosts())
		},
		[
			submitted
		]
	)

	const onChange = (e) => {
		setTypedPost(e.target.value)
	}

	const submit = () => {
		if (typedPost.trim() !== '') {
			setSubmitted(true)
			dispatch(createFeedPost(typedPost))
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

	const toggleEdit = async (post, idx) => {
		let onlyEditPostIfAuthed = feedList.filter(
			(n) => n.userId === basicUserInfo.userId && n.postId === post
		)
		setAsTypedEdit({ ...asTypedEdit, postDoc: onlyEditPostIfAuthed[0] })

		setIsEditExpandedValue(
			feedList.map((indx, i) => {
				if (i === idx) {
					console.log(typeof isEditExpandedValue)
					if (typeof isEditExpandedValue === 'boolean') {
						indx = true
					}
					if (typeof isEditExpandedValue === 'object') {
						indx = !isEditExpandedValue[i]
					}
				} else {
					indx = false
				}
				return indx
			})
		)
	}
	const captureUserEditTextAsTyped = (e) => {
		setAsTypedEdit({ ...asTypedEdit, userText: e.target.value })
	}

	const submitEdit = () => {
		setEditSubmitted(true)
		dispatch(editPostAction(asTypedEdit.postDoc, asTypedEdit.userText))
		setTimeout(() => {
			setEditSubmitted(false)
			setAsTypedEdit('')
			setIsEditExpandedValue(isEditExpandedValue.fill(false))
		}, 100)
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
					<Fragment key={n.postId}>
						<TouchBaseCard
							sidebar={true}
							commentOn={true}
							post={n.post}
							displayName={n.displayName}
							id={n.postId}
							picture={`${n.url}`}
							toPost={`/specific_post/${n.postId}`}
							//	to={`/personal_profile/${n.postId}`}
							to={`/personal_profile/${n.userId}`}
							deletePost={() => handleDelete(n.postId, n.userId)}
							onClickLike={(e) => handleLike(e, n.postId, n.userId)}
							likesCount={n.likes.length}
							authed={basicUserInfo.userId === n.userId}
							editToggle={() => toggleEdit(n.postId, idx)}
							commentCount={n.comments.length < 1 ? 0 : n.comments.length - 1}
						/>
						<ExpandEdit
							value={asTypedEdit.userText}
							editOnKeyPress={(e) =>
								e.key === 'Enter' ? (e) => captureUserEditTextAsTyped(e) : null}
							authed={basicUserInfo.userId === n.userId}
							submitEdit={submitEdit}
							asTypedEdit={asTypedEdit}
							captureUserEditTextAsTyped={(e) => captureUserEditTextAsTyped(e)}
							editSubmitted={editSubmitted}
							placeholder={n.post}
							editBoxValue={isEditExpandedValue[idx]}
						/>
					</Fragment>
				))
		: null

	return (
		<Fragment>
			<Navbar basicUserInfo={basicUserInfo} />
			<UserNotificationGem />
			<FeedDumb
				isLoading={isLoading}
				typedPost={typedPost}
				onChange={onChange}
				onKeyPress={(event) => (event.key === 'Enter' ? submit() : null)}
				value={typedPost}
				submitted={submitted}
				submit={submit}
				displayFeed={displayFeed}
			/>
		</Fragment>
	)
}

export default Feed
