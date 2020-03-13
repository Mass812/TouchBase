import React from 'react'
import './TouchBaseCard.scss'
import '../ResponsePostPage/PostingBody.scss'
import OptionBar from './OptionBar/OptionBar'
import UserPhoto from './UserPhoto'
import ErrorResponseBody from './ResponseBody'
import ExpandEdit from './ExpandEdit'

import { Link } from 'react-router-dom'

const TouchBaseCard = ({
	to,
	picture,
	displayName,
	toPost,
	deletePost,
	authed,
	editToggle,
	onClickLike,
	likesCount,
	editBoxValue,
	asTypedEdit,
	handleEdit,
	editSubmitted,
	value,
	submitEdit,
	post,
	sidebar,

	EditOnKeyPress,
	parentKey
}) => {
	return (
		<div>
			<div className='touchbase-card'>
				<UserPhoto to={to} picture={picture} displayName={displayName} />

				{!post ? (
					<ErrorResponseBody />
				) : (
					<div className='response-body'>
						<div className='body-paragraph'>{post}</div>
					</div>
				)}
				{sidebar ? (
					<OptionBar
						toPost={toPost}
						deletePost={deletePost}
						authed={authed}
						editToggle={editToggle}
						onClickLike={onClickLike}
						likesCount={likesCount}
					/>
				) : null}
			</div>

			<ExpandEdit
				authed={authed}
				editBoxValue={editBoxValue}
				handleEdit={handleEdit}
				editSubmitted={editSubmitted}
				value={value}
				editOnKeyPress={EditOnKeyPress}
				submitEdit={submitEdit}
				parentKey={parentKey}
				asTypedEdit={asTypedEdit}
			/>
		</div>
	)
}

export default TouchBaseCard
