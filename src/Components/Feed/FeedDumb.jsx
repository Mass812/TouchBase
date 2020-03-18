import React, { Fragment } from 'react'
import Spinner from '../Spinner/Spinner'
import { useSelector } from 'react-redux'

const FeedDumb = (props) => {
	const isLoading = useSelector((state) => state.loading.isLoading)

	return (
		<Fragment >
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
								<div style={{
											color: 'teal',
											fontFamily: 'SansSerif'
										}}>Post something and begin a conversation</div>
							</div>
							<div className='feed-inner-post-block'>
								<div className='feed-show-typed'> {props.typedPost} </div>

								<div className='feed-input-form-block'>
									<input
										className='feed-input'
										placeholder='Enter a new post here'
										type='textArea'
										onChange={props.onChange}
										onKeyPress={props.onKeyPress}
										value={props.value}
									/>

									<div className='feed-post-comment-button'>
										{props.submitted ? (
											<span className='post-success'>
												Posted Successfully!
											</span>
										) : null}
										<button onClick={props.onClick} className='nav-button'>
											Post
										</button>
									</div>
								</div>
							</div>
						</div>

						<div className='db-posts'>{props.displayFeed}</div>
					</div>
				) : (
					<Spinner />
				)}
		</Fragment>
	)
}
export default FeedDumb
