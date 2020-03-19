import React from 'react'
import './TouchBaseCard.scss'

const ExpandEdit = ({
	authed,
	editBoxValue,
	asTypedEdit,
	placeholder,
	editOnKeyPress,
	editSubmitted,
	value,
	submitEdit,
	captureUserEditTextAsTyped
}) => {
	return (
		<div style={!editBoxValue ? { display: 'none' } : null}>
			{authed ? (
				<div className='feed-large-screen-block-edit'>
					<div className='feed-throw-post-block'>
						<button
							onClick={submitEdit}
							className='nav-button'
							style={{ float: 'right' }}>
							Update
						</button>
						<div className='feed-inner-post-block'>
							<div
								className='feed-show-typed'
								style={{
									padding: '7px',
									wordWrap: 'overflow-wrap',
									wordBreak: 'break-all'
								}}>
								{asTypedEdit.userText ? (
									asTypedEdit.userText
								) : (
									<span>Begin Editing</span>
								)}
							</div>

							<div className='feed-input-form-block'>
								<label>Edit Post</label>
								<input
									className='feed-input'
									placeholder={placeholder}
									type='textArea'
									onChange={captureUserEditTextAsTyped}
									value={value}
									onKeyPress={editOnKeyPress}
								/>

								<div className='feed-post-comment-button'>
									{editSubmitted ? (
										<span className='post-success'>Updated Successfully!</span>
									) : null}
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}
export default ExpandEdit
