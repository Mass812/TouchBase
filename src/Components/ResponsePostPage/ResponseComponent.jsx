import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../Navbar/Navbar'
import './PostingBody.scss'
import TouchBaseCard from '../TouchBaseCard/TouchBaseCard'
import { createResponsePost, getResponsePosts } from '../../redux/actions/responseActions'
import { useParams } from 'react-router-dom'
import { getFeedPosts } from '../../redux/actions/feedActions'

const Response = () => {
	const param = useParams().id
	console.log(param, 'param')
	const originalPost = useSelector((state) => state.feed.posts)
	const getResponses = useSelector((state) => state.response.getResponses)
	const dispatch = useDispatch()
	const [
		typedPost,
		setTypedPost
	] = useState('')
	const [
		submitted,
		setSubmitted
	] = useState(false)

	console.log('postResponses', getResponses)
	console.log('originalPost', originalPost)

	const onChange = (e) => {
		setTypedPost(e.target.value)
	}

	const onEnter = async (event) => {
		if (event.which === 13 || event.keyCode === 13) {
			await setSubmitted(true)
			await dispatch(createResponsePost(typedPost, param))
			await setTypedPost('')
			setTimeout(() => {
				setSubmitted(false)
			}, 1000)
		}
	}
	const storeResponse = async (e) => {
		if (e.target.value.trim() !== '') {
			await setSubmitted(true)
			console.log('onKeyPress Fired')

			await dispatch(createResponsePost(typedPost, param))
			await setTypedPost('')
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
		? originalPost.filter((n) => n.id === param).map((n, idx) => (
				<div>
					<TouchBaseCard
						sidebar={false}
						key={n.id}
						post={n.post}
						displayName={n.displayName}
						id={n.id}
						picture={n.url}
						to={`/personal_profile/${n.id}`}
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
		getResponses.map((n, idx) => (
			<TouchBaseCard
				sidebar={false}
				key={n.id}
				post={n.post}
				displayName={n.displayName}
				id={n.id}
				picture={n.url}
				to={'/personal_profile'}
			/>
		))

	return (
		<div>
			<Navbar />
			<div className='edge-case-large'>
				<div className='original-sticky'> {displayFeed}</div>
				<div className='tb-card-container'>
					{!submitted ? (
						<div className='response-input-container'>
							<div>
								<div className='typed-post'> {typedPost} </div>
								<div className='comment-on-post'>
									<input
										className='input-field-posts'
										placeholder='Enter a new post here'
										type='textArea'
										onChange={onChange}
										onBlur={storeResponse}
										onKeyPress={onEnter}
										value={typedPost}
									/>
								</div>{' '}
								<div className='post-comment-button'>
									{submitted ? (
										<span className='post-success'>Posted Successfully!</span>
									) : null}
									<button
										style={
											!submitted ? (
												{
													opacity: '1'
												}
											) : (
												{
													opacity: '.4'
												}
											)
										}
										disabled={submitted}
										onClick={storeResponse}
										className='nav-button'>
										Post
									</button>
								</div>
							</div>
						</div>
					) : null}
					<div className='previous-comments-block'>{displayResponses}</div>
				</div>
			</div>
		</div>
	)
}
export default Response
