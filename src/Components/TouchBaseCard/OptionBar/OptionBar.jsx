import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faAngry,
	faComment,
	faThumbsUp,
	faFrownOpen,
	faHeart
} from '@fortawesome/free-solid-svg-icons';
import '../TouchBaseCard.scss';
import { NavLink } from 'react-router-dom';

const OptionBar = (props) => {
	return (
		<div className='side-panel'>
			<span id='angry'>
				<FontAwesomeIcon icon={faAngry} onClick={props.angry}/>
			</span>

			<span id='love'>
				<FontAwesomeIcon icon={faHeart} onClick={props.love}/>
			</span>
			<span id='comment'>
				<NavLink to={props.comment} style={{textDecoration: 'none', color: '#2993B8'}}>
					<FontAwesomeIcon icon={faComment} />
				</NavLink>
			</span>
			<span id='like'>
				<FontAwesomeIcon icon={faThumbsUp} onClick={props.like}/>
			</span>
		</div>
	);
};
export default OptionBar;
