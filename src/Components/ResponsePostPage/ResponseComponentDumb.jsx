import React from 'react';
import '../Feed/TouchBaseCard/TouchBaseCard.scss';


const PostComponentDumb = (props) => {
	

	return (
		<div className='edge-case-large'>
			<div className='original-sticky'>{props.held}</div>
			<div className='tb-card-container'>
				<div className='tb-posting-title'>
					<span>
						<span style={{ color: 'teal' }}>Touch {''}</span>
						Base with{' '}
						<span style={{ color: 'darkBlue' }}>{props.held.userHandle}</span>
					</span>
				</div>

				<div className='response-input-container'>
					<div>
						<div className='typed-post'> {props.responsePost} </div>

						<div className='comment-on-post'>
							<input
								className='input-field-posts'
								placeholder='Enter a new post here'
								type='textArea'
								onChange={props.onChange}
								onBlur={props.onBlur}
								onKeyPress={props.onKeyPress}
							/>
						</div>
						<div className='post-comment-button'>
							{props.storedUserComment ? (
								<span className='post-success'>Posted Successfully!</span>
							) : null}
							<button onClick={props.storeResponse} className='nav-button'>
								Post
							</button>
						</div>
					</div>
				</div>
				<div className='previous-comments-block'>{props.hero}</div>
			</div>
		</div>
	);
};
export default PostComponentDumb;
