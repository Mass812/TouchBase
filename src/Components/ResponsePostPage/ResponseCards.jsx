import React from 'react';
import '../Feed/TouchBaseCard/TouchBaseCard.scss';
import {

} from '@fortawesome/free-solid-svg-icons';

const ResponseCards = (props) => {
	const defaultImage = require('../../Assets/default.png');

	return (
		<div className='response-post-component-container'>
		
				<div className='posting-picture'>
					<img
						src={props.picture? props.picture : defaultImage}
						alt={'default logo'}
						className='default-user-image'
					/> 
				</div>{' '}
				<div>{props.displayName? props.displayName : null}</div>
            
				<div className='response-user-handle'>
					{!props.responses ? (
						<div className='response-post-body'>
							{' '}
							'What is going on in Russia right now? Vladimir Lenin would
							roll over in his grave if his body and mind were still intact'{' '}
							<hr/>
						</div>
					) : (
						<div className='user-handle-post-body'>{props.responses? props.responses : null}<hr/></div>
					)}
				</div>
			</div>
	
	);
};
export default ResponseCards;
