import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faAngry,
	faComment,
	faThumbsUp,
	faFrownOpen,
	faHeart
} from '@fortawesome/free-solid-svg-icons'
import '../TouchBaseCard.scss'
import { Link } from 'react-router-dom'

const OptionBar = (props) => {
	return (
		<div className='side-panel'>
			<span id='angry'>
				<FontAwesomeIcon icon={faAngry} onClick={props.angry} />
				{props.angryCount}
			</span>

			<span id='love'>
				<FontAwesomeIcon icon={faHeart} onClick={props.love} />
				{props.heartCount}
			</span>
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
