import React from 'react';
//import './TouchBaseCard.scss';
import '../ResponsePostPage/PostingBody.scss';
import OptionBar from './OptionBar/OptionBar';
import { Link } from 'react-router-dom';

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
				<div className='touchbase-user-handle'> {props.displayName}</div>

				{!props.post ? (
					<div className='response-body'>
						{' '}
						{' '}
						<div className='body-paragraph'>
							'What is going on in Russia right now? Vladimir Lenin would
							roll over in his grave if his body and mind were still intact'{' '}
						</div>
					</div>
				) : (
					<div className='response-body'>
						<div className='body-paragraph'>{props.post}</div>
					</div>
				)}
				<span>{props.createdAt ? props.createdAt : null} </span>
				{props.sidebar ? (
					<OptionBar
						comment={`specific_post/${props.id}`}
						love={props.love}
						like={props.liked}
						angry={props.angry}
						likeCount={props.likeCount}
						commentCount={props.commentCount}
						angryCount={props.angryCount}
						heartCount={props.heartCount}
					/>
				) : null}
			</div>
		</div>
	);
};

export default TouchBaseCard;
