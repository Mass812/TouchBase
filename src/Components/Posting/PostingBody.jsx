import React from 'react';
import './PostingBody.scss';
import '../TouchBaseCard/TouchBaseCard.scss'
import TouchBaseCard from '../TouchBaseCard/TouchBaseCard'

const PostingBody = (props) => {
	const defaultImage = require('../../Assets/default.png');

	return (
		<div className='edge-case-large'>
			<div className='tb-card-container'>
				<div className='tb-posting-title'>
					<span>TouchBase with Others</span>
				</div>

				 <div className='tb-card-original-post'>
					<div className='postingPicture'>
						<img
							src={defaultImage}
							alt={'default logo'}
							className='default-user-image'
						/>
					</div>
					<div className='postersName'> Posting Author / User Here </div>

					<div className='originalPosting'>
						What is going on in Russia right now? Vladimir Lenin would roll
						over in his grave if his body and mind were still intact{' '}
					</div>
					<div className='like-span'>Like heart Icons</div>
				</div> 
				<div className='post-comments-container'>
				<TouchBaseCard  condition = {props.storedUserComment}/>
</div>
				{/* <div className='post-comments-container'>{props.responsePost}</div> */}
				<div className='response-input-container'>
					{!props.storedUserComment ? (
						<div>
							<div className='typed-post'> {props.responsePost} </div>

							<div className='comment-on-post'>
								<input
									className='input-field-posts'
									placeholder='Enter a new post here'
									type='textArea'
									onChange={props.responseMainPost}
									onBlur={props.storeThisResponsePost}
								/>
							</div>
							<div className='post-comment-button'>
								<button
									onClick={props.storeThisResponsePost}
									className='nav-button'>
									Post
								</button>
							</div>
						</div>
					) : (
						<div style={{ paddingLeft: '15px', color: 'green' }}>
							'Your post has rendered successfully'
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default PostingBody;
