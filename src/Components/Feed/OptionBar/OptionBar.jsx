import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faAngry,
	faComment,
	faThumbsUp,
	faFrownOpen,
	faHeart
} from '@fortawesome/free-solid-svg-icons';
import '../TouchBaseCard/TouchBaseCard.scss'
import {Link} from 'react-router-dom';


 const OptionBar =(props)=>{
    return (  
      
<div className='side-panel'>
					<span id='angry'>
						<FontAwesomeIcon icon={faAngry}/>
					</span>
				
					<span id='like'>
						<FontAwesomeIcon icon={faThumbsUp} />
					</span>
					<span id='love'>
						<FontAwesomeIcon icon={faHeart} />
					</span>
					<span id='comment'>
						<Link to={props.to}>
							<FontAwesomeIcon icon={faComment} />
						</Link>
					</span>
				</div> 
 
    )
};
export default OptionBar ;