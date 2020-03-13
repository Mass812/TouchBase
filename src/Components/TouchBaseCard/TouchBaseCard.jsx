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
	edit,
	likeAction,
	likes,
	editBoxValue,
	asTypedEdit,
	handleEditChange,
	editSubmitted,
	value,
	submitEdit,
	post,
	sidebar,
	editOnKeyPress,
	onEditAsTyped
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
						edit={edit}
						likeAction={likeAction}
						likes={likes}
					/>
				) : null}
			</div>

			<ExpandEdit
				authed={authed}
				editBoxValue={editBoxValue}
				asTypedEdit={asTypedEdit}
				handleEditChange={handleEditChange}
				editSubmitted={editSubmitted}
				value={value}
				editOnKeyPress={editOnKeyPress}
				submitEdit={submitEdit}
				onEditAsTyped={onEditAsTyped}
			/>
		</div>
	)
}

export default TouchBaseCard
