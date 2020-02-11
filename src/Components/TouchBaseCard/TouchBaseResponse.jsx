import React from 'react';
import './TouchBaseCard.scss';
import {

} from '@fortawesome/free-solid-svg-icons';

const TouchBaseCardResponse = (props) => {
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
                
				</div>{' '}
            
				<div className='response-user-handle'>
					{!props.condition ? (
						<div className='response-post-body'>
							{' '}
							'What is going on in Russia right now? Vladimir Lenin would
							roll over in his grave if his body and mind were still intact'{' '}
						</div>
					) : (
						<div className='user-handle-post-body'>{props.condition}</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default TouchBaseCardResponse;
