import React from 'react'
import Spinner from '../Spinner/Spinner'
import { useSelector, useDispatch } from 'react-redux'
import defaultPic from '../../Assets/default.png'

const FeedDumb = (props) => {
	const basicUserInfo = useSelector((state) => state.profile.basicUserInfo)
	const isLoading = useSelector((state) => state.loading.isLoading)
	return (
		<div className=' '>
			<div>
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
									<div className='header-user-name'>
										{basicUserInfo.displayName}
									</div>
								</div>
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
			</div>
		</div>
	)
}
export default FeedDumb
