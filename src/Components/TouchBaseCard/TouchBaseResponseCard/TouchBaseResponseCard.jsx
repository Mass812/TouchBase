import React from 'react';
import '../TouchBaseCard.scss';

const TouchBaseResponseCard = (props) => {
	return (
		<div>
			<div className='typed-post'> {props.responsePost} </div>

			<div className='comment-on-post'>
				<input
					className='input-field-posts'
					placeholder='Enter a new post here'
					type='textArea'
					onChange={props.responseMainPost}
					onBlur={props.storeThisResponsePost}
					onKeyPress={props.onEnter}
				/>
			</div>
			<div className='post-comment-button'>
				{props.storedUserComment ? (
					<span className='post-success'>Posted Successfully!</span>
				) : null}
				<button onClick={props.storeThisResponsePost} className='nav-button'>
					Post
				</button>
			</div>
		</div>
	);
};
export default TouchBaseResponseCard;
