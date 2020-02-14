import React from 'react';
import './TouchBaseCard.scss';
import OptionBar from './OptionBar/OptionBar';
import {Link} from 'react-router-dom';


const TouchBaseCard = (props) => {
	const defaultImage = require('../../Assets/default.png');
	return (
		<div className=' '>
			<div className='touchbase-card'>
				<div className='postingPicture'>
					<Link to={props.to}>
						<img
							src={!props.picture ? defaultImage : props.picture}
							alt={'default logo'}
							className='default-user-image'
						/>
					</Link>
				</div>
				<div className='touchbase-user-handle'> {props.userHandle}</div>

				{!props.body ? (
					<div className='user-handle-post-body'>
						{' '}
						'What is going on in Russia right now? Vladimir Lenin would roll
						over in his grave if his body and mind were still intact'{' '}
					</div>
				) : (
					<div className='user-handle-post-body'>{props.body}</div>
				)}

				{props.sidebar ? <OptionBar to={`specific_post/${props.id}`} /> : null}
			</div>
		</div>
	);
};

export default TouchBaseCard;
