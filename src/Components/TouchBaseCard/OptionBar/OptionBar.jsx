import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faTrash,
	faComment,
	faThumbsUp,
	faEdit
} from '@fortawesome/free-solid-svg-icons'
import '../TouchBaseCard.scss'
import { Link } from 'react-router-dom'

const OptionBar = (props) => {
	return (
		<div className='side-panel'>
			{props.authed ? (

				<>
				<div id='trash' onClick={props.delete}>
					<FontAwesomeIcon icon={faTrash}  />
				</div>
				<div id='edit' onClick={props.edit}>
				<FontAwesomeIcon icon={faEdit} />
				
			</div>
			</>
			) : null}

			<span id='comment'>
				<Link
					to={props.toPost}
					style={{
						textDecoration: 'none',
						color: '#2993B9'
					}}>
					<FontAwesomeIcon icon={faComment} />

					{props.commentCount}
				</Link>
			</span>
			<span id='like' onClick={props.like}>
				<FontAwesomeIcon icon={faThumbsUp} /> {props.likeCount}
			</span>
		</div>
	)
}
export default OptionBar
