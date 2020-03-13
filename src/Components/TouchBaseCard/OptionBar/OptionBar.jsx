import React from 'react'
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



const OptionBar = (props) => {


	
	return (
		<div className='side-panel'>
			{props.authed ? (

				<>
				<div id='trash' onClick={props.delete}>
					<FontAwesomeIcon icon={darkTrash}  />
				</div>
				<div id='edit' onClick={props.edit}>
				<FontAwesomeIcon icon={stenciledEdit} />
				
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
					<FontAwesomeIcon icon={stenciledComment} />
					{props.commentCount}
				</Link>
			</span>
			<span id='like' onClick={props.likeAction}>
				<FontAwesomeIcon icon={stenciledThumb} /> {props.likes}
			</span>
		</div>
	)
}
export default OptionBar
