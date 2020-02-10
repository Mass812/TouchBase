import React from 'react';
import './TouchBaseCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faAngry,
	faComment,
	faThumbsUp,
	faFrownOpen,
	faHeart
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const TouchBaseCard = (props) => {
	const defaultImage = require('../../Assets/default.png');

	return (
		<div className=' '>
			<div className='touchbase-card'>
				<div className='postingPicture'>
					<img
						src={defaultImage}
						alt={'default logo'}
						className='default-user-image'
					/>
				</div>
				<div className='touchbase-user-handle'> Posting Author / User Here </div>

				{!props.condition ? (
					<div className='user-handle-post-body'>
						{' '}
						'What is going on in Russia right now? Vladimir Lenin would roll
						over in his grave if his body and mind were still intact'{' '}
					</div>
				) : (
					<div className='user-handle-post-body'>{props.condition}</div>
				)}
				<div className='side-panel'>
					<span id='angry'>
						<FontAwesomeIcon icon={faAngry} />
					</span>
					<span id='sad'>
						<FontAwesomeIcon icon={faFrownOpen} />
					</span>
					<span id='like'>
						<FontAwesomeIcon icon={faThumbsUp} />
					</span>
					<span id='love'>
						<FontAwesomeIcon icon={faHeart} />
					</span>
					<span id='comment'>
						<Link to='/specific_post'>
							<FontAwesomeIcon icon={faComment} />
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
};
export default TouchBaseCard;
