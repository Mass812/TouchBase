import React from 'react';
import './TouchBaseCard.scss';
import OptionBar from './OptionBar/OptionBar';
import { Link } from 'react-router-dom';

const TouchBaseCard = (props) => {
	const defaultImage = require('../../Assets/default.png');


	return (
		<div className=' '>
			<div className='touchbase-card'>
				<div className='postingPicture'>
					<img
						src={!props.picture ? defaultImage : props.picture}
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

				{props.sidebar ?
				<OptionBar to={`specific_post/${123}`}/>
				: null}
			</div>
		</div>
	
	);
};
export default TouchBaseCard;
