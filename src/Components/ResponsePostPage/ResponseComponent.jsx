import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Navbar from '../Navbar/Navbar'
import './PostingBody.scss'
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
	const storeResponse = (e) => {
		if (e.target.value.trim() !== '') {
			setSubmitted(true)

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
					<div className='tb-card-container'>
						{!submitted ? (
								<Fragment>
							<div className='response-input-container'>
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
											autoFocus
										/>
									</div>{' '}
									<div className='post-comment-button'>
										{submitted ? (
											<span className='post-success'>
												Posted Successfully!
											</span>
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
							</Fragment>
						) : null}
						<div className='previous-comments-block'>{displayResponses}</div>
					</div>
				</div>
			) : (
				<Spinner />
			)}
		</Fragment>
	)
}
export default Response
