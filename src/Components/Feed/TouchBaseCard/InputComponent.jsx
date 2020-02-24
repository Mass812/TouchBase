import React from 'react';
//import './TouchBaseCard.scss';
import '../../ResponsePostPage/PostingBody.scss';

const PostInputComponent = (props) => {
	return (
		<div>
			<div className='typed-post'> {props.typed} </div>
			<form className='comment-on-post'>
				<input
					className='input-field-posts'
					placeholder='Enter a new post here'
					type='textArea'
					onChange={props.onChange}
					onBlur={null}
					onKeyPress={props.onKeyPress}
					
				/>
			</form>
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
