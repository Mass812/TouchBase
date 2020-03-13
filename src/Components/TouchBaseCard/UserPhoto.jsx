import React from 'react'
import {Link} from 'react-router-dom'
import './TouchBaseCard.scss';
import '../ResponsePostPage/PostingBody.scss'



 const UserPhoto =({picture, to, displayName} )=>{
	const defaultImage = require('../../Assets/default.png')

    return (  
		<>
    	<div className='postingPicture'>
		<Link to={to}>
			<img
			src={!picture ? defaultImage : picture}
			alt={'default logo'}
			className='default-user-image'
			/>
		</Link>

		</div>
		<div className='touchbase-user-handle'> {displayName}</div>
		</>
    )
};
export default UserPhoto ;