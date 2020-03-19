import React, { Fragment } from 'react'
import Spinner from '../Spinner/Spinner'
import '../../App.scss'
import { useSelector } from 'react-redux'
import Input from '../Input/Input'

const FeedDumb = ({ onChange, onKeyPress, value, typedPost, submit, submitted, displayFeed }) => {
	const isLoading = useSelector((state) => state.loading.isLoading)

	return (
		<Fragment>
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
							<div
								style={{
									color: 'teal',
									fontFamily: 'SansSerif'
								}}>
								Post something and begin a conversation
							</div>
						</div>
						<Input
							onChange={onChange}
							onKeyPress={onKeyPress}
							value={value}
							typedPost={typedPost}
							submit={submit}
							submitted={submitted}
						/>
					</div>

					<div className='db-posts'>{displayFeed}</div>
				</div>
			) : (
				<Spinner />
			)}
		</Fragment>
	)
}
export default FeedDumb
