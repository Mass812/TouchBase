import React, { Fragment } from 'react'
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
	commentCount,
	commentOn,
	post,
	sidebar,

}) => {
	return (
		<Fragment>
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
						commentCount={commentCount}
						commentOn={commentOn}
					/>
				) : null}
			</div>

		
		</Fragment>
	)
}

export default TouchBaseCard
