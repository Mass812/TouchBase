import React from 'react';
//import './TouchBaseCard.scss';
import '../../ResponsePostPage/PostingBody.scss';

const PostInputComponent = (props) => {
	return (
		<div>
			<div className='typed-post'> {props.typed} </div>
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
				{props.storedComment ? (
					<span className='post-success'>Posted Successfully!</span>
				) : null}
				<button onClick={props.storeResponse} className='nav-button'>
					Post
				</button>
			</div>
		</div>
	);
};
export default PostInputComponent;
