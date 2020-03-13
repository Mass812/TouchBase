import React from 'react'
import './TouchBaseCard.scss';
import { useSelector } from 'react-redux';




const ExpandEdit = ({
	authed,
	editBoxValue,
	asTypedEdit,
	placeholder,
	editOnKeyPress,
	handleEditChange,
	editSubmitted,
	value,
	onEditAsTyped,
	submitEdit
}) => {
const isLoading = useSelector(state=>state.loading.isLoading)
console.log(asTypedEdit, 'value asTypedEdit');

	return (
		<div>
			{authed && editBoxValue ? (
				<div className='feed-throw-post-block'>
					<div className='feed-inner-post-block'>
						<div className='feed-show-typed' style={{ padding: '7px' }}>
							
							{/* {asTypedEdit} */}
						</div>

						<div className='feed-input-form-block'>
						<label>Edit Post</label>
							<input
								className='feed-input'
								placeholder={placeholder}
								type='textArea'
								onChange={onEditAsTyped}
								value={value}
								onKeyPress={editOnKeyPress}
								autoFocus
							/>

							<div className='feed-post-comment-button'>
								{editSubmitted ? (
									<span className='post-success'>Updated Successfully!</span>
								) : null}
								<button onClick={submitEdit} className='nav-button'>
									Update
								</button>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}
export default ExpandEdit
