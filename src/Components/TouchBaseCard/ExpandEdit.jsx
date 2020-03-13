import React from 'react'
import './TouchBaseCard.scss';
import { useSelector } from 'react-redux';




const ExpandEdit = ({
	authed,
	editBoxValue,
	asTypedEdit,
	placeholder,
	EditOnKeyPress,
	handleEdit,
	editSubmitted,
	value,
	submitEdit,
	parentKey
}) => {
const isLoading = useSelector(state=>state.loading.isLoading)
console.log(asTypedEdit, 'value asTypedEdit');

	return (
		<div>
			{authed && editBoxValue ? (
				<div className='feed-throw-post-block'>
								<button onClick={submitEdit} className='nav-button' style={{float: 'right'}}>
									Update
								</button>
					<div className='feed-inner-post-block'>
						<div className='feed-show-typed' style={{ padding: '7px', wordWrap: 'overflow-wrap', wordBreak: 'break-all' }}>
							
							{asTypedEdit.userText ? asTypedEdit.userText : <span>Begin Editing</span>} 
						</div>

						<div className='feed-input-form-block'>
						<label>Edit Post</label>
							<input
								className='feed-input'
								placeholder={placeholder}
								type='textArea'
								onChange={handleEdit}
								value={value}
								onKeyPress={EditOnKeyPress}
								onBlur
								key={parentKey}
							/>

							<div className='feed-post-comment-button'>
								{editSubmitted ? (
									<span className='post-success'>Updated Successfully!</span>
								) : null}
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}
export default ExpandEdit
