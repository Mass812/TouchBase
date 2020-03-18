import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faTrash as darkTrash,
	faComment as darkComment,
	faThumbsUp as darkThumb,
	faEdit as darkEdit
} from '@fortawesome/free-solid-svg-icons'
import {
	faComment as stenciledComment,
	faThumbsUp as stenciledThumb,
	faEdit as stenciledEdit
} from '@fortawesome/free-regular-svg-icons'
import '../TouchBaseCard.scss'
import { Link } from 'react-router-dom'

const OptionBar = ({
	deletePost,
	editToggle,
	authed,
	toPost,
	commentCount,
	onClickLike,
	likesCount
}) => {
	return (
		<div className='side-panel'>
			{authed ? (
				<Fragment>
					<div id='trash' onClick={deletePost}>
						<FontAwesomeIcon icon={darkTrash} />
					</div>
					<div id='edit' onClick={editToggle}>
						<FontAwesomeIcon icon={stenciledEdit} />
					</div>
				</Fragment>
			) : null}

			<span id='comment'>
				<Link
					to={toPost}
					style={{
						textDecoration: 'none',
						color: '#2993B9'
					}}>
					<FontAwesomeIcon icon={stenciledComment} /> {commentCount ? commentCount : 0}
				</Link>
			</span>
			<span id='like' onClick={onClickLike}>
				<FontAwesomeIcon icon={stenciledThumb} /> {likesCount}
			</span>
		</div>
	)
}
export default OptionBar
