import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../Navbar/Navbar'
import Input from '../Input/Input'
import './PostingBody.scss'
import '../../App.scss'
import TouchBaseCard from '../TouchBaseCard/TouchBaseCard'
import { createResponsePost, getResponsePosts } from '../../redux/actions/responseActions'
import {
	getFeedPosts,
	deletePostAndAllResponses,
	editPostAction
} from '../../redux/actions/feedActions'
import { useParams } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import ExpandEdit from '../TouchBaseCard/ExpandEdit'

const Response = () => {
	const param = useParams().id
	console.log(param, 'param')
	const originalPost = useSelector((state) => state.feed.getFeedPosts)
	const getResponses = useSelector((state) => state.response.getResponses)
	const isLoading = useSelector((state) => state.loading.isLoading)
	const basicUserInfo = useSelector((state) => state.profile.basicUserInfo)

	const dispatch = useDispatch()
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

	const onChange = (e) => {
		setTypedPost(e.target.value)
	}

	const onEnter = (event) => {
		if (event.which === 13 || event.keyCode === 13) {
			setSubmitted(true)
			dispatch(createResponsePost(typedPost, param))
			setTypedPost('')
			setTimeout(() => {
				setSubmitted(false)
			}, 1000)
		}
	}
	const submit = () => {
		if (typedPost.trim() !== '') {
			setSubmitted(true)
			console.log('response input submit fired')

			dispatch(createResponsePost(typedPost, param))
			setTypedPost('')
			setTimeout(() => {
				setSubmitted(false)
			}, 1000)
		}
	}

	useEffect(
		() => {
			dispatch(getFeedPosts())
			dispatch(getResponsePosts(param))
		},
		[
			param,
			dispatch,
			submitted,
			editSubmitted
		]
	)

	const handleDelete = (postId) => {
		console.log('delete response', postId)
		const deleteThisOne = getResponses.filter((n) => n.postId === postId)
		dispatch(deletePostAndAllResponses(deleteThisOne[0].postId))
		setTimeout(() => {
			dispatch(getResponsePosts(param))
		}, 300)
	}

	const toggleEdit = async (post, idx) => {
		let onlyEditPostIfAuthed = getResponses.filter(
			(n) => n.userId === basicUserInfo.userId && n.postId === post
		)
		setAsTypedEdit({ ...asTypedEdit, postDoc: onlyEditPostIfAuthed[0] })

		setIsEditExpandedValue(
			getResponses.map((indx, i) => {
				if (i === idx) {
					indx = true
					console.log(typeof isEditExpandedValue)
				} else {
					indx = false
				}
				return indx
			})
		)
		console.log('responseEdit post ID: ', asTypedEdit.postDoc)
	}
	const captureUserEditTextAsTyped = (e) => {
		setAsTypedEdit({ ...asTypedEdit, userText: e.target.value })
	}

	const submitEdit = async () => {
		setEditSubmitted(true)
		dispatch(editPostAction(asTypedEdit.postDoc, asTypedEdit.userText))

		setTimeout(() => {
			dispatch(getResponsePosts(param))
			setEditSubmitted(false)
			setAsTypedEdit('')
			setIsEditExpandedValue(isEditExpandedValue.fill(false))
		}, 300)
	}

	const displayFeed = originalPost
		? originalPost
				.filter((f) => {
					return f.postId === param && f.relatedId === f.postId
				})
				.map((n, idx) => (
					<Fragment>
						<TouchBaseCard
							sidebar={false}
							key={n.postId + idx}
							post={n.post}
							displayName={n.displayName}
							id={n.postId}
							picture={`${n.url}`}
							to={`${param}`}
						/>
						<div className='tb-posting-title'>
							<span>
								<span style={{ color: 'teal' }}>Touch {''}</span>
								Base with <span style={{ color: 'darkBlue' }}>{n.displayName}</span>
							</span>
						</div>
					</Fragment>
				))
		: null

	const feedList =
		getResponses &&
		getResponses
			.filter((f) => {
				return param === f.relatedId && f.relatedId !== f.postId
			})
			.map((n, idx) => (
				<Fragment>
					<TouchBaseCard
						sidebar={basicUserInfo.userId === n.userId ? true : false}
						commentOn={false}
						key={n.postId + idx}
						post={n.post}
						displayName={n.displayName}
						id={n.postId}
						picture={n.url}
						to={`/personal_profile/${n.userId}`}
						deletePost={() => handleDelete(n.postId, n.userId)}
						authed={basicUserInfo.userId === n.userId}
						editToggle={() => toggleEdit(n.postId, idx)}
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

	return (
		<Fragment>
			<Navbar />
			{!isLoading ? (
				<div className='edge-case-large'>
					<div className='original-sticky'> {displayFeed}</div>
					<Fragment>
						{!submitted ? (
							<div className='feed-throw-post-block'>
								<Input
									onChange={onChange}
									onKeyPress={onEnter}
									submit={submit}
									value={typedPost}
									typedPost={typedPost}
									submitted={submitted}
								/>
							</div>
						) : null}
					</Fragment>
					<div className='previous-comments-block'>{feedList}</div>
				</div>
			) : (
				<Spinner />
			)}
		</Fragment>
	)
}
export default Response
