import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../Navbar/Navbar'
import Input from '../Input/Input'
import './PostingBody.scss'
import '../../App.scss'
import TouchBaseCard from '../TouchBaseCard/TouchBaseCard'
import { createResponsePost, getResponsePosts } from '../../redux/actions/responseActions'
import { useParams } from 'react-router-dom'
import { getFeedPosts } from '../../redux/actions/feedActions'
import Spinner from '../Spinner/Spinner'

const Response = () => {
	const param = useParams().id
	console.log(param, 'param')
	const originalPost = useSelector((state) => state.feed.getFeedPosts)
	const getResponses = useSelector((state) => state.response.getResponses)
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
			console.log('response input submit fired');

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
			submitted
		]
	)

	const displayFeed = originalPost
		? originalPost
				.filter((f) => {
					return f.postId === param && f.relatedId === f.postId
				})
				.map((n, idx) => (
					<div>
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
								<span
									style={{
										color: 'teal'
									}}>
									Touch {''}
								</span>
								Base with{' '}
								<span
									style={{
										color: 'darkBlue'
									}}>
									{n.displayName}
								</span>
							</span>
						</div>
					</div>
				))
		: null

	const displayResponses =
		getResponses &&
		getResponses
			.filter((f) => {
				return param === f.relatedId && f.relatedId !== f.postId
			})
			.map((n, idx) => (
				<TouchBaseCard
					sidebar={false}
					key={n.postId + idx}
					post={n.post}
					displayName={n.displayName}
					id={n.postId}
					picture={n.url}
					to={`${param}`}
				/>
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
						<div className='previous-comments-block'>{displayResponses}</div>
				</div>
			) : (
				<Spinner />
			)}
		</Fragment>
	)
}
export default Response
