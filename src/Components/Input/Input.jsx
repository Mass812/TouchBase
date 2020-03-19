import React from 'react'

const Input = ({ onChange, onKeyPress, value, typedPost, submit, submitted }) => {
	return (
		<div className='feed-inner-post-block'>
			<div className='feed-show-typed'> {typedPost} </div>

			<div className='feed-input-form-block'>
				<input
					className='feed-input'
					placeholder='Enter a new post here'
					type='textArea'
					onChange={onChange}
					onKeyPress={onKeyPress}
					value={value}
				/>

				<div className='feed-post-comment-button'>
					<button onClick={submit} className='nav-button'>
						Post
					</button>
					{submitted ? <span className='post-success'>Posted Successfully!</span> : null}
				</div>
			</div>
		</div>
	)
}
export default Input
